import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance.js";

// Thunk for user registration
export const register = createAsyncThunk("/user/signup", async (data) => {
  const loadingMessage = toast.loading("Please wait! Creating your account...");
  try {
    // API call to register the user
    const res = await axiosInstance.post("/user/register", data);

    // Show success toast and return response data
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    // Show error toast and propagate error to Redux
    toast.error(error?.message, { id: loadingMessage });
    throw error;
  }
});

// Thunk for user login
export const login = createAsyncThunk("/user/login", async (data) => {
  const loadingMessage = toast.loading(
    "Please wait! authntication in Progress..."
  );
  try {
    // API call to log in the user
    const res = await axiosInstance.post("/user/login", data);

    // Show success toast and return response data
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    // Show error toast and propagate error
    toast.error(error?.message, { id: loadingMessage });
    throw error;
  }
});

// Thunk for user logout
export const logout = createAsyncThunk("/user/logout", async () => {
  const loadingMessage = toast.loading("Please wait! logout in Progress...");
  try {
    // API call to log out the user
    const res = await axiosInstance.get("/user/logout");

    // Show success toast and return response data
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    // Show error toast and propagate error
    toast.error(error?.message, { id: loadingMessage });
    throw error;
  }
});
