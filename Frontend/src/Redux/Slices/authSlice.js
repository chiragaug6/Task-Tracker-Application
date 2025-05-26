import { createSlice } from "@reduxjs/toolkit";
import { getMe, login, logout } from "../Thunks/authThunks.js";

// Initial auth state
const initialState = {
  isLoggedIn: false,
  LoggedInUser: null,
  loading: true,
};

// Auth slice handles login/logout logic
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // On successful login
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.LoggedInUser = action?.payload?.data || null;
      })

      // On successful logout
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.LoggedInUser = null;
      })

      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.LoggedInUser = action.payload.user;
        state.loading = false;
      })

      .addCase(getMe.rejected, (state) => {
        state.isLoggedIn = false;
        state.LoggedInUser = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
