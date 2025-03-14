import apiCall from "../../utils/axiosConfig";

/* 로그인 */
export const postLogin = (body) => {
    return apiCall.post("/user/login", body);
}

/* 사용자 조회 */
export const getUser = (id) => {
    return apiCall.get(`/user/${id}`)
}