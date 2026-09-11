import axios from "axios";
import { useContext } from "react";
import { MyStore } from "../context/MyContext";

const useApi = () => {
  const { accessToken } = useContext(MyStore);

  const api = axios.create({
    baseURL: "  /api",

    // for sending refresh token in cookies!!
    withCredentials: true, 
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  return api;
};

export default useApi;
