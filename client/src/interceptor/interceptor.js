import { useNavigate } from "react-router-dom";

const axios = require("axios");
const axiosApiInstance = axios.create();

console.log("interceptor");
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    console.log(sessionStorage.getItem("token"));
    config.url = '/api' + config.url;
    config.headers = {
      authorization: sessionStorage.getItem('token')
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;