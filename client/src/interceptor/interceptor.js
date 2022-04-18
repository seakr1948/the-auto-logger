import { useNavigate } from "react-router-dom";

const axios = require("axios");
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers["authorization"] = sessionStorage.getItem("token");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;