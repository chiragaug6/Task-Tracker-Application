import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Route for user-related APIs
app.use("/api/v1/user", userRoutes);

// Global error-handling middleware
app.use(errorMiddleware);

export default app;
