import axios from "axios";
import { useContext } from "react";
import { MyStore } from "../context/MyContext";

const useApi = () => {
  const { accessToken, setAccessToken } = useContext(MyStore);

  const api = axios.create({
    baseURL: "http://localhost:5173/api",

    // for sending refresh token in cookies!!
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {   
      if (error.response && error.response.status === 401) {
        const res = await api.post("/auth/refresh");

        setAccessToken(res.data.accessToken);

        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return axios(error.config);
      }
      return Promise.reject(error);
    },
  );

  return api;
};

export default useApi;
