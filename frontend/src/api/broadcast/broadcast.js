import apiCall from "../../utils/axiosConfig";

/* 방송 마스터 등록 */
export const postBcMaster = (body) => {
  return apiCall.post(`/content/master`, body);
}
/* 방송 마스터 수정 */
export const putBcMaster = (id, body) => {
  return apiCall.put(`/content/master/${id}`, body);
}
/* 방송 마스터 조회 */
export const getBcMaster = (id) => {
  return apiCall.get(`/content/master/${id}`);
}
/* 방송 마스터 목록 조회 */
export const getBcMasterList = (params) => {
  return apiCall.get(`/content/master`, { params });
}

/* 방송 대상 점포 등록 */
export const postBcTargetStore = (body) => {
  return apiCall.post(`/content/store`, body);
}



/* 방송 음성파일 등록 */
export const postBcMedia = (body) => {
  return apiCall.post(`/media/`, body);
}
/* 방송 음성파일 수정 */
export const patchBcMedia = (id, body) => {
  return apiCall.patch(`/media/${id}`, body);
}
/* 방송 음성파일 조회 */
export const getBcMedia = (id) => {
  return apiCall.get(`/media/${id}`);
}
/* 방송 음성파일 다운로드 */
export const downloadBcMedia = (id) => {
  return apiCall.get(`/media/${id}/download`);
}

/* 방송 음성파일 방송에 매핑 */
export const postAudioMapping = (id, body) => {
  return apiCall.post(`/content/schedule/${id}`, body);
}
