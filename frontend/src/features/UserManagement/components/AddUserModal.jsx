import Select from "react-select";
import Radio from "../../../components/input/radio";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import useAddUser from "../hooks/useAddUser";
import Input from "../../../components/input/Input";
import { passwordRegex, userIdRegex } from "../../../utils/validation";
import { useEffect } from "react";

const AddUserModal = ({ modalRef, closeModal, userId, setUserId, mode }) => {
  const {
    formData,
    setFormData,
    userInfo,
    setUserInfo,
    errors,
    isIdChecked,
    isPasswordMatched,
    checkIdDuplicate,
    handleInput,
    handleSelectBox,
    handleMultiSelectBox,
    isFormValid,
    handleGetUserInfo
  } = useAddUser();
  useEffect(() => {
    if (mode === "modify" && userId) {
      handleGetUserInfo(userId);
    }
  }, [mode, userId]);

  useEffect(() => {
  }, [modalRef]);

  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    console.log(modal)
    if (!modal) return;

    const handleClose = () => {
      setUserInfo(null);
      setFormData({
        user_id: '',
        user_name: '',
        company_id: '',
        level: 0,
        brand_code: [],
        password: '',
        confirm_password: '',
        store_code: '',
        email: '',
        status: "미승인"
      });
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [modalRef]);
  return (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <LoadingSpinner isLoading={false} />
      <div className="modal-box bg-white max-w-xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">
          사용자 {mode === "add" ? "등록" : "수정"}
        </h3>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">성명</label>
            <Input
              type="text"
              name="user_name"
              placeholder="성명을 입력하세요."
              className="input w-full"
              value={formData.user_name}
              onChange={handleInput}
              errorMessage={errors.user_name}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">아이디</label>
            <div className="w-full mr-3">
              <Input
                type="text"
                name="user_id"
                placeholder="아이디를 입력하세요."
                className="input w-full"
                value={formData.user_id}
                onChange={handleInput}
                // 등록 일 때만 정규식 검사
                {...(mode === "add" && {
                  validation: userIdRegex,
                  errorMessage: !isIdChecked ? "ID 중복 확인 을 해주세요." : errors.user_id,
                })}
                disabled={mode === "modify" ? true : false}
              />
            </div>
            <button className="btn btn-sm btn-black" onClick={checkIdDuplicate} disabled={mode === "modify" ? true : false}>ID 중복 확인</button>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">패스워드</label>
            <div className="w-full">
              <Input
                type="password"
                name="password"
                placeholder="비밀번호 입력하세요."
                className="input w-full"
                value={formData.password}
                onChange={handleInput}
                validation={passwordRegex}
                disabled={mode === "modify" ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">패스워드 확인</label>
            <div className="w-full">
              <Input
                type="password"
                name="confirm_password"
                placeholder="비밀번호를 다시한번 입력해주세요."
                className="input w-full"
                value={formData.confirm_password}
                onChange={handleInput}
                errorMessage={!isPasswordMatched ? "비밀번호가 일치하지 않습니다." : ""}
                disabled={mode === "modify" ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">권한</label>
            <Select
              name="level"
              options={[
                { value: 0, label: "전체 관리자" },
                { value: 1, label: "브랜드 관리자" },
                { value: 2, label: "광고 관리자" },
                { value: 3, label: "점포 관리자" },
              ]}
              className="w-full"
              value={[
                { value: 0, label: "전체 관리자" },
                { value: 1, label: "브랜드 관리자" },
                { value: 2, label: "광고 관리자" },
                { value: 3, label: "점포 관리자" },
              ].filter(option => option.value === formData.level)}
              onChange={handleSelectBox}
              placeholder="권한을 선택하세요"
            />

          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">관리브랜드</label>
            <Select
              isMulti
              name="brand_code"
              options={[
                { value: "EM", label: "이마트(EM)" },
                { value: "ED", label: "에브리데이(ED)" },
                { value: "TR", label: "트레이더스(TR)" },
              ]}
              value={[
                { value: "EM", label: "이마트(EM)" },
                { value: "ED", label: "에브리데이(ED)" },
                { value: "TR", label: "트레이더스(TR)" },
              ].filter(option => formData.brand_code.includes(option.value))}
              className="w-full"
              classNamePrefix="select"
              onChange={handleMultiSelectBox}
              placeholder="브랜드를 선택하세요"
              isDisabled={formData.level === 0 ? true : false}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">관리점포</label>
            <Select
              name="store_code"
              options={[
                { value: "0", label: "행당점" },
                { value: "1", label: "점포A" },
                { value: "2", label: "점포B" },
                { value: "3", label: "점포C" },
                { value: "4", label: "점포D" },
              ]}
              value={[
                { value: "0", label: "행당점" },
                { value: "1", label: "점포A" },
                { value: "2", label: "점포B" },
                { value: "3", label: "점포C" },
                { value: "4", label: "점포D" },
              ].filter(option => option.value === formData.store_code)}
              className="w-full"
              onChange={handleSelectBox}
              placeholder="관리점포를 선택하세요"
              isDisabled={formData.level === 3 ? false : true}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">이메일</label>
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력하세요."
              className="input w-full"
              value={formData.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold w-1/4 shrink-0">상태</label>
            <div className="flex gap-10 w-full">
              <label htmlFor="reject" className="flex items-center gap-2 cursor-pointer text-base">
                <Radio
                  id="reject"
                  name="status"
                  className="radio"
                  label="미승인"
                  value={"미승인"}
                  checked={formData.status === "미승인"}
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="approve" className="flex items-center gap-2 cursor-pointer text-base">
                <Radio
                  id="approve"
                  name="status"
                  className="radio"
                  label="승인"
                  value={"승인"}
                  checked={formData.status === "승인"}
                  onChange={handleInput}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 mt-12">
          <button
            className="absolute right-3 top-4 w-10 h-10 text-2xl"
            onClick={(e) => {
              setUserInfo(null);
              closeModal();
            }}
          >
            ✕
          </button>
          <button
            className="btn min-w-24"
            onClick={(e) => {
              setUserInfo(null);
              closeModal();
            }}
          >
            취소
          </button>
          {/* <button className="btn btn-error min-w-24">삭제</button> */}
          <button
            // type="submit"
            className="btn btn-primary min-w-24"
            disabled={!isFormValid()}
          >
            {mode === "add" ? "등록" : "수정"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddUserModal;
