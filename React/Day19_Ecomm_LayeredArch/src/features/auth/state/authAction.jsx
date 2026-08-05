import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { toast } from "react-toastify";

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      let res = await api.post("/auth/login", credentials);
      toast.success("user logged in 🎉");
      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (error) {
      toast.error("Login failed❌");
      return thunkAPI.rejectWithValue("login failed");
    }
  },
);

export const hydrateUserAction = createAsyncThunk(
  "/auth/hydrate",
  async (_, thunkAPI) => {
    let token = localStorage.getItem("accessToken");

    try {
      let res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
        },
      });
      console.log("Hydration res", res);

      return res.data;
    } catch (error) {
        toast.error("UnAuthorized User")
      return thunkAPI.rejectWithValue("UnAuthorized User");
    }
  },
);
