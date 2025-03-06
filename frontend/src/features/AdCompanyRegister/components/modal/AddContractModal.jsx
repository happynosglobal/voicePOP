import CustomDatePicker from "../../../../components/customDatePicker/CustomDatePicker";
import Select from "react-select";
import { useState } from "react";

const AddContractModal = ({ modalRef }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null); //임시 날짜선택 STATE
  const [selectedEndDate, setSelectedEndDate] = useState(null); //임시 날짜선택 STATE

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box bg-white max-w-xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">계약 추가</h3>
        <form method="dialog">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">광고타입</label>
              <Select
                options={[
                  { value: "0", label: "일반" },
                  { value: "1", label: "스탠다드" },
                  { value: "2", label: "프리미엄" },
                ]}
                className="w-full"
                placeholder="광고타입을 선택하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">계약금액</label>
              <input
                type="text"
                placeholder="계약금액을 입력하세요"
                className="input w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">계약구좌</label>
              <input
                type="text"
                placeholder="계약구좌를 입력하세요"
                className="input w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">계약기간</label>
              <div className="w-full">
                <CustomDatePicker
                  selectedDate={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                />
              </div>
              <div className="w-20 text-center"> - </div>
              <div className="w-full">
                <CustomDatePicker
                  selectedDate={selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">비고</label>
              <input type="text" className="input w-full" />
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
        </form>
      </div>
    </dialog>
  );
};

export default AddContractModal;
