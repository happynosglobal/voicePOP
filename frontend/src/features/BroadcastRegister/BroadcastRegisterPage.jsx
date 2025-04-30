import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Select from "react-select";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import CustomTimePicker from "../../components/customTimePicker/CustomTimePicker";
import GroupSelectModal from "../../components/modal/GroupSelectModal";
import Input from "../../components/input/Input";
import Radio from "../../components/input/Radio";
import CheckBox from "../../components/input/CheckBox";
import { toDate } from "../../utils/customFormat";
import useCodes from "../../stores/codes";
import {
  gapOptions,
  repeatInterval,
  repeatOptions,
} from "../../utils/constant/options";
import FileUploader from "../../components/input/FileUploader";
import useUserStore from "../../stores/user";
import {
  postAudioMapping,
  postBcMaster,
  postBcMedia,
  postBcTargetStore,
} from "../../api/broadcast/broadcast";
import { toast } from "react-toastify";
import useBroadcastRegister from "./hooks/useBroadcastRegister";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const BroadcastRegisterPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { storeByBrandCode, isLoading } = useCodes();
  const {
    formData,
    setFormData,
    selectedStore,
    setSelectedStore,
    audioFile,
    setAudioFile,
    categoryOptions,
    handleInput,
    handleSelectBox,
    isFormValid,
  } = useBroadcastRegister();

  const storeModalRef = useRef(null); // 점포 선택 모달 ref

  const today = useMemo(() => new Date(), []);
  const [selectedStartDate, setSelectedStartDate] = useState(today); // 시작날짜선택 STATE
  const [selectedEndDate, setSelectedEndDate] = useState(today); // 종료날짜선택 STATE

  const [tempSelectedStores, setTempSelectedStores] = useState([]);

  /* 계약기간 시작일보다 종료일이 빠르면 시작일로 초기화*/
  useEffect(() => {
    if (selectedStartDate > selectedEndDate) {
      setSelectedEndDate(selectedStartDate);
      setFormData({
        ...formData,
        end_date: toDate(selectedStartDate),
      });
    }
  }, [selectedStartDate, selectedEndDate]);

  const [isGapChecked, setIsGapChecked] = useState(false); //GAP
  const [isRepeatCountChecked, setIsRepeatCountChecked] = useState(false); //반복 횟수
  const [isIntervalChecked, setIsIntervalChecked] = useState(false); //반복 간격

  const [startTime, setStartTime] = useState("09:00"); // 시작 시간
  const [endTime, setEndTime] = useState("22:00"); // 종료 시간

  // 시간선택 handler
  const handleTimePicker = (time, name) => {
    if (name === "start") {
      setFormData({
        ...formData,
        start_time: time.replace(":", ""),
      });
      setStartTime(time);
    } else {
      setFormData({
        ...formData,
        end_time: time.replace(":", ""),
      });
      setEndTime(time);
    }
  };
  // 점포 선택 handler
  const handleStoreGroup = (_, store) => {
    const formattedStores = store.map(({ value, label }) => ({
      store_code: value,
      store_name: label,
    }));
    setSelectedStore(formattedStores);
    storeModalRef.current.close();
  };

  // 광고 방송 등록 handler
  const handleSubmit = async () => {
    // 예상 api
    try {
      // // 방송 대상 점포 등록
      // const targetStoreRes = await postBcTargetStore({
      //   brand_code: user?.brand_code,
      //   content_id: "",
      //   item: selectedStore,
      // });

      // if (targetStoreRes.status !== 200) {
      //   throw new Error("방송 대상 점포 등록 실패");
      // }

      // const targetStoresId = targetStoreRes.data.data.id;

      const body = {
        type: "normal",
        title: formData.title,
        category_type_seq: formData.category_type_seq,
        start_time: "0900",
        end_time: "2300",
        start_date: formData.start_date,
        end_date: formData.end_date,
        gap: formData.gap,
        repeat_count: formData.repeat_count,
        repeat_interval: formData.repeat_interval,
        user_id: user?.user_id,
      };

      // 마스터 방송 등록
      const broadcastRes = await postBcMaster(body);

      if (broadcastRes.data.status_code !== 200) {
        throw new Error("마스터 방송 등록 실패");
      }

      const masterBroadcastId = broadcastRes.data.data.id;

      // 방송 대상 점포 등록
      const targetStoreRes = await postBcTargetStore({
        brand_code: user?.brand_code,
        content_id: masterBroadcastId,
        item: selectedStore,
        user_id: user?.user_id,
      });

      if (targetStoreRes.status !== 200) {
        throw new Error("방송 대상 점포 등록 실패");
      }

      const targetStoresId = targetStoreRes.data.data.id;

      // 오디오 파일 업로드
      const audioFormData = new FormData();
      audioFormData.append("media_type", "sound");
      audioFormData.append("media_filename", audioFile);
      audioFormData.append("media_desc", "시범데이터");

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
      toast.success("방송 등록이 완료되었습니다!");
      navigate("/equipment-status");
    } catch (error) {
      console.error("방송 등록 중 오류 발생:", error);
      toast.error("방송 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <ContentLayout>
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
          <div className="form-input-group">
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
            <div className="mb-2 flex justify-between items-center gap-2">
              <div className="space-x-2">
                <button
                  className="btn btn-sm btn-accent"
                  onClick={() => {
                    handleStoreGroup("", storeByBrandCode);
                  }}
                >
                  전점
                </button>
                <button
                  className="btn btn-sm btn-accent"
                  onClick={() => {
                    setTempSelectedStores(
                      selectedStore.map((s) => ({
                        value: s.store_code,
                        label: s.store_name,
                      }))
                    );
                    storeModalRef.current.showModal();
                  }}
                >
                  점포선택
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => {
                    handleStoreGroup("", []);
                  }}
                >
                  초기화
                </button>
              </div>
              <p className="text-gray-500 text-right leading-tight">
                선택된 점포 수 :{" "}
                <b className="text-gray-900">{selectedStore.length}</b>개
              </p>
            </div>
            {selectedStore.length !== 0 && (
              <div className="p-2 border rounded-[10px] max-h-48 min-h-16 overflow-y-auto">
                <div className="flex flex-wrap gap-1 text-center">
                  {selectedStore.map((store, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded text-sm"
                    >
                      {store.store_name}
                    </span>
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
                onChange={() => setIsGapChecked(!isGapChecked)}
              />
            </label>
            <Select
              name="gap"
              className="min-w-32"
              options={gapOptions}
              value={gapOptions.filter(
                (option) => option.value === formData.gap
              )}
              onChange={handleSelectBox}
              isDisabled={!isGapChecked}
            />
            초
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">반복 설정</label>
          <div className="form-input-group gap-2">
            <label className="input-label">
              <CheckBox
                name="repeat_count"
                className="checkbox"
                label="횟수"
                checked={isRepeatCountChecked}
                onChange={() => setIsRepeatCountChecked(!isRepeatCountChecked)}
              />
            </label>
            <Select
              name="repeat_count"
              className="min-w-24"
              options={repeatOptions}
              value={repeatOptions.filter(
                (option) => option.value === formData.repeat_count
              )}
              onChange={handleSelectBox}
              isDisabled={!isRepeatCountChecked}
            />
            회
          </div>
          <div className="ml-10 form-input-group gap-2">
            <label className="input-label">
              <CheckBox
                name="repeat_method"
                className="checkbox"
                label="간격"
                checked={isIntervalChecked}
                onChange={() => setIsIntervalChecked(!isIntervalChecked)}
              />
            </label>
            <Select
              name="repeat_interval"
              className="min-w-24"
              options={repeatInterval}
              value={repeatInterval.filter(
                (option) => option.value === formData.repeat_interval
              )}
              onChange={handleSelectBox}
              isDisabled={!isIntervalChecked}
            />
            분
          </div>
        </div>

        {/* 방송 파일 업로드 */}
        <div className="form-group">
          <label className="font-semibold w-32 shrink-0 leading-9">
            방송파일
          </label>
          <FileUploader audioFile={audioFile} setAudioFile={setAudioFile} />
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 mt-12">
          <button className="btn min-w-24">취소</button>
          <button
            type="submit"
            className="btn btn-primary min-w-24"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            등록
          </button>
        </div>
      </div>
      <GroupSelectModal
        modalRef={storeModalRef}
        label={"점포 생성"}
        mode={"add"}
        handleSubmit={handleStoreGroup}
        initialChosenStores={tempSelectedStores}
      />
      <LoadingSpinner includeCodesLoading={true} />
    </ContentLayout>
  );
};

export default BroadcastRegisterPage;
