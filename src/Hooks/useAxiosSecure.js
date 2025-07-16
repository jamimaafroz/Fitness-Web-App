import { useEffect, useMemo } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const useAxiosSecure = () => {
  const { logout } = useAuth();

  // Use useMemo to create axios instance only once
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:3000",
    });
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("fit-access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
