import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, deleteTask } from "../Redux/Thunks/taskThunks.js";
import { Pencil, Trash2 } from "lucide-react";
import TaskModal from "../Components/TaskModal.jsx";
import AppLayout from "../Layout/AppLayout.jsx";
import PaginationControls from "../Components/PaginationControls.jsx";
import { useNavigate } from "react-router-dom";
import { openModal } from "../Redux/Slices/taskSlice.js";
import Badge from "../Components/Badge.jsx";
import ShimmerTable from "../Components/ShimmerTable.jsx";
import ConfirmModal from "../Components/ConfirmModal.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, loading, modalOpen, totalPages } = useSelector(
    (state) => state.task
  );
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const [page, setPage] = useState(1);

  // useEffect checks auth and fetches tasks
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); // redirect if not logged in
      return;
    }
    dispatch(getAllTasks({ page, limit: 5 }));
  }, [isLoggedIn, page]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      dispatch(deleteTask(taskToDelete));
      handleCancelDelete();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const handleEdit = (task) => dispatch(openModal({ editMode: true, task }));

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-primary-content">
            Task Dashboard
          </h1>
          <button
            onClick={() => dispatch(openModal({ editMode: false }))}
            className="btn btn-primary rounded-xl px-6 py-2 shadow-md hover:shadow-lg transition-all"
          >
            + New Task
          </button>
        </div>

        {/* Table or Loader */}
        {loading ? (
          <ShimmerTable />
        ) : tasks?.length === 0 ? (
          <div className="text-center text-lg py-10 text-gray-500">
            No tasks found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-md">
            <table className="table w-full ">
              <thead className="bg-base-200 text-base-content text-sm">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-base-200 transition-all duration-200"
                  >
                    <td className="px-4 py-3">{task.title}</td>
                    <td className="px-4 py-3">
                      <Badge label={task.status} type="status" />
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={task.priority} type="priority" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="btn btn-sm btn-outline btn-primary rounded-lg"
                          onClick={() => handleEdit(task)}
                          aria-label={`Edit task ${task.title}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-error text-white rounded-lg"
                          onClick={() => handleDelete(task._id)}
                          aria-label={`Delete task ${task.title}`}
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
          <PaginationControls
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>

        {/* Modals */}
        {modalOpen && <TaskModal />}
        {showConfirm && (
          <ConfirmModal
            message="Are you sure you want to delete this task?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
