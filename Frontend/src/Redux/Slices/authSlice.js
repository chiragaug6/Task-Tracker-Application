import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../Thunks/authThunks.js";

// Initial auth state
const initialState = {
  isLoggedIn: false,
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
      })

      // On successful logout
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
