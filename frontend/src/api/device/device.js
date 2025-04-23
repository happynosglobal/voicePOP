import apiCall from "../../utils/axiosConfig";
const { VITE_ERODY_ASSIST_API_KEY } = import.meta.env;

export const postSettingDevice = (body) => {
  return apiCall.post(`device/setting`, body, {
    headers: {
      emquest_access_token: VITE_ERODY_ASSIST_API_KEY,
    },
  });
};

/* 장비 관리 목록 조회 */
export const getDeviceList = (params) => {
  return apiCall.get(`/device-status`, { params });
};

/* 장비 가동율 조회 */
export const getDeviceStat = (params) => {
  return apiCall.get(`/daily-device-status`, { params });
};

