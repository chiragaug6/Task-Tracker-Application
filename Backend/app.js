import express from "express";

const app = express();

// Route for user-related APIs
app.use("/api/v1/user", userRoutes);

export default app;
