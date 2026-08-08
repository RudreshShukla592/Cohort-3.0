import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { toast } from "react-toastify";

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      let res = await api.post("/auth/login", credentials);
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("user logged in");
      return res.data;
    } catch (error) {
        toast.error("Login failed..")
      return thunkAPI.rejectWithValue("Login Failed");
    }
  },
);

export const hydrateUserAction = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    let token = localStorage.getItem("accessToken");

    try {
      let res = await api.get("auth/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Login Failed");
    }
  },
);
