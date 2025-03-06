import apiCall from "../../utils/axiosConfig";

/* 로그인 */
export const postLogin = (body) => {
    return apiCall.post("/user/login", body);
}