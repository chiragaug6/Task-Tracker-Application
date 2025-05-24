import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// CREATE Task
export const createTask = createAsyncThunk("task/create", async (taskData) => {
  try {
    toast.info("Creating task...");
    const res = await axiosInstance.post("/tasks", taskData);
    toast.success(res?.data?.message || "Task created successfully!");
    return res?.data?.data;
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to create task");
    throw err;
  }
});

// GET All Tasks
export const getAllTasks = createAsyncThunk(
  "task/getAll",
  async ({ page = 1, limit = 5 }) => {
    try {
      const res = await axiosInstance.get(`/tasks?page=${page}&limit=${limit}`);
      return res?.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch tasks");
      throw err;
    }
  }
);

// UPDATE Task
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, updateData }) => {
    try {
      toast.info("Updating task...");
      const res = await axiosInstance.patch(`/tasks/${id}`, updateData);
      toast.success(res?.data?.message || "Task updated successfully!");
      return res?.data?.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update task");
      throw err;
    }
  }
);

// DELETE Task
export const deleteTask = createAsyncThunk("task/delete", async (id) => {
  try {
    toast.info("Deleting task...");
    await axiosInstance.delete(`/tasks/${id}`);
    toast.success("Task deleted successfully!");
    return id;
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to delete task");
    throw err;
  }
});
