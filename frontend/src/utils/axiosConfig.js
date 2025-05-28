import axios from "axios";
import { useLoadingStore } from "../stores/loading";
import Cookies from "js-cookie"
import useUserStore from "../stores/user";

const { VITE_API_BASE_URL, VITE_API_PREFIX } = import.meta.env;
// const baseURL = import.meta.env.MODE === "development"
//     ? VITE_API_PREFIX
//     : VITE_API_BASE_URL;

const apiCall = axios.create({
  baseURL: VITE_API_PREFIX,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  timeout: 10000,
  withCredentials: true,
});

apiCall.interceptors.request.use(
  (config) => {
    useLoadingStore.getState().setLoading(true);

    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } return config;
  },
  (error) => {
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

apiCall.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    useLoadingStore.getState().setLoading(false);
    // if (error.response && error.response.status === 401) { // 토큰 인증실패시 로그인페이지로
    //   const { logout } = useUserStore.getState();
    //   logout();
    //   // window.location.href = "/login";
    //   setTimeout(() => {
    //     window.location.href = "/login";
    //   }, 500);
    // }
    return Promise.reject(error);
  }
);

export default apiCall;
