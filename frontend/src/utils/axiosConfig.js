import axios from "axios";

const {VITE_API_BASE_URL, VITE_API_PREFIX} = import.meta.env; // api/v1

const apiCall = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
  timeout: 10000,
});

export default apiCall;
