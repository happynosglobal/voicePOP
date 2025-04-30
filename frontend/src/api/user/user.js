import axios from "axios";
import apiCall from "../../utils/axiosConfig";
const { VITE_API_BASE_URL, VITE_API_PREFIX } = import.meta.env;

/* 로그인 요청 */
export const postLogin = (body) => {
    return axios.post(`${VITE_API_PREFIX}/user/login`, body);
}
/* 사용자 조회 */
export const getUser = (id) => {
    return apiCall.get(`/user/${id}`)
}
/* 사용자 목록 조회 */
export const getUsers = (params) => {
    return apiCall.get(`/users`, { params })
}
/* 사용자별 브랜드 권한 조회  */
export const postUserBrand = (body) => {
    return apiCall.post(`/user/brand`, body)
}
/* 사용자 등록 */
export const postUser = (body) => {
    return apiCall.post(`/user`, body)
}
/* 사용자 수정 */
export const patchUser = (id, body) => {
    return apiCall.patch(`/user/${id}`, body)
}
/* 사용자 삭제 */
export const deleteUser = (id) => {
    return apiCall.delete(`/user/${id}`,)
}
/* 사용자 ID 중복 검사 */
export const checkUser = (body) => {
    return apiCall.post(`/user/check`, body)
}

/* 사용자 등록 신청 */
export const requestUser = (body) => {
    return apiCall.post(`/user/request`, body)
}

/* 사용자 암호 초기화 */
export const resetPassword = (body) => {
    return apiCall.post(`/user/reset-password`, body)
}

/* 사용자 암호 변경 */
export const changePassword = (body) => {
    return apiCall.post(`/user/change-password`, body)
}