import apiCall from "../../utils/axiosConfig";

/* 광고업체 목록 조회 */
export const getAdCompanayList = (params) => {  
  return apiCall.get("/ad/company", {params});
}