import { getAccessToken, setAccessToken } from "@/app/store/store";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  if (typeof window === "undefined") return config;

  const token = getAccessToken();
  const skipUrls = ["/api/auth/signin", "/api/auth/signup"];

  if (skipUrls.some(url => config.url?.includes(url))) {
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const isAuthPost =
      originalRequest.url?.includes("/api/auth/signin") ||
      originalRequest.url?.includes("/api/auth/signup") ||
      originalRequest.url?.includes("/api/auth/refresh");

    if (error.response?.status === 401 && !isAuthPost) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken =
          res.data?.data?.accessToken || res.data?.accessToken;
        const userObject = res.data?.data?.user || res.data?.user;

        if (!newAccessToken && !userObject) {
          throw new Error("No token or valid cookie session context returned.");
        }

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          setAccessToken(null);
        }

        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
