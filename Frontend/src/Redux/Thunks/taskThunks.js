import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// CREATE Task
export const createTask = createAsyncThunk("task/create", async (taskData) => {
  const toastId = toast.loading("Creating task...");
  try {
    // POST request to create a new task
    const res = await axiosInstance.post("/tasks", taskData);

    // Show success toast and return created task data
    toast.success(res?.data?.message || "Task created", { id: toastId });
    return res?.data?.data;
  } catch (err) {
    // Show error toast and throw error for rejected case
    toast.error(err?.response?.data?.message || "Failed to create task", {
      id: toastId,
    });
    throw err;
  }
});

// GET All Tasks
export const getAllTasks = createAsyncThunk(
  "task/getAll",
  async ({ page = 1, limit = 5 }) => {
    try {
      // GET request to fetch paginated tasks
      const res = await axiosInstance.get(`/tasks?page=${page}&limit=${limit}`);
      return res?.data;
    } catch (err) {
      throw err; // Error handled in the rejected reducer
    }
  }
);

// UPDATE Task
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, updateData }) => {
    const toastId = toast.loading("Updating task...");
    try {
      // PATCH request to update task by ID
      const res = await axiosInstance.patch(`/tasks/${id}`, updateData);

      // Show success toast and return updated task data
      toast.success(res?.data?.message || "Task updated", { id: toastId });
      return res?.data?.data;
    } catch (err) {
      // Show error toast and throw error
      toast.error(err?.response?.data?.message || "Failed to update task", {
        id: toastId,
      });
      throw err;
    }
  }
);

// DELETE Task
export const deleteTask = createAsyncThunk("task/delete", async (id) => {
  const toastId = toast.loading("Deleting task...");
  try {
    // DELETE request to remove task by ID
    await axiosInstance.delete(`/tasks/${id}`);

    // Show success toast and return deleted task ID
    toast.success("Task deleted", { id: toastId });
    return id;
  } catch (err) {
    // Show error toast and throw error
    toast.error(err?.response?.data?.message || "Failed to delete task", {
      id: toastId,
    });
    throw err;
  }
});
