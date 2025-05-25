import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../Thunks/taskThunks.js";

// Initial state for the task slice
const initialState = {
  tasks: [], // All tasks data
  totalPages: 1, // Pagination: total pages

  loading: false, // Loading state for async actions
  error: null, // To store any errors

  // Modal controls for add/edit task UI
  modalOpen: false,
  currentTask: null,
  editMode: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Open modal and optionally pass edit mode & task data
    openModal: (state, action) => {
      state.modalOpen = true;
      state.editMode = action.payload?.editMode || false;
      state.currentTask = action.payload?.task || null;
    },
    // Close modal and reset modal-related state
    closeModal: (state) => {
      state.modalOpen = false;
      state.editMode = false;
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all tasks
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch tasks";
      })

      // Create a new task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.modelError = null;

        // Close modal after task is added
        state.modalOpen = false;
        state.editMode = false;
        state.currentTask = null;
      })

      // Update an existing task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }

        // Close modal after update
        state.modalOpen = false;
        state.editMode = false;
        state.currentTask = null;
      })

      // Delete a task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const { openModal, closeModal } = taskSlice.actions;
export default taskSlice.reducer;
