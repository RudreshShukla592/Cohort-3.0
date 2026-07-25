import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./feature/students/studentSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer
  },
});
