import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.js";
import taskSliceReducer from "./Slices/taskSlice.js";

// Configure the Redux store with all reducers
const store = configureStore({
  reducer: {
    auth: authSliceReducer, // Auth state (login/logout)
    task: taskSliceReducer, // Task-related state (CRUD operations)
  },
  devTools: true,
});

export default store;
