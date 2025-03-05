import apiCall from "../../utils/axiosConfig";

const { VITE_API_PREFIX } = import.meta.env; // api/v1

/* 로그인 */
export const postLogin = (body) => {
    return apiCall.post("/user/login", body);
}