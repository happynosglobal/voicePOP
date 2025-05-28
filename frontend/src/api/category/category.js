import apiCall from "../../utils/axiosConfig"

/* 카테고리 목록 조회 */
export const getCategoryList = (params) => {
  return apiCall.get(`/code/categories`, { params });
}