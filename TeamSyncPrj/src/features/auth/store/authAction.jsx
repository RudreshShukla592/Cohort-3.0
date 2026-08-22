import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      let res = await axiosInstance.post("/auth/login", credentials);
      console.log(res.data.data);
      
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("some error ocuured in api" + error); 
    }
  },
);