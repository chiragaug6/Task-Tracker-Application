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

  const handleEdit = (task) => dispatch(openModal({ editMode: true, task }));
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header with Add Task Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-base-content">
            Task Dashboard
          </h1>
          <button
            onClick={() => dispatch(openModal({ editMode: false }))}
            className="btn btn-primary shadow-md hover:shadow-lg transition-all"
          >
            + New Task
          </button>
        </div>

        {/* Conditional Rendering: Loading, Empty, or Tasks Table */}
        {loading ? (
          <ShimmerTable />
        ) : tasks?.length === 0 ? (
          <div className="text-center py-10">No tasks found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full rounded-2xl shadow-md bg-base-100">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-base-200 transition-all"
                  >
                    <td>{task.title}</td>
                    <td>
                      <Badge label={task.status} type="status" />
                    </td>
                    <td>
                      <Badge label={task.priority} type="priority" />
                    </td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleEdit(task)}
                        aria-label={`Edit task ${task.title}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => handleDelete(task._id)}
                        aria-label={`Delete task ${task.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-6">
          <PaginationControls
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>

        {/* Modal for Creating/Editing Task */}
        {modalOpen && <TaskModal />}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
