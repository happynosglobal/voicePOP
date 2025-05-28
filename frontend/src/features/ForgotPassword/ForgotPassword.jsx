import { useState } from "react";
import Logo from "../../components/logo/Logo";
import { URL_MAPPING } from "../../utils/constant/urls";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/user/user";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    email: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const body = formData;
    try {
      const response = await resetPassword(body);
      const { status, data } = response;
      if (status === 200 && data.status_code === 200) {
        toast.success(data.message);
        navigate(URL_MAPPING.login);
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error("입력하신 정보를 다시 확인해주세요.");
      } else {
        toast.error("비밀번호 초기화에 실패했습니다. 관리자에게 문의하세요");
      }
      console.error(err);
    }
  };

  const isFormValid = () => {
    return !!(formData.user_id && formData.name && formData.email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card max-w-md bg-white shadow-xl px-6 py-10 w-full">
        <h2 className="flex justify-center items-center text-3xl font-bold mb-6">
          <Logo />
        </h2>

        <div className="text-center border mb-4 bg-gray-50 p-4 break-all text-sm rounded-md text-gray-500 leading-6">
          비밀번호를 잊으셨나요?
          <br />
          등록하신 <b>이메일 주소</b>로 임시 비밀번호를 발송해드립니다.
          <br />
          이메일을 확인하신 후, 로그인해 주세요.
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">User ID</span>
          </label>
          <div className="flex gap-2">
            <input
              name="user_id"
              type="text"
              placeholder="아이디를 입력해주세요."
              className="input input-bordered w-full"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">성명</span>
          </label>
          <div className="flex gap-2">
            <input
              name="name"
              type="text"
              placeholder="이름 입력해주세요."
              className="input input-bordered w-full"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">이메일</span>
          </label>
          <div className="flex gap-2">
            <input
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              className="input input-bordered w-full"
              onChange={handleInput}
            />
          </div>
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
            임시 비밀번호 발송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
