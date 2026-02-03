import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://server-pi-mocha.vercel.app",
  withCredentials: true,
});

// Riyaz111!

const useAxiosSecure = () => {
  const { user, logoutUserFunc, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
    );

    const responsiveInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logoutUserFunc()
            .then(() => {
              console.log("Logout successfully");
            })
            .catch((err) => console.log(err));
          navigate("/login");
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responsiveInterceptor);
    };
  }, [user, loading, logoutUserFunc, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
