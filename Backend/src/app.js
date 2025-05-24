// Import necessary modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import custom middleware and routes
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRouter.js";
import { corsOptions } from "./utils/constant.js";

// Initialize Express application
const app = express();

app.use(cors(corsOptions));

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Route for user-related APIs
app.use("/api/v1/user", userRoutes);

// Routes for task-related APIS
app.use("/api/v1/tasks", taskRoutes);

// Global error-handling middleware
app.use(errorMiddleware);

export default app;
