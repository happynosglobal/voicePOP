import Select from "react-select";
import Radio from "../../../components/input/Radio";
import useAddUser from "../hooks/useAddUser";
import Input from "../../../components/input/Input";
import {
  emailRegex,
  passwordRegex,
  userIdRegex,
} from "../../../utils/validation";
import { useEffect, useState } from "react";
import { levelOptions } from "../../../utils/constant/options";
import useBrandCode from "../../../hooks/useBrandCode";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";

const AddUserModal = ({
  modalRef,
  closeModal,
  userId,
  setUserId,
  handleGetUsers,
  mode,
}) => {
  const {
    brandOptions,
    initialFormData,
    formData,
    setFormData,
    userInfo,
    setUserInfo,
    errors,
    setErrors,
    isIdChecked,
    setIsIdChecked,
    isPasswordMatched,
    checkIdDuplicate,
    handleInput,
    handleSelectBox,
    handleMultiSelectBox,
    isFormValid,
    handleGetUserInfo,
    handlePostUserInfo,
    handlePatchUserInfo,
    handleDeletehUserInfo,
    handleClickBrand,
    storeList,
    setStoreList,
    handleError,
  } = useAddUser();

  useEffect(() => {
    if (mode === "modify" && userId) {
      handleGetUserInfo(userId);
    }
  }, [mode, userId]);

  const handleSubmitPost = async () => {
    try {
      await handlePostUserInfo();
      handleGetUsers(1);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitModify = async () => {
    try {
      await handlePatchUserInfo(userId);
      handleGetUsers(1);
      closeModal();
    } catch (err) {
      console.error("사용자 수정 실패:", err);
    }
  };

  const handleSubmitDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await handleDeletehUserInfo(userId);
      handleGetUsers(1);
      closeModal();
    } catch (err) {
      console.error("사용자 수정 실패:", err);
    }
  };

  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;

    const handleClose = () => {
      setFormData(initialFormData);
      setErrors({});
      setUserId(null);
      setUserInfo(null);
      setStoreList([]);
      setIsIdChecked(false);
      setIsEditingPassword(false);
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [modalRef]);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  console.log(mode);

  return (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box bg-white max-w-xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">
          사용자 {mode === "add" ? "등록" : "수정"}
        </h3>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <label className="font-semibold w-1/4 shrink-0">성명</label>
            <Input
              type="text"
              name="user_name"
              placeholder="성명을 입력하세요."
              className="input w-full"
              value={formData.user_name}
              onChange={handleInput}
              errorMessage={errors.user_name}
              handleError={handleError}
            />
          </div>
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">아이디</label>
            <div className="w-full">
              <Input
                type="text"
                name="user_id"
                placeholder="아이디를 입력하세요."
                className="input w-full"
                value={formData.user_id}
                onChange={handleInput}
                {...(mode === "add" && {
                  validation: userIdRegex,
                  errorMessage:
                    errors.user_id ||
                    (!isIdChecked ? "ID 중복 확인을 해주세요." : ""),
                  handleError: handleError,
                })}
                disabled={mode === "modify" ? true : false}
              />
            </div>
            {mode === "add" && (
              <>
                <button
                  className="btn btn-sm btn-accent ml-3"
                  onClick={checkIdDuplicate}
                  disabled={mode === "modify" ? true : false}
                >
                  ID 중복 확인
                </button>
              </>
            )}
          </div>
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">
              비밀번호
            </label>
            <div className="w-full">
              <Input
                type="password"
                name="password"
                placeholder="비밀번호 입력하세요."
                className="input w-full"
                value={formData.password}
                onChange={handleInput}
                validation={passwordRegex}
                errorMessage={errors.password}
                handleError={handleError}
                disabled={mode === "modify" && !isEditingPassword}
              />
            </div>
            {mode === "modify" && (
              <button
                type="button"
                className="btn btn-sm btn-accent ml-3"
                onClick={() => setIsEditingPassword(true)}
              >
                비밀번호 변경
              </button>
            )}
          </div>
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">
              비밀번호 확인
            </label>
            <div className="w-full">
              <Input
                type="password"
                name="confirm_password"
                placeholder="비밀번호를 다시한번 입력해주세요."
                className="input w-full"
                value={formData.confirm_password}
                onChange={handleInput}
                errorMessage={
                  !isPasswordMatched ? "비밀번호가 일치하지 않습니다." : ""
                }
                handleError={handleError}
                disabled={mode === "modify" && !isEditingPassword}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">회사명</label>
            <div className="w-full">
              <Input
                type="text"
                name="company_id"
                placeholder="회사명을 입력해주세요."
                className="input w-full"
                value={formData.company_id}
                onChange={handleInput}
                errorMessage={errors.company_id}
                handleError={handleError}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">권한</label>
            <Select
              name="level"
              options={levelOptions}
              className="w-full"
              value={levelOptions.filter(
                (option) => option.value === formData.level
              )}
              onChange={handleSelectBox}
              placeholder="권한을 선택하세요"
            />
          </div>
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">
              관리브랜드
            </label>
            {formData.level !== "STORE" ? (
              <Select
                isMulti
                name="brand_code"
                options={brandOptions}
                value={brandOptions.filter((option) =>
                  formData.brand_code.includes(option.value)
                )}
                className="w-full"
                classNamePrefix="select"
                onChange={handleMultiSelectBox}
                placeholder="브랜드를 선택하세요"
                isDisabled={formData.level === "ADMIN" ? true : false} // 전체관리자는 disabled
              />
            ) : (
              <Select
                name="brand_code"
                options={brandOptions}
                value={brandOptions.filter(
                  (option) => option.value === formData.brand_code[0]
                )}
                className="w-full"
                classNamePrefix="select"
                onChange={(option) => handleClickBrand(option.value)}
                placeholder="브랜드를 선택하세요"
                isDisabled={formData.level === "ADMIN" ? true : false} // 전체관리자는 disabled
              />
            )}
          </div>

          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">
              관리점포
            </label>
            <Select
              name="store_code"
              options={storeList}
              value={storeList.filter(
                (option) => option.value === formData.store_code
              )}
              className="w-full"
              onChange={handleSelectBox}
              placeholder="관리점포를 선택하세요"
              isDisabled={formData.level === "STORE" ? false : true}
            />
          </div>
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">이메일</label>
            <div className="w-full">
              <Input
                type="email"
                name="email"
                placeholder="이메일을 입력하세요."
                className="input w-full"
                value={formData.email}
                onChange={handleInput}
                validation={emailRegex}
                errorMessage={errors.email}
                handleError={handleError}
              />
            </div>
          </div>
          {mode === "modify" && (
            <div className="flex justify-between">
              <label className="py-2 font-semibold w-1/4 shrink-0">상태</label>
              <div className="flex gap-6 w-full">
                <label
                  htmlFor="reject"
                  className="flex items-center gap-2 cursor-pointer text-base"
                >
                  <Radio
                    id="reject"
                    name="status"
                    className="radio"
                    label="미승인"
                    value={"require"}
                    checked={formData.status === "require"}
                    onChange={handleInput}
                  />
                </label>
                <label
                  htmlFor="approve"
                  className="flex items-center gap-2 cursor-pointer text-base"
                >
                  <Radio
                    id="approve"
                    name="status"
                    className="radio"
                    label="승인"
                    value={"normal"}
                    checked={formData.status === "normal"}
                    onChange={handleInput}
                  />
                </label>
                <label
                  htmlFor="ban"
                  className="flex items-center gap-2 cursor-pointer text-base"
                >
                  <Radio
                    id="ban"
                    name="status"
                    className="radio"
                    label="정지"
                    value={"banned"}
                    checked={formData.status === "banned"}
                    onChange={handleInput}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 mt-12">
          <button
            className="absolute right-3 top-4 w-10 h-10 text-2xl"
            onClick={closeModal}
          >
            ✕
          </button>
          <button className="btn min-w-24" onClick={closeModal}>
            취소
          </button>
          {mode === "add" ? (
            <button
              className="btn btn-primary min-w-24"
              disabled={!isFormValid(mode)}
              onClick={handleSubmitPost}
            >
              등록
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary min-w-24"
                disabled={!isFormValid(mode)}
                onClick={handleSubmitModify}
              >
                수정
              </button>
              <button
                className="btn btn-error min-w-24"
                onClick={handleSubmitDelete}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      <LoadingSpinner />
    </dialog>
  );
};

export default AddUserModal;
