import axios from "axios";
const {VITE_API_PREFIX} = import.meta.env; // api/v1

const apiCall = axios.create({
    baseURL: VITE_API_PREFIX,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 500000,
  });

  export default apiCall;