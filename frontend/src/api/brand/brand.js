import apiCall from "../../utils/axiosConfig";

/* 브랜드 목록 조회 */
export const getBrandList = (params) => {
  return apiCall.get(`/code/brands`, { params });
}
