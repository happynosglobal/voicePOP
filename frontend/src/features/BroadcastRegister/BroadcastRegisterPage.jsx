import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import CustomTimePicker from "../../components/customTimePicker/CustomTimePicker";
import GroupSelectModal from "../../components/modal/GroupSelectModal";
import Input from "../../components/input/Input";
import Radio from "../../components/input/Radio";
import CheckBox from "../../components/input/CheckBox";
import { toDate, toTimeFormat } from "../../utils/customFormat";
import useCodes from "../../stores/codes";
import {
  gapOptions,
  repeatInterval,
  repeatOptions,
} from "../../utils/constant/options";
import FileUploader from "../../components/input/FileUploader";
import useUserStore from "../../stores/user";
import {
  deleteAudioMapping,
  deleteBcMaster,
  deleteBcTargetStore,
  deleteBcTimeTable,
  downloadBcMedia,
  postBcTimeTable,
  patchBcMaster,
  postAudioMapping,
  postBcMaster,
  postBcMedia,
  postBcTargetStore,
  putBcTargetStore,
} from "../../api/broadcast/broadcast";
import { toast } from "react-toastify";
import useBroadcastRegister from "./hooks/useBroadcastRegister";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { IoMdCloseCircle } from "react-icons/io";
import { getErrorMessage } from "../../utils/constant/messages";
import Dropdown from "../../components/dropdown/Dropdown";
import { URL_MAPPING } from "../../utils/constant/urls";

const BroadcastRegisterPage = ({ mode, title }) => {
  const location = useLocation();
  const { bcId, broadcastData } = location?.state || {};

  const { user } = useUserStore();
  const navigate = useNavigate();
  const { storeByBrandCode, isLoading } = useCodes();

  const {
    today,
    myStore,
    initialFormData,
    formData,
    setFormData,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedStore,
    setSelectedStore,
    audioFile,
    setAudioFile,
    duration,
    setDuration,
    audioPreviewUrl,
    setAudioPreviewUrl,
    categoryOptions,
    handleInput,
    handleSelectBox,
    isFormValid,
    isWithinTimeRange,
  } = useBroadcastRegister();

  // 날짜, 시간 관련 상태
  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [selectedEndDate, setSelectedEndDate] = useState(today);

  // 반복, GAP 체크 상태
  const [isGapChecked, setIsGapChecked] = useState(true);
  const [isRepeatChecked, setIsRepeatChecked] = useState(false);

  // 점포선택 모달 ref
  const storeModalRef = useRef(null);

  // 수정 정보 세팅
  useEffect(() => {
    const init = async () => {
      if (mode && bcId) {
        if (!broadcastData) {
          toast.error("방송정보를 불러오는데 실패했습니다.");
          navigate(URL_MAPPING.broadcastManagement);
          return;
        }

        const stores = broadcastData?.stores;
        const media = broadcastData?.medias?.[0];

        // 대상점포 설정
        setSelectedStore(
          stores.map(({ store_code, store_name }) => ({
            store_code,
            store_name,
          }))
        );

        // 기간설정
        setSelectedStartDate(broadcastData.start_date);
        setSelectedEndDate(broadcastData.end_date);
        // 시간설정
        setStartTime(toTimeFormat(broadcastData.start_time));
        setEndTime(toTimeFormat(broadcastData.end_time));

        // GAP 또는 반복 설정
        if (broadcastData.gap) {
          setIsRepeatChecked(false);
          setIsGapChecked(true);
        } else if (
          broadcastData.repeat_count &&
          broadcastData.repeat_interval
        ) {
          setIsGapChecked(false);
          setIsRepeatChecked(true);
        }

        // 방송파일 설정
        setDuration(media?.play_time_seconds);
        if (media?.media_filename) {
          const dummyFile = new File(["placeholder"], media.media_filename, {
            type: "audio/mpeg",
            lastModified: new Date().getTime(),
          });
          Object.defineProperty(dummyFile, "size", {
            value: media?.media_file_size,
          });

          setAudioFile(dummyFile);
        }

        try {
          const res = await downloadBcMedia(media?.id);
          const downloadUrl = res.data.data.media_file_url;
          setAudioPreviewUrl(downloadUrl);
        } catch (err) {
          console.error("미디어 파일 URL 조회 실패", err);
        }

        // Formdata 설정
        setFormData((prev) => ({
          ...prev,
          title: broadcastData.title,
          category_type_seq: broadcastData.category_type_seq,
          start_date: toDate(broadcastData.start_date),
          end_date: toDate(broadcastData.end_date),
          gap: broadcastData.gap || 3,
          repeat_count: broadcastData.repeat_count || 1,
          repeat_interval: broadcastData.repeat_interval || 1,
        }));
      }
    };

    init();
  }, [mode, bcId, broadcastData]);

  // 시간 선택 핸들러
  const handleTimePicker = (time, name) => {
    if (name === "start") {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
  };

  // 대상 점포 선택 핸들러
  const handleStoreGroup = (_, store) => {
    const formattedStores = store.map(({ value, label }) => ({
      store_code: value,
      store_name: label,
    }));
    setSelectedStore(formattedStores);
    storeModalRef.current.close();
  };

  // 대상 점포 제거 핸들러
  const handleRemoveStore = (store) => {
    if (user?.level === "STORE") return;
    setSelectedStore((prev) =>
      prev.filter((item) => item.store_code !== store.store_code)
    );
  };
  // 방송 등록 핸들러
  const handleNewRegister = async () => {
    let masterBroadcastId = null;
    try {
      const body = {
        type: "normal",
        title: formData.title,
        category_type_seq: formData.category_type_seq,
        start_time: startTime.replace(":", ""),
        end_time: endTime.replace(":", ""),
        start_date: formData.start_date,
        end_date: formData.end_date,
        user_id: user?.user_id,
        brand_code: user?.brand_code,
      };

      if (isGapChecked && !isRepeatChecked) {
        body.gap = formData.gap;
      } else if (!isGapChecked && isRepeatChecked) {
        body.repeat_count = formData.repeat_count;
        body.repeat_interval = formData.repeat_interval;
      }

      // 마스터 방송 등록
      const broadcastRes = await postBcMaster(body);

      if (broadcastRes.data.status_code !== 200) {
        throw new Error("방송정보 저장 실패");
      }

      masterBroadcastId = broadcastRes.data.data.id;

      const storeList = user?.level === "STORE" ? [myStore] : selectedStore; // 점포관리자면 본인의 점포만 대상으로 요청

      // 방송 대상 점포 등록
      const targetStoreRes = await postBcTargetStore({
        brand_code: user?.brand_code,
        content_id: masterBroadcastId,
        item: storeList,
        user_id: user?.user_id,
      });

      if (targetStoreRes.status !== 200) {
        throw new Error("방송 대상 점포 저장 실패");
      }

      // 오디오 파일 업로드
      const audioFormData = new FormData();
      audioFormData.append("media_type", "sound");
      audioFormData.append("media_filename", audioFile);
      audioFormData.append("media_desc", " ");

      const audioRes = await postBcMedia(audioFormData);

      if (audioRes.data.status_code !== 200) {
        throw new Error("오디오 파일 업로드 실패");
      }

      const audioId = audioRes.data.data.id;

      // 마스터 방송과 오디오 파일 매핑
      const mappingBody = {
        mst_medias: [
          {
            id: audioId,
            broad_seq: 1,
          },
        ],
      };
      const mappingRes = await postAudioMapping(masterBroadcastId, mappingBody);

      if (mappingRes.data.status_code !== 200) {
        throw new Error("마스터 방송과 오디오 파일 매핑 실패");
      }

      // 방송 타임테이블 등록
      await postBcTimeTable(masterBroadcastId);

      toast.success("방송 등록이 완료되었습니다");
      navigate(URL_MAPPING.broadcastManagement);
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error("방송 등록 중 오류 발생:", err);
      // 방송등록 실패시 등록정보 삭제
      if (masterBroadcastId) {
        Promise.allSettled([
          deleteBcMaster(masterBroadcastId),
          deleteBcTargetStore(masterBroadcastId),
          deleteAudioMapping(masterBroadcastId),
          deleteBcTimeTable(masterBroadcastId),
        ]);
      }
    }
  };

  const handleEditRegister = async () => {
    try {
      const masterId = broadcastData.id;
      const media = broadcastData.medias[0];

      const body = {
        type: "normal",
        title: formData.title,
        category_type_seq: formData.category_type_seq,
        start_time: startTime.replace(":", ""),
        end_time: endTime.replace(":", ""),
        start_date: formData.start_date,
        end_date: formData.end_date,
        user_id: user?.user_id,
        brand_code: user?.brand_code,
      };

      if (isGapChecked) {
        body.gap = formData.gap;
        body.repeat_count = 0;
        body.repeat_interval = 0;
      }
      if (isRepeatChecked) {
        body.gap = 0;
        body.repeat_count = formData.repeat_count;
        body.repeat_interval = formData.repeat_interval;
      }

      await patchBcMaster(masterId, body);

      const storeList = user?.level === "STORE" ? [myStore] : selectedStore;

      await putBcTargetStore(masterId, {
        brand_code: user?.brand_code,
        item: storeList,
      });

      const isAudioChanged = !(
        audioFile instanceof File &&
        audioFile.size === media.media_file_size &&
        audioFile.name === media.media_filename
      );

      if (isAudioChanged) {
        await deleteAudioMapping(masterId);
        const audioForm = new FormData();
        audioForm.append("media_type", "sound");
        audioForm.append("media_filename", audioFile);
        audioForm.append("media_desc", " ");
        const audioRes = await postBcMedia(audioForm);
        const audioId = audioRes.data.data.id;
        await postAudioMapping(masterId, {
          mst_medias: [{ id: audioId, broad_seq: 1 }],
        });
      }
      await postBcTimeTable(masterId);
      toast.success("방송 수정 완료");
      navigate(URL_MAPPING.broadcastManagement);
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error("수정 실패:", err);
    }
  };

  // 방송 등록 핸들러
  const handleSubmit = async () => {
    // 방송 시간 범위안에 voice 파일의 반복이 가능한지 계산
    const isValid = isWithinTimeRange({
      startTimeStr: startTime.replace(":", ""),
      endTimeStr: endTime.replace(":", ""),
      duration: Number(duration),
      gap: formData.gap,
      repeatCount: formData.repeat_count,
      repeatInterval: formData.repeat_interval,
      isGapChecked,
      isRepeatChecked,
    });

    if (!isValid) {
      toast.error("방송 시간을 다시 확인해주세요.");
      return;
    }
    if (mode === "edit") {
      handleEditRegister();
    } else {
      handleNewRegister();
    }
  };

  return (
    <ContentLayout title={title}>
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">방송명</label>
          <Input
            type="text"
            name="title"
            placeholder="방송명을 입력하세요"
            className="input w-full"
            value={formData.title}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label className="form-label">MD</label>
          <div className="form-input-group flex-wrap gap-2.5">
            {categoryOptions.map((item, index) => (
              <label key={index} htmlFor={item.code} className="input-label">
                <Radio
                  id={item.code}
                  name="category_type_seq"
                  className="radio"
                  label={item.name}
                  value={item.code}
                  checked={formData.category_type_seq == item.code}
                  onChange={handleInput}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">적용점포</label>
          <div className="w-full">
            {user?.level !== "STORE" && (
              <div className="mb-2 flex justify-between items-center gap-2">
                <div className="space-x-2">
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => {
                      // setTempSelectedStores(
                      //   selectedStore.map((s) => ({
                      //     value: s.store_code,
                      //     label: s.store_name,
                      //   }))
                      // );
                      storeModalRef.current.showModal();
                    }}
                  >
                    점포선택
                  </button>
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => {
                      handleStoreGroup("", storeByBrandCode);
                    }}
                  >
                    전점
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => {
                      handleStoreGroup("", []);
                    }}
                  >
                    전체삭제
                  </button>
                </div>
                <p className="text-gray-500 text-right leading-tight">
                  선택된 점포 수 :
                  <b className="text-gray-900">{selectedStore.length}</b>개
                </p>
              </div>
            )}
            {selectedStore.length !== 0 && (
              <div className="p-2 border rounded-[10px] max-h-48 min-h-16 overflow-y-auto">
                <div className="grid grid-cols-7 gap-2">
                  {selectedStore.map((store, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between gap-1 bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded text-sm hover:bg-gray-300 text-left"
                    >
                      {store.store_name}
                      {user?.level !== "STORE" && (
                        <IoMdCloseCircle
                          className="flex-shrink-0"
                          onClick={() => handleRemoveStore(store)}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">기간 설정</label>
          <div className="flex items-center">
            <CustomDatePicker
              selectedDate={selectedStartDate}
              onChange={(date) => {
                setFormData({
                  ...formData,
                  start_date: toDate(date),
                });
                setSelectedStartDate(date);
              }}
            />
            <div className="w-10 text-center"> - </div>
            <CustomDatePicker
              selectedDate={selectedEndDate}
              onChange={(date) => {
                setFormData({
                  ...formData,
                  end_date: toDate(date),
                });
                setSelectedEndDate(date);
              }}
              minDate={selectedStartDate}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">시간 설정</label>
          <div className="flex items-center">
            <CustomTimePicker
              name={"start"}
              value={startTime}
              onChange={handleTimePicker}
            />
            <div className="w-14 text-center"> - </div>
            <CustomTimePicker
              name={"end"}
              value={endTime}
              onChange={handleTimePicker}
            />
          </div>
          <div className="form-input-group gap-2 ml-10">
            <label className="input-label">
              <CheckBox
                name="gap"
                label="GAP"
                className="checkbox"
                checked={isGapChecked}
                onChange={() => {
                  setIsGapChecked(true);
                  setIsRepeatChecked(false);
                }}
              />
            </label>
            <Dropdown
              name="gap"
              className="min-w-32"
              options={gapOptions}
              value={gapOptions.filter(
                (option) => option.value === formData.gap
              )}
              onChange={handleSelectBox}
              isDisabled={!isGapChecked}
            />
          </div>
          <div className="form-input-group gap-2 ml-10">
            <div className="form-input-group gap-2">
              <label className="input-label">
                <CheckBox
                  name="repeat_count"
                  className="checkbox"
                  label="횟수 / 간격"
                  checked={isRepeatChecked}
                  onChange={() => {
                    setIsRepeatChecked(true);
                    setIsGapChecked(false);
                  }}
                />
              </label>
              <Dropdown
                name="repeat_count"
                className="min-w-24"
                options={repeatOptions}
                value={repeatOptions.filter(
                  (option) => option.value === formData.repeat_count
                )}
                onChange={handleSelectBox}
                isDisabled={!isRepeatChecked}
              />
              <span className="px-2">/</span>
              <Dropdown
                name="repeat_interval"
                className="min-w-24"
                options={repeatInterval}
                value={repeatInterval.filter(
                  (option) => option.value === formData.repeat_interval
                )}
                onChange={handleSelectBox}
                isDisabled={!isRepeatChecked || formData.repeat_count === 1}
              />
            </div>
          </div>
        </div>

        {/* 방송 파일 업로드 */}
        <div className="form-group">
          <label className="font-semibold w-32 shrink-0 leading-9">
            방송파일
          </label>
          <div className="w-full flex flex-col gap-5">
            <FileUploader
              audioFile={audioFile}
              setAudioFile={setAudioFile}
              setDuration={setDuration}
              audioPreviewUrl={audioPreviewUrl}
              setAudioPreviewUrl={setAudioPreviewUrl}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 mt-12">
          <button
            className="btn min-w-24"
            onClick={() => navigate(URL_MAPPING.broadcastManagement)}
          >
            취소
          </button>
          <button
            type="submit"
            className="btn btn-primary min-w-24"
            onClick={handleSubmit}
            disabled={!isFormValid(isGapChecked)}
          >
            {mode === "edit" ? "수정" : "등록"}
          </button>
        </div>
      </div>
      <GroupSelectModal
        modalRef={storeModalRef}
        label={"점포선택"}
        mode={"add"}
        handleSubmit={handleStoreGroup}
        // initialChosenStores={tempSelectedStores}
      />
      <LoadingSpinner includeCodesLoading={true} />
    </ContentLayout>
  );
};

export default BroadcastRegisterPage;
