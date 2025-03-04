import Select from "react-select";

const AddCompanyModal = ({ modalRef }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box bg-white max-w-xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">
          광고업체 등록
        </h3>
        <form method="dialog">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">사업자명</label>
              <input
                type="text"
                placeholder="사업자명을 입력하세요"
                class="input w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">사업자번호</label>
              <input
                type="text"
                placeholder="-없이 숫자만 입력하세요"
                class="input w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">브랜드</label>
              <Select
                isMulti
                name="colors"
                options={[
                  { value: "EM", label: "이마트(EM)" },
                  { value: "ED", label: "에브리데이(ED)" },
                  { value: "TR", label: "트레이더스(TR)" },
                ]}
                className="w-full"
                classNamePrefix="select"
                placeholder="브랜드를 선택하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">비고</label>
              <input
                type="text"
                placeholder="내용을 입력하세요"
                class="input w-full"
              />
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

export default AddCompanyModal;
