import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance.js";

// Thunk for user registration
export const register = createAsyncThunk("/user/signup", async (data) => {
  try {
    const res = await axiosInstance.post("/user/register", data);
    toast.success(res?.data?.message || "Account created successfully!");
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration failed!");
    throw error;
  }
});

// Thunk for user login
export const login = createAsyncThunk("/user/login", async (data) => {
  try {
    // toast.info("Please wait! Authentication in progress...");
    const res = await axiosInstance.post("/user/login", data);
    toast.success(res?.data?.message || "Login successful!");
    return res?.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error?.response?.data || "Login failed!"
    );
    throw error;
  }
});

// Thunk for user logout
export const logout = createAsyncThunk("/user/logout", async () => {
  try {
    const res = await axiosInstance.get("/user/logout");
    toast.success(res?.data?.message || "Logged out successfully!");
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Logout failed!");
    throw error;
  }
});
