import { IoClose } from "react-icons/io5";
import Select from "react-select";

const AddUserModal = ({ modalRef }) => {
  return (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box bg-white max-w-xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">
          사용자 등록
        </h3>
        <form method="dialog">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">성명</label>
              <input
                type="text"
                class="input w-full"
                value=""
                placeholder="성명을 입력하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">아이디</label>
              <input
                type="text"
                class="input w-full"
                value=""
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">패스워드</label>
              <input
                type="text"
                class="input w-full"
                value=""
                placeholder="패스워드를 입력하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">권한</label>
              <Select
                options={[
                  { value: "0", label: "전체 관리자" },
                  { value: "1", label: "브랜드 관리자" },
                  { value: "2", label: "광고 관리자" },
                  { value: "3", label: "점포 관리자" },
                ]}
                className="w-full"
                placeholder="권한을 선택하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">관리브랜드</label>
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
              <label className="font-semibold w-1/4 shrink-0">관리점포</label>
              <Select
                options={[
                  { value: "0", label: "행당점" },
                  { value: "1", label: "점포A" },
                  { value: "2", label: "점포B" },
                  { value: "3", label: "점포C" },
                  { value: "4", label: "점포D" },
                ]}
                className="w-full"
                placeholder="관리점포를 선택하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">이메일</label>
              <input
                type="email"
                class="input w-full"
                value=""
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold w-1/4 shrink-0">상태</label>
              <div className="flex gap-10 w-full">
                <label className="flex items-center gap-2 cursor-pointer text-base">
                  <input type="radio" name="status" className="radio" />
                  미승인
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-base">
                  <input type="radio" name="status" className="radio" checked />
                  승인
                </label>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-2.5 mt-12">
            <button className="absolute right-3 top-4 w-10 h-10 text-2xl">
              ✕
            </button>
            <button className="btn min-w-24">취소</button>
            {/* <button className="btn btn-error min-w-24">삭제</button> */}
            <button type="submit" className="btn btn-primary min-w-24">
              등록
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddUserModal;
