import CustomDatePicker from "../../../../components/customDatePicker/CustomDatePicker";
import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import useAddContractForm from "../../hooks/useAddContractForm";
import { toYYYYMMDD } from "../../../../utils/customFormat";
import Input from "../../../../components/input/Input";

const AddContractModal = ({ activeRow, modalRef, getContractList, mode, selectedContract, setSelectedContract }) => {
  const {
    adTypes,
    initialFormData,
    formData,
    setFormData,
    getAdTypes,
    handleInput,
    handleSelectBox,
    handlePostContract,
    handlePatchContract
  } = useAddContractForm();
  const today = useMemo(() => (new Date()), []);
  const [selectedStartDate, setSelectedStartDate] = useState(today); //임시 날짜선택 STATE
  const [selectedEndDate, setSelectedEndDate] = useState(today); //임시 날짜선택 STATE

  /* 수정 모드 일 때 입력 폼 세팅*/
  useEffect(() => {
    if (mode === "modify" && selectedContract) {
      setFormData({
        ad_type: selectedContract.ad_type,
        contract_from: toYYYYMMDD(selectedContract.contract_from),
        contract_to: toYYYYMMDD(selectedContract.contract_to),
        comment: selectedContract.comment,
        company_id: activeRow?.id,
      });
      setSelectedStartDate(new Date(selectedContract.contract_from));
      setSelectedEndDate(new Date(selectedContract.contract_to));
    }
  }, [mode, selectedContract]);

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
  /* 선택한 광고업체의 정보로 해당 브랜드의 광고타입 조회 */
  useEffect(() => {
    if (activeRow) {
      getAdTypes(activeRow.brand_code);
    }
  }, [activeRow]);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  /* 광고 계약 등록 */
  const handleSubmitPost = async () => {
    if (!activeRow?.id) return;
    formData.company_id = activeRow.id;
    try {
      await handlePostContract();
      getContractList(activeRow, 1)
      closeModal();
    } catch (err) {
      console.error(err)
    }
  }

  /* 광고 계약 등록 */
  const handleSubmitPatch = async () => {
    if (!selectedContract?.id) return;
    try {
      await handlePatchContract(selectedContract.id);
      getContractList(activeRow, 1)
      closeModal();
    } catch (err) {
      console.error(err)
    }
  }

  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;

    const handleClose = () => {
      setSelectedStartDate(today);
      setSelectedEndDate(today);
      setFormData(initialFormData);
      setSelectedContract(null);
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [modalRef]);
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box bg-white max-w-xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">
          {mode === "add" ? "계약 추가" : "계약 수정"}
        </h3>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">광고타입</label>
            <Select
              name="ad_type"
              options={adTypes}
              value={adTypes.filter(option => option.value === formData.ad_type)}
              onChange={handleSelectBox}
              className="w-full"
              placeholder="광고타입을 선택하세요"
            />
          </div>
          {/* <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">계약금액</label>
            <input
              type="text"
              placeholder="계약금액을 입력하세요"
              className="input w-full"
            />
          </div> */}
          {/* <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">계약구좌</label>
            <input
              type="text"
              placeholder="계약구좌를 입력하세요"
              className="input w-full"
            />
          </div> */}
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">계약기간</label>
            <div className="w-full">
              <CustomDatePicker
                selectedDate={selectedStartDate}
                onChange={(date) => {
                  setFormData({
                    ...formData,
                    contract_from: toYYYYMMDD(date)
                  });
                  setSelectedStartDate(date);
                }}
              />
            </div>
            <div className="w-20 text-center"> - </div>
            <div className="w-full">
              <CustomDatePicker
                selectedDate={selectedEndDate}
                onChange={(date) => {
                  setFormData({
                    ...formData,
                    contract_to: toYYYYMMDD(date)
                  });
                  setSelectedEndDate(date);
                }}
                minDate={selectedStartDate}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">비고</label>
            <Input
              type="text"
              name="comment"
              className="input w-full"
              value={formData.comment}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 mt-12">
          <button className="absolute right-3 top-4 w-10 h-10 text-2xl" onClick={closeModal}>
            ✕
          </button>
          <button className="btn min-w-24" onClick={closeModal}>취소</button>
          {mode === "add" ? (
            <button
              type="submit"
              className="btn btn-primary min-w-24"
              onClick={handleSubmitPost}>
              등록
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary min-w-24"
              onClick={handleSubmitPatch}>
              수정
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default AddContractModal;
