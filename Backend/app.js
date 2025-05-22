import express from "express";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

// Route for user-related APIs
app.use("/api/v1/user", userRoutes);

// Global error-handling middleware
app.use(errorMiddleware);

export default app;
