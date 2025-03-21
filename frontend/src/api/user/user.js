import apiCall from "../../utils/axiosConfig";

/**
 * 로그인
 * @param user_id
 * @param password
 * @param brand_code
 * */
export const postLogin = (body) => {
    return apiCall.post("/user/login", body);
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