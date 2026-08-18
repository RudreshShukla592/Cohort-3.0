import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const loginAction = createAsyncThunk("auth/login",async(credentials,thunkAPI)=>{
    try {
        let res = axiosInstance.post("/auth/login",credentials)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

