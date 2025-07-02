import axios from "axios";
import { useLoadingStore } from "../stores/loading";
import useUserStore from "../stores/user";
import { toast } from "react-toastify";
import { getAccessToken, getNewAccessToken } from "../hooks/useAuth";
import useCodes from "../stores/codes";

const { VITE_API_BASE_URL, VITE_API_PREFIX } = import.meta.env;
const baseURL =
  import.meta.env.MODE === "development" ? VITE_API_PREFIX : VITE_API_BASE_URL;

const apiCall = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 10초
  withCredentials: true,
});

apiCall.interceptors.request.use(
  (config) => {
    useLoadingStore.getState().setLoading(true);

    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

apiCall.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().setLoading(false);
    return response;
  },
  async (error) => {
    useLoadingStore.getState().setLoading(false);
    const originalRequest = error.config;
    const { status, response } = error;

    if (
      status === 401 &&
      response?.status === 401 &&
      response?.data?.error === "Invalid or expired token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // 이미 토큰 재발급 중이면 큐에 요청을 저장하고 기다림
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiCall(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        await getNewAccessToken(apiCall);
        const newToken = getAccessToken();

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiCall(originalRequest);
      } catch (err) {
        processQueue(err, null);

        toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
        const { resetStores } = useCodes.getState();
        const { logout } = useUserStore.getState();
        logout();
        resetStores();

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiCall;
