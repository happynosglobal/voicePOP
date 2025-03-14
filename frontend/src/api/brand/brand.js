import axios from "axios"

const { VITE_ERODY_ASSIST_API_HOST, VITE_ERODY_ASSIST_API_KEY } = import.meta.env;

/* 점포 목록 조회 */
export const getStoreCodes = async (params) => {
  const baseURL = VITE_ERODY_ASSIST_API_HOST+"/inf/store";
  return axios.get(baseURL, {
    params,
    headers: {
      "emquest_access_token": VITE_ERODY_ASSIST_API_KEY,
    },
  });
};
