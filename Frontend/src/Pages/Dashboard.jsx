import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, deleteTask } from "../Redux/Thunks/taskThunks";
import { openModal } from "../Redux/Slices/taskSlice.js";

import TaskFilters from "../Components/TaskFilters";
import PaginationControls from "../Components/PaginationControls";
import Badge from "../Components/Badge";
import TaskModal from "../Components/TaskModal";
import ConfirmModal from "../Components/ConfirmModal";
import AppLayout from "../Layout/AppLayout";
import ShimmerTable from "../Components/ShimmerTable";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../CustomHooks/useDebounce.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { tasks, loading, modalOpen, totalPages } = useSelector(
    (state) => state.task
  );

  const filters = useSelector((state) => state.filter);
  const { page, limit, search, status, priority, sort } = filters;

  const debouncedSearch = useDebounce(search, 500);

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    dispatch(
      getAllTasks({
        page,
        limit,
        search: debouncedSearch,
        status,
        priority,
        sort,
      })
    );
  }, [dispatch, page, limit, debouncedSearch, status, priority, sort]);

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) dispatch(deleteTask(taskToDelete));
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  const handleEdit = (task) => dispatch(openModal({ editMode: true, task }));

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header: Filters + New Task Button */}
        <div className="flex flex-col gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-4 justify-between mb-6">
            {/* Filters + Reset */}
            <div className="flex-grow min-w-0">
              <TaskFilters />
            </div>

            {/* New Task Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => dispatch(openModal({ editMode: false }))}
                className="btn btn-primary rounded-xl whitespace-nowrap px-6 h-12"
              >
                + New Task
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <ShimmerTable />
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No tasks found.</div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-md">
            <table className="table w-full">
              <thead className="bg-base-200 text-base-content text-sm">
                <tr>
                  <th>Title</th>
                  <th>Creation Date</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Badge label={task.status} type="status" />
                    </td>
                    <td>
                      <Badge label={task.priority} type="priority" />
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="btn btn-sm btn-outline btn-primary"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <PaginationControls />
        </div>

        {/* Modals */}
        {modalOpen && <TaskModal />}
        {showConfirm && (
          <ConfirmModal
            message="Are you sure you want to delete this task?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
