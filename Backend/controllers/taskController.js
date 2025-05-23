import mongoose from "mongoose";
import taskModel from "../models/taskModel.js";
import AppError from "../utils/error.js";
import { validateTaskData } from "../utils/validateAndSanitize.js";

const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return next(new AppError("Unauthorized: User not authenticated", 401));
    }

    // Fetch all tasks belonging to the user
    const tasks = await taskModel
      .find({ userId })
      .select("title status priority dueDate createdAt updatedAt");

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = validateTaskData(req.body);

    // Get user ID from auth middleware
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Create new task
    const task = await taskModel.create({ ...validatedData, userId });

    // Send clean and minimal response
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: {
        id: task._id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
      },
    });
  } catch (err) {
    next(err); // Pass to error handler middleware
  }
};

const updateTask = async (req, res, next) => {
  try {
    // Extract taskId from params and userId from auth middleware
    const { taskId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return next(new AppError("Unauthorized: User not authenticated", 401));
    }

    // Validate ObjectId format early to avoid unnecessary DB query
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return next(new AppError("Invalid Task ID", 400));
    }

    // Validate incoming update data with partial=true (all fields optional)
    const validatedData = validateTaskData(req.body, true);

    // Find the task by id and userId to ensure ownership
    const task = await taskModel.findOne({ _id: taskId, userId });
    if (!task) {
      return next(new AppError("Task not found or unauthorized", 404));
    }

    // Update allowed fields
    Object.assign(task, validatedData);

    // Save updated task
    await task.save();

    // Send minimal response with updated task info
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: {
        id: task._id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        updatedAt: task.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = req.userId;

    // Check if user is authenticated
    if (!userId) {
      return next(new AppError("Unauthorized: User not authenticated", 401));
    }

    // Validate taskId format early to avoid unnecessary DB queries
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return next(new AppError("Invalid Task ID", 400));
    }

    // Find task and verify ownership
    const task = await taskModel.findOne({ _id: taskId, userId }).select("_id");
    if (!task) {
      return next(new AppError("Task not found or unauthorized", 404));
    }

    // Find task by id and userId and delete in one query
    const deletedTask = await taskModel
      .findOneAndDelete({ _id: taskId, userId })
      .select("_id");

    if (!deletedTask) {
      return next(new AppError("Task not found or unauthorized", 404));
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: { id: deletedTask._id },
    });
  } catch (err) {
    next(err);
  }
};

export { getAllTasks, createTask, updateTask, deleteTask };
