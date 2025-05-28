import { useEffect, useState } from "react";
import Logo from "../../components/logo/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_MAPPING } from "../../utils/constant/urls";
import { changePassword } from "../../api/user/user";
import { toast } from "react-toastify";
import { commonErrorMessage } from "../../utils/constant/messages";
import Input from "../../components/input/Input";
import { passwordRegex } from "../../utils/validation";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user_id, user_name, email } = location.state || {};

  useEffect(() => {
    if (!user_id || !user_name || !email) {
      navigate("/", { replace: true });
    }
  }, [user_id, user_name, email, navigate]);

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

  const handleSubmit = async () => {
    const body = formData;
    try {
      const response = await changePassword(body);
      const { status, data } = response;
      if (status === 200) {
        toast.success(data.message);
        navigate(URL_MAPPING.login);
      }
    } catch (err) {
      toast.error(err.response.data.message || commonErrorMessage);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card max-w-md bg-white shadow-xl px-6 py-10 w-full">
        <h2 className="flex justify-center items-center text-3xl font-bold mb-6">
          <Logo />
        </h2>

        <div className="text-center border mb-2 bg-gray-50 p-4 break-all text-sm rounded-md text-gray-500 leading-6">
          비밀번호 변경 후 사용 가능합니다.
          <br />
          Voice POP 계정의 <b>새 비밀번호를 설정</b>해 주세요.
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">User ID</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="input input-bordered w-full"
              value={user_id || ""}
              disabled
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">성명</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="input input-bordered w-full"
              value={user_name || ""}
              disabled
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">이메일</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="input input-bordered w-full"
              value={email || ""}
              disabled
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">새 비밀번호</span>
          </label>
          <Input
            type="password"
            name="password1"
            placeholder="새로운 비밀번호를 입력해주세요."
            className="input input-bordered w-full"
            value={formData.password1}
            validation={passwordRegex}
            errorMessage={errors.password1}
            handleError={handleError}
            onChange={handleInput}
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">새 비밀번호 확인</span>
          </label>
          <Input
            type="password"
            name="password2"
            placeholder="새로운 비밀번호를 확인해주세요."
            className="input input-bordered w-full"
            value={formData.password2}
            errorMessage={
              !isPasswordMatched ? "비밀번호가 일치하지 않습니다." : ""
            }
            handleError={handleError}
            onChange={handleInput}
          />
        </div>
        <div className="mt-6 flex gap-2">
          <button
            className="btn btn-neutral flex-1"
            onClick={() => navigate(URL_MAPPING.login)}
          >
            취소
          </button>
          <button
            className="btn btn-primary flex-1"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
