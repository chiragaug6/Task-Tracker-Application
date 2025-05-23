import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const route = Router();

route.get("/", isLoggedIn, getAllTasks);
route.post("/", isLoggedIn, createTask);
route.patch("/:taskId", isLoggedIn, updateTask);
route.delete("/:taskId", isLoggedIn, deleteTask);

export default route;
