import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { passwordRegex } from "../../utils/validation";
import { toast } from "react-toastify";
import { changePassword } from "../../api/user/user";
import { useNavigate } from "react-router-dom";
import { URL_MAPPING } from "../../utils/constant/urls";

const PwChangeModal = ({ modalRef, handleSubmitChangePw }) => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  const isPasswordMatched = formData.password1 === formData.password2;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (name, errorMessage) => {
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const isFormValid = () => {
    let isValid = false;

    // 모든 에러 값이 빈 문자열인지 검사
    const isErrorsEmpty = Object.values(errors).every((error) => error === "");

    isValid =
      formData.password1 &&
      formData.password2 &&
      isPasswordMatched &&
      isErrorsEmpty;

    return isValid;
  };

  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;

    const handleClose = () => {
      setFormData({
        password1: "",
        password2: "",
      });
      setErrors({});
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [modalRef]);
  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box bg-white max-w-md">
        <h3 className="font-semibold text-lg mb-4 border-b pb-4">
          비밀번호 변경
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">
              새 비밀번호
            </label>
            <div className="w-full">
              <Input
                type="password"
                name="password1"
                placeholder="비밀번호를 입력하세요."
                className="input w-full"
                value={formData.password1}
                validation={passwordRegex}
                errorMessage={errors.password1}
                handleError={handleError}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <label className="py-2 font-semibold w-1/4 shrink-0">
              비밀번호 확인
            </label>
            <div className="w-full">
              <Input
                type="password"
                name="password2"
                placeholder="비밀번호를 다시한번 입력하세요."
                className="input w-full"
                value={formData.password2}
                errorMessage={
                  !isPasswordMatched ? "비밀번호가 일치하지 않습니다." : ""
                }
                handleError={handleError}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center items-center gap-2.5 mt-8">
          <button
            className="btn min-w-24"
            onClick={() => modalRef.current.close()}
          >
            취소
          </button>
          <button
            className="btn btn-primary min-w-24"
            onClick={() => handleSubmitChangePw(formData.password1, formData.password2)}
            disabled={!isFormValid()}
          >
            비밀번호 변경
          </button>
        </div>

        <button
          className="absolute right-3 top-4 w-10 h-10 text-2xl"
          onClick={() => modalRef.current.close()}
        >
          ✕
        </button>
      </div>
    </dialog>
  );
};

export default PwChangeModal;
