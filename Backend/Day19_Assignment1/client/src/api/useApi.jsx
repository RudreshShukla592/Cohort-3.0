import axios from "axios";
import { useContext, useEffect, useMemo, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const useApi = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);

  // Always keep the latest token available to interceptors
  const accessTokenRef = useRef(accessToken);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  // Create Axios instance only once
  const api = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:3000/api",
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = accessTokenRef.current;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // RESPONSE INTERCEPTOR
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;

        // No config → nothing to retry
        if (!originalRequest) {
          return Promise.reject(error);
        }

        // Only refresh normal protected requests
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/auth/refresh")
        ) {
          originalRequest._retry = true;

          try {
            // Refresh token is automatically sent as HttpOnly cookie
            const response = await api.post("/auth/refresh");

            const newAccessToken = response.data.data.accessToken;

            // Update React state
            setAccessToken(newAccessToken);

            // Update the request that originally failed
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Retry ONLY once
            return api(originalRequest);
          } catch (refreshError) {
            // Refresh failed → don't retry again
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    // VERY IMPORTANT:
    // Remove interceptors when this hook is cleaned up
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [api, setAccessToken]);

  return api;
};

export default useApi;
