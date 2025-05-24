import axios from "axios";

const PRO_BASE_URL = "https://task-tracker-bgh4.onrender.com/api/v1";

const DEV_BASE_URL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: PRO_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
