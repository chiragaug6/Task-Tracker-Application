import axios from "axios";

const PRO_BASE_URL = "https://devskillz.onrender.com/api/v1";

const DEV_BASE_URL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: DEV_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
