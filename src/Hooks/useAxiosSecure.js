import { useEffect, useMemo } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const useAxiosSecure = () => {
  const { logout } = useAuth();

  // Create axios instance only once with env baseURL
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
      // Optionally add timeout, headers etc here if needed
    });
  }, []);

  useEffect(() => {
    // Request interceptor: attach token if available
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("fit-access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;

          // Optional debug log (comment out if noisy)
          // console.log("🔐 Axios: token attached");
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: logout on 401/403
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // Pro tip: you could debounce logout if needed
          logout();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
