import { useEffect, useState } from "react";
import useUserStore from "../../stores/user";
import { useNavigate } from "react-router-dom";
import { loginSuccessResponse } from "./dummy/data";
import apiCall from "../../utils/axiosConfig";
import { deleteUser, postLogin, postUserBrand } from "../../api/user/user";
import useCodes from "../../stores/codes";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import Cookies from "js-cookie";
import Logo from "../../components/logo/Logo";
import Select from "react-select";
import { toast } from "react-toastify";
import useBrandCode from "../../hooks/useBrandCode";

const Login = () => {
  const { user, logout, setUser } = useUserStore.getState();
  const { fetchStores } = useCodes.getState();
  const { getBrandCodes } = useBrandCode();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    brand_code: "",
  });

  const [error, setError] = useState("");

  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && user) {
      navigate("/");
    }
  }, [user]);

  const handleGetBrandOptions = async () => {
    if (!formData.user_id) return;
    const response = await postUserBrand({ user_id: formData.user_id });
    const { status, data } = response;
    if (status === 200) {
      if (data.status_code === 200) {
        setBrandOptions(
          data.data.brand_code.map((option) => ({
            value: option,
            label: option,
          }))
        );
      } else {
        toast.error(data.message);
      }
    }
  };
  /* 로그인 폼 작성 검사 */
  const isFormfilled = () => {
    return (
      formData.user_id?.trim() &&
      formData.password?.trim() &&
      formData.brand_code?.trim()
    );
  };

  const handleLogin = async () => {
    if (!isFormfilled()) return;
    try {
      const response = await postLogin(formData);
      const { status_code, data } = response.data;
      if (status_code === 200) {
        setUser(data, formData.brand_code);
        getBrandCodes();
        fetchStores(formData.brand_code);
        Cookies.set("token", data.token);
        Cookies.set("refresh_token", data.refresh_token);
        navigate("/");
      } else if (status_code === 401) {
        setError(data.message);
      }
    } catch (err) {
      setError(err?.response.data.message || "");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="card max-w-md bg-white shadow-xl px-6 py-10 w-full">
          <h2 className="flex justify-center items-center text-3xl font-bold mb-6">
            <Logo />
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">User ID</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="아이디를 입력해주세요."
                className="input input-bordered w-full"
                onChange={(e) => {
                  const newUserId = e.target.value;

                  setFormData((prev) => ({
                    ...prev,
                    user_id: newUserId,
                    brand_code: "",
                  }));

                  setBrandOptions([]);
                }}
              />
              <button
                className="btn btn-sm btn-accent px-4"
                onClick={handleGetBrandOptions}
              >
                권한조회
              </button>
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-semibold">브랜드</span>
            </label>
            <Select
              options={brandOptions}
              className="min-w-56"
              isClearable
              placeholder="브랜드를 선택해주세요."
              value={
                brandOptions.find((opt) => opt.value === formData.brand_code) ||
                null
              }
              onChange={(selected) => {
                setFormData((prev) => ({
                  ...prev,
                  brand_code: selected?.value || "",
                }));
              }}
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
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            {error && <p className="mt-2 text-error text-sm">{error}</p>}
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={() => {
                handleLogin();
              }}
              disabled={!isFormfilled()}
            >
              로그인
            </button>
          </div>
          <div className="flex align-center justify-between mt-4 text-sm">
            <button
              onClick={() => navigate("/signup")}
              className="text-gray-500 hover:underline"
            >
              사용자 등록 신청
            </button>
            <button
              className="text-gray-500 hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Password 분실
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
