import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../Redux/Thunks/taskThunks.js";
import { closeModal } from "../Redux/Slices/taskSlice.js";
import { validateTaskForm } from "../utils/formValidators.js";

export default function TaskModal() {
  const dispatch = useDispatch();

  // Get modal state and current task info from Redux store
  const { modalOpen, editMode, currentTask } = useSelector(
    (state) => state.task
  );

  // Local form state for task details
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Incomplete",
    priority: "Medium",
    dueDate: null,
  });

  // State to hold validation error messages
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // When editMode or currentTask changes, set the form data accordingly
  useEffect(() => {
    if (editMode && currentTask) {
      // Populate form fields with current task data for editing
      setFormData({
        ...currentTask,
        dueDate: currentTask.dueDate
          ? new Date(currentTask.dueDate).toISOString().split("T")[0]
          : null,
      });
    } else {
      // Reset form fields for creating a new task
      setFormData({
        title: "",
        description: "",
        status: "Incomplete",
        priority: "Medium",
        dueDate: null,
      });
    }
  }, [editMode, currentTask]);

  // Handle input changes and clear any existing errors for the field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Save button handler - validate and dispatch appropriate action
  const handleSave = () => {
    const validationErrors = validateTaskForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear previous errors
    setIsLoading(true);

    if (editMode) {
      // Update existing task
      dispatch(updateTask({ id: currentTask._id, updateData: formData }));
    } else {
      // Create new task
      dispatch(createTask(formData));
    }
    setIsLoading(false);
  };

  // Don't render modal if not open
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-base-100 text-base-content rounded-2xl p-6 w-full max-w-md shadow-2xl transition-all duration-300 dark:bg-neutral dark:text-neutral-content">
        <h2 className="text-2xl font-bold mb-4">
          {editMode ? "Edit Task" : "Add New Task"}
        </h2>
        <div className="space-y-4">
          {/* Title input */}
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description textarea */}
          <div>
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-error text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Status and Priority selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="status"
              className="select select-bordered w-full"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              name="priority"
              className="select select-bordered w-full"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Due date input */}
          <div>
            <input
              type="date"
              name="dueDate"
              className="input input-bordered w-full"
              value={formData.dueDate}
              onChange={handleChange}
            />
            {errors.dueDate && (
              <p className="text-error text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="btn btn-outline hover:scale-105 transition"
            onClick={() => dispatch(closeModal())}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary hover:scale-105 transition"
            onClick={handleSave}
          >
            {isLoading
              ? editMode
                ? "Updating..."
                : "Creating..."
              : editMode
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
