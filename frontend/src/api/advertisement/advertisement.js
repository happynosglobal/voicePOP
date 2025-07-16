import apiCall from "../../utils/axiosConfig";

/* 광고타입 목록 조회 */
export const getAdTypeList = (params) => {
  return apiCall.get(`/code/ad`, { params });
}


/* 광고업체 목록 조회 */
export const getAdCompanayList = (params) => {
  return apiCall.get(`/ad/company`, { params });
}
/* 광고업체 조회 */
export const getAdCompanay = (id) => {
  return apiCall.get(`/ad/company/${id}`,);
}
/* 광고업체 등록 */
export const postAdCompany = (body) => {
  return apiCall.post("/ad/company", body);
}
/* 광고업체 수정 */
export const patchAdCompany = (id, body) => {
  return apiCall.patch(`/ad/company/${id}`, body);
}
/* 광고업체 삭제 */
export const deleteAdCompany = (id) => {
  return apiCall.delete(`/ad/company/${id}`);
}


/* 광고계약 목록 조회 */
export const getAdContractList = (params) => {
  return apiCall.get(`/ad/contract`, { params });
}
/* 광고계약 조회 */
export const getAdContract = (id) => {
  return apiCall.get(`/ad/contract/${id}`);
}
/* 광고계약 등록 */
export const postAdContract = (body) => {
  return apiCall.post(`/ad/contract`, body);
}
/* 광고계약 수정 */
export const patchAdContract = (id, body) => {
  return apiCall.patch(`/ad/contract/${id}`, body);
}
/* 광고계약 삭제 */
export const deleteAdContract = (id) => {
  return apiCall.delete(`/ad/contract/${id}`);
}
