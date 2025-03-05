import { useEffect, useState } from "react";
import useUserStore from "../../stores/user";
import { useNavigate } from "react-router-dom";
import { userData } from "./dummy/data";
import apiCall from "../../utils/axiosConfig";
import { postLogin } from "../../api/user/user";

const Login = () => {
  const { logout, login, user, isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.dashboard_url);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    brand_code: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    login(userData); // api 연결 전까지 임시로 store에 userData 저장

    /* 추후 연동 예상 로그인 api */
    // try {
    //   const response = await postLogin(formData);
    //   const { status_code, data } = response.data;
    //   if (status_code === 200) {
    //     login(data); //Zustand store에 저장
    //     navigate(data.dashboard_url); // 응답데이터의 기본 url로 이동
    //   } else {
    //     setError("로그인 실패"); // 추후 로그인 실패 메시지 정해서 추가
    //   }
    // } catch (err) {
    //   setError("로그인 요청 중 오류가 발생했습니다.");
    // }
  };

  return (
    <>
      {!isLoading && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="card w-96 bg-white shadow-xl p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Vocie PoP</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">User ID</span>
              </label>
              <input
                type="text"
                placeholder="아이디를 입력해주세요."
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className="input input-bordered w-full"
              />
              <p className="mt-2 text-error text-sm">
                비밀번호가 일치하지 않습니다.
              </p>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary w-full"
                onClick={() => {
                  // handleLogin(); //잠시 주석하겠습니다.
                  navigate("/login/select"); // api연동 전 임시 라우팅
                }}
              >
                로그인
              </button>
            </div>
            <div className="flex align-center justify-between mt-4 text-sm">
              <a href="/signup" className="text-gray-500">
                사용자 등록 신청
              </a>
              <a href="#" className="text-gray-500">
                Password 분실
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
