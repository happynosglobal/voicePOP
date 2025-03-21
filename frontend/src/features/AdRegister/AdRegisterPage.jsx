import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Title from "../../components/title/Title";
import Select from "react-select";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import CustomTimePicker from "../../components/customTimePicker/CustomTimePicker";
import GroupSelectModal from "../../components/modal/GroupSelectModal";
import Input from "../../components/input/Input";
import Radio from "../../components/input/Radio";
import useAdRegister from "./hooks/useAdRegister";
import CheckBox from "../../components/input/CheckBox";
import { toYYYYMMDD } from "../../utils/customFormat";
import useCodes from "../../stores/codes";
import { repeatOptions } from "../../utils/constant/options";
import FileUploader from "../../components/input/FileUploader";
import useUserStore from "../../stores/user";

const AdRegisterPage = () => {
  const { user } = useUserStore();
  const { allStore } = useCodes();
  const {
    formData,
    setFormData,
    companyOptions,
    setCompanyOptions,
    getCompanyOption,
    contractOptions,
    setContractOptions,
    getContractOption,
    handleInput,
    handleSelectBox
  } = useAdRegister();
  // console.log(formData);
  
  useEffect(() => {
    getCompanyOption(user?.brand_code)
  }, [user]);

  useEffect(() => {
    getContractOption(formData.company)
  }, [formData.company]);


  const storeModalRef = useRef(null); // 점포 선택 모달 ref

  const [selectedStore, setSelectedStore] = useState([]); // 선택된 점포

  const today = useMemo(() => (new Date()), []);
  const [selectedStartDate, setSelectedStartDate] = useState(today); // 시작날짜선택 STATE
  const [selectedEndDate, setSelectedEndDate] = useState(today); // 종료날짜선택 STATE

  /* 계약기간 시작일보다 종료일이 빠르면 시작일로 초기화*/
  useEffect(() => {
    if (selectedStartDate > selectedEndDate) {
      setSelectedEndDate(selectedStartDate);
      setFormData({
        ...formData,
        end_period: toYYYYMMDD(selectedStartDate)
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
        start_time: time
      });
      setStartTime(time)
    } else {
      setFormData({
        ...formData,
        end_time: time
      });
      setEndTime(time)
    }
  }
  // 점포 선택 handler
  const handleStoreGroup = (_, store) => {
    console.log(store)
    setSelectedStore(store);
  }

  // 광고 등록 handler
  const handleSubmit = () => {
    const body = new FormData();
    // body.files = uploadedFile;
    console.log(body);
  }

  return (
    <ContentLayout>
      <Title text="광고등록" />
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">광고명</label>
          <Input
            type="text"
            name="name"
            placeholder="광고명을 입력하세요"
            className="input w-full"
            value={formData.name}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label className="form-label">MD</label>
          <div className="form-input-group">
            <label htmlFor="ag" className="input-label">
              <Radio
                id="ag"
                name="md"
                className="radio"
                label="농산"
                value={"ag"}
                checked={formData.md === "ag"}
                onChange={handleInput}
              />
            </label>
            <label htmlFor="fs" className="input-label">
              <Radio
                id="fs"
                name="md"
                className="radio"
                label="수산"
                value={"fs"}
                checked={formData.md === "fs"}
                onChange={handleInput}
              />
            </label>
            <label htmlFor="ls" className="input-label">
              <Radio
                id="ls"
                name="md"
                className="radio"
                label="축산"
                value={"ls"}
                checked={formData.md === "ls"}
                onChange={handleInput}
              />
            </label>
            <label htmlFor="dl" className="input-label">
              <Radio
                id="dl"
                name="md"
                className="radio"
                label="델리"
                value={"dl"}
                checked={formData.md === "dl"}
                onChange={handleInput}
              />
            </label>
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
                    setSelectedStore(allStore)
                  }}
                >
                  전점
                </button>
                <button
                  className="btn btn-sm btn-accent"
                  onClick={() => storeModalRef.current.showModal()}
                >
                  점포선택
                </button>
              </div>
              <p className="text-gray-500 text-right leading-tight">
                선택된 점포 수 : <b className="text-gray-900">{selectedStore.length}</b>개
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
                      {store.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 방송 등록과 달리, 광고 등록에만 추가되는 폼 START */}
        <div className="form-group">
          <label className="form-label">광고 업체</label>
          <Select
            name="company"
            className="min-w-64"
            options={companyOptions}
            value={companyOptions.filter(option => option.value === formData.company)}
            onChange={handleSelectBox}
            placeholder="광고 업체를 선택하세요"
          />
        </div>
        <div className="form-group">
          <label className="form-label">광고 계약</label>
          <Select
            name="contract"
            className="w-full"
            options={contractOptions}
            value={contractOptions.filter(option => option.value === formData.contract)}
            onChange={handleSelectBox}
            placeholder="광고 계약을 선택하세요"
          />
        </div>
        {/* 방송 등록과 달리, 광고 등록에만 추가되는 폼 END */}

        <div className="form-group">
          <label className="form-label">기간 설정</label>
          <div className="flex items-center">
            <CustomDatePicker
              selectedDate={selectedStartDate}
              onChange={(date) => {
                setFormData({
                  ...formData,
                  start_period: toYYYYMMDD(date)
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
                  end_period: toYYYYMMDD(date)
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
              options={repeatOptions}
              className="min-w-32"
              defaultValue={{ value: "0", label: "5" }}
              isDisabled={!isGapChecked}
            />
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
              options={repeatOptions}
              className="min-w-24"
              defaultValue={{ value: "0", label: "5" }}
              isDisabled={!isRepeatCountChecked}
            />
            회
          </div>
          <div className="ml-10 form-input-group gap-2">
            <label className="input-label">
              <CheckBox
                name="interval"
                className="checkbox"
                label="간격"
                checked={isIntervalChecked}
                onChange={() => setIsIntervalChecked(!isIntervalChecked)}
              />
            </label>
            <Select
              options={repeatOptions}
              className="min-w-24"
              defaultValue={{ value: "0", label: "5" }}
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
          <FileUploader
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 mt-12">
          <button className="absolute right-3 top-4 w-10 h-10 text-2xl">
            ✕
          </button>
          <button className="btn min-w-24">취소</button>
          <button type="submit" className="btn btn-primary min-w-24" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
      <GroupSelectModal
        modalRef={storeModalRef}
        label={"점포 생성"}
        handleSubmit={handleStoreGroup}
      />
    </ContentLayout>
  );
};

export default AdRegisterPage;
