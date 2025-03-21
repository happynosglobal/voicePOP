import Select from "react-select";
import useAddCompanyForm from "../../hooks/useAddCompanyForm";
import Input from "../../../../components/input/Input";
import { toBusinessNumber } from "../../../../utils/customFormat";
import { useEffect } from "react";
const brandList = [
  { value: "EM", label: "이마트(EM)" },
  { value: "ED", label: "에브리데이(ED)" },
]
const AddCompanyModal = ({ modalRef }) => {
  const {
    formData,
    setFormData,
    handleInput,
    handleMultiSelectBox,
    initialFormData
  } = useAddCompanyForm();

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;

    const handleClose = () => {
      setFormData(initialFormData);
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
          광고업체 등록
        </h3>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">사업자명</label>
            <Input
              name="business_name"
              type="text"
              placeholder="사업자명을 입력하세요"
              className="input w-full"
              value={formData.business_name}
              onChange={handleInput}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">사업자번호</label>
            <Input
              name="business_number"
              type="text"
              placeholder="-없이 숫자만 입력하세요"
              className="input w-full"
              value={toBusinessNumber(formData.business_number)}
              // value={formData.business_number}
              onChange={handleInput}
              maxLength={12}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">브랜드</label>
            <Select
              isMulti
              name="brand_code"
              options={brandList}
              value={brandList.filter(option => formData.brand_code.includes(option.value))}
              className="w-full"
              onChange={handleMultiSelectBox}
              classNamePrefix="select"
              placeholder="브랜드를 선택하세요"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">비고</label>
            <Input
              name="comment"
              type="text"
              placeholder="내용을 입력하세요"
              className="input w-full"
              value={formData.comment}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 mt-12">
          <button
            className="absolute right-3 top-4 w-10 h-10 text-2xl"
            onClick={closeModal}
          >
            ✕
          </button>
          <button
            className="btn min-w-24"
            onClick={closeModal}
          >취소
          </button>
          <button type="submit" className="btn btn-primary min-w-24">
            등록
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddCompanyModal;
