import React, { useCallback, useRef, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Title from "../../components/title/Title";
import Select from "react-select";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import { useDropzone } from "react-dropzone";
import StoreSelectModal from "./components/StoreSelectModal";

const BroadcastRegisterPage = () => {
  const storeModalRef = useRef(null); // 점포 선택 모달 ref

  const [selectedStartDate, setSelectedStartDate] = useState(null); //임시 날짜선택 STATE
  const [selectedEndDate, setSelectedEndDate] = useState(null); //임시 날짜선택 STATE
  const [isGapChecked, setIsGapChecked] = useState(false); //임시 GAP STATE

  const dummyStores = [
    "EM킨텍스점",
    "EM청주북문로3가점",
    "EM천안점",
    "EM아산점",
    "EM청주점",
    "EM청주가경점",
    "EM청주율량점",
    "EM청주직지점",
    "EM청주봉명점",
    "EM대전관저점",
    "EM대전중리점",
    "EM킨텍스점",
    "EM청주북문로3가점",
    "EM천안점",
    "EM아산점",
    "EM청주점",
    "EM청주가경점",
    "EM청주율량점",
    "EM청주봉명점",
    "EM대전관저점",
    "EM대전중리점",
    "EM킨텍스점",
    "EM청주북문로3가점",
    "EM천안점",
    "EM아산점",
    "EM청주점",
    "EM청주가경점",
    "EM청주율량점",
  ];

  const [uploadedFile, setUploadedFile] = useState(null); // dropzone STATE

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]); // 파일 1개만 저장
    }
  };

  const removeFile = () => {
    setUploadedFile(null); // 파일 삭제 시 다시 업로드 UI 표시
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: "audio/*", // 오디오 파일만 허용
    maxSize: 5 * 1024 * 1024, // 5MB 제한
  });

  return (
    <ContentLayout>
      <Title text="방송등록" />
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">방송명</label>
          <input
            type="text"
            placeholder="방송명을 입력하세요"
            class="input w-full"
          />
        </div>
        <div className="form-group">
          <label className="form-label">MD</label>
          <div className="form-input-group">
            <label className="input-label">
              <input type="radio" name="md" className="radio" checked />
              농산
            </label>
            <label className="input-label">
              <input type="radio" name="md" className="radio" />
              수산
            </label>
            <label className="input-label">
              <input type="radio" name="md" className="radio" />
              축산
            </label>
            <label className="input-label">
              <input type="radio" name="md" className="radio" />
              델리
            </label>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">적용점포</label>
          <div class="w-full">
            <div className="mb-2 flex justify-between items-center gap-2">
              <div className="space-x-2">
                <button className="btn btn-sm btn-accent">전점</button>
                <button
                  className="btn btn-sm btn-accent"
                  onClick={() => storeModalRef.current.showModal()}
                >
                  점포선택
                </button>
              </div>
              <p className="text-gray-500 text-right leading-tight">
                선택된 점포 수 : <b className="text-gray-900">103</b>개
              </p>
            </div>
            {/* 점포 선택 안했다면 안보임 */}
            <div className="p-2 border rounded-[10px] max-h-48 min-h-16 overflow-y-auto">
              <div className="flex flex-wrap gap-1 text-center">
                {dummyStores.map((store, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded text-sm"
                  >
                    {store}
                  </span>
                ))}
              </div>
            </div>
            {/* 점포 선택 안했다면 안보임 */}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">기간설정</label>
          <div className="flex items-center">
            <CustomDatePicker
              selectedDate={selectedStartDate}
              onChange={(date) => setSelectedStartDate(date)}
              placeholder="시작일"
            />
            <div className="w-10 text-center"> - </div>
            <CustomDatePicker
              selectedDate={selectedEndDate}
              onChange={(date) => setSelectedEndDate(date)}
              placeholder="종료일"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">시간 설정</label>
          <div className="flex items-center">
            <Select
              options={[
                { value: "0", label: "09:00" },
                { value: "1", label: "10:00" },
                { value: "2", label: "11:00" },
                { value: "3", label: "12:00" },
                { value: "4", label: "13:00" },
                { value: "5", label: "14:00" },
                { value: "6", label: "15:00" },
                { value: "7", label: "16:00" },
                { value: "8", label: "17:00" },
                { value: "9", label: "18:00" },
                { value: "10", label: "19:00" },
                { value: "11", label: "20:00" },
                { value: "12", label: "21:00" },
                { value: "13", label: "22:00" },
              ]}
              className="min-w-32"
              placeholder="시작 시간"
              defaultValue={{ value: "0", label: "09:00" }}
            />
            <div className="w-14 text-center"> - </div>
            <Select
              options={[
                { value: "0", label: "09:00" },
                { value: "1", label: "10:00" },
                { value: "2", label: "11:00" },
                { value: "3", label: "12:00" },
                { value: "4", label: "13:00" },
                { value: "5", label: "14:00" },
                { value: "6", label: "15:00" },
                { value: "7", label: "16:00" },
                { value: "8", label: "17:00" },
                { value: "9", label: "18:00" },
                { value: "10", label: "19:00" },
                { value: "11", label: "20:00" },
                { value: "12", label: "21:00" },
                { value: "13", label: "22:00" },
              ]}
              className="w-full"
              placeholder="시작 시간"
              defaultValue={{ value: "13", label: "22:00" }}
            />
          </div>
          <div className="form-input-group gap-2 ml-10">
            <label className="input-label">
              GAP
              <input
                type="checkbox"
                className="checkbox"
                checked={isGapChecked}
                onChange={() => setIsGapChecked(!isGapChecked)}
              />
            </label>
            <Select
              options={[
                { value: "0", label: "5" },
                { value: "1", label: "10" },
                { value: "2", label: "15" },
                { value: "3", label: "20" },
                { value: "4", label: "25" },
                { value: "5", label: "30" },
              ]}
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
              횟수
              <input type="checkbox" className="checkbox" />
            </label>
            <Select
              options={[
                { value: "0", label: "5" },
                { value: "1", label: "10" },
                { value: "2", label: "15" },
                { value: "3", label: "20" },
                { value: "4", label: "25" },
                { value: "5", label: "30" },
              ]}
              className="min-w-24"
              defaultValue={{ value: "0", label: "5" }}
              isDisabled={true}
            />
            회
          </div>
          <div className="ml-10 form-input-group gap-2">
            <label className="input-label">
              간격
              <input type="checkbox" className="checkbox" />
            </label>
            <Select
              options={[
                { value: "0", label: "5" },
                { value: "1", label: "10" },
                { value: "2", label: "15" },
                { value: "3", label: "20" },
                { value: "4", label: "25" },
                { value: "5", label: "30" },
              ]}
              className="min-w-24"
              defaultValue={{ value: "0", label: "5" }}
              isDisabled={true}
            />
            분
          </div>
        </div>

        {/* 방송 파일 업로드 */}
        <div className="form-group">
          <label className="font-semibold w-32 shrink-0 leading-9">
            방송파일
          </label>

          <div className="w-full overflow-hidden">
            {/* 파일이 없을 때만 업로드 UI 표시 */}
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className="p-4 border-2 border-dashed rounded-[10px] cursor-pointer text-center transition hover:border-primary"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-primary text-sm">
                    여기에 파일을 놓으세요.
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">
                    최대 5MB 이하, 오디오 파일을 업로드 하세요
                  </p>
                )}
                <button className="mt-2 btn btn-sm btn-accent">
                  파일 가져오기
                </button>
              </div>
            ) : (
              // 파일이 업로드되면 업로드 UI 숨기고 파일 정보 표시

              <div className="flex items-center justify-between p-4 border rounded-[10px]">
                <span className="text-gray-700 truncate w-4/5">
                  {uploadedFile.name} (
                  {(uploadedFile.size / 1024 / 1024).toFixed(4)}MB)
                </span>
                <button onClick={removeFile} className="btn btn-error btn-xs">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 mt-12">
          <button className="absolute right-3 top-4 w-10 h-10 text-2xl">
            ✕
          </button>
          <button className="btn min-w-24">취소</button>
          <button type="submit" className="btn btn-primary min-w-24">
            등록
          </button>
        </div>
      </div>
      <StoreSelectModal modalRef={storeModalRef} /> {/* 점포선택 모달 */}
    </ContentLayout>
  );
};

export default BroadcastRegisterPage;
