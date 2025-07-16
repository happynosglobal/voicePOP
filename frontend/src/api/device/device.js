import apiCall from "../../utils/axiosConfig";
const { VITE_ERODY_ASSIST_API_KEY } = import.meta.env;

export const postSettingDevice = (body) => {
  return apiCall.post(`device/setting`, body, {
    headers: {
      emquest_access_token: VITE_ERODY_ASSIST_API_KEY,
    },
  });
};

/* 방송/장비 현황 조회 */
export const getDeviceStatus = (params) => {
  return apiCall.get(`/device`, { params });
};

/* 장비 관리 목록 조회 */
export const getDeviceList = (params) => {
  return apiCall.get(`/device-status`, { params });
};

/* 장비 관리 목록 정보 수정 */
export const postDeviceStatus = (body) => {
  return apiCall.post(`/device-status`, body);
};

/* 장비 가동율 조회 */
export const getDeviceStat = (params) => {
  return apiCall.get(`/daily-device-status`, { params });
};

