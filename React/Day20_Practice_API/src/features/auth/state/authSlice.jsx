import { createSlice } from "@reduxjs/toolkit";
import { hydrateUserAction, loginUserAction } from "./authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = true;
    },
    removeUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(hydrateUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(hydrateUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(hydrateUserAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
