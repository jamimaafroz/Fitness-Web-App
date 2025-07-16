import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// 🔐 Automatically attach token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fit-access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
