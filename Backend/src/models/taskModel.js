import mongoose from "mongoose";
import validator from "validator";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      index: true, // Improves query performance
    },

    title: {
      type: String,
      required: [true, "Task title is required."],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long."],
      maxlength: [100, "Title must not exceed 100 characters."],
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(validator.blacklist(val, " "), "en-US", {
            ignore: " -_.,",
          }),
        message:
          "Title can only contain letters, numbers, spaces, and basic punctuation.",
      },
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description must not exceed 1000 characters."],
      validate: {
        // Allow blank or safe ASCII characters (e.g., prevents emoji/XSS)
        validator: (val) => !val || validator.isAscii(val),
        message: "Description contains invalid or non-ASCII characters.",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["Incomplete", "Completed"],
        message: "Status must be either 'Incomplete' or 'Completed'.",
      },
      default: "Incomplete",
    },

    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "Priority must be 'Low', 'Medium', or 'High'.",
      },
      default: "Medium",
    },

    dueDate: {
      type: Date,
      validate: {
        validator: (value) => !value || value > new Date(),
        message: "Due date must be in the future.",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
