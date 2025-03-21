import axios from "axios"
import apiCall from "../../utils/axiosConfig";

const { VITE_ERODY_ASSIST_API_HOST, VITE_ERODY_ASSIST_API_KEY } = import.meta.env;

/* 점포 목록 조회 */
export const getStoreCodes = async (params) => {
  const baseURL = VITE_ERODY_ASSIST_API_HOST + "/inf/store";
  return axios.get(baseURL, {
    params,
    headers: {
      "emquest_access_token": VITE_ERODY_ASSIST_API_KEY,
    },
  });
};

/* 점포 그룹 목록 조회 */
export const getGroupList = (params) => {
  return apiCall.get(`/store/group/name`, { params });
}
/* 점포 그룹 조회 */
export const getGroup = (id) => {
  return apiCall.get(`/store/group/name/${id}`);
}
/* 점포 그룹 등록 */
export const postGroup = (body) => {
  return apiCall.post(`/store/group/name`, body);
}
/* 점포 그룹 수정 */
export const patchGroup = (id, body) => {
  return apiCall.patch(`/store/group/name/${id}`, body);
}
/* 점포 그룹 삭제 */
export const deleteGroup = (id) => {
  return apiCall.delete(`/store/group/name/${id}`);
}


/* 점포 그룹 상세 목록 조회 */
export const getGroupDetailList = (id, params) => {
  return apiCall.get(`/store/group/name/${id}`, { params });
}
/* 점포 그룹 등록 */
export const postGroupDetail = (id, body) => {
  return apiCall.post(`/store/group/name/${id}`, body);
}
/* 점포 그룹 삭제 */
export const deleteGroupDetail = (id) => {
  return apiCall.delete(`/store/group/name/${id}`);
}