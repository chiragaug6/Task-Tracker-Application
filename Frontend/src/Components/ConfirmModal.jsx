import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 dark:bg-neutral text-base-content dark:text-neutral-content shadow-2xl rounded-2xl p-6 w-[90%] max-w-md transition-all duration-300 animate-fade-in-up">
        <h2 className="text-xl font-bold mb-4 text-center">
          🧐 Confirm Deletion
        </h2>
        <p className="text-center mb-6 text-sm md:text-base">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="btn btn-outline btn-sm sm:btn-md rounded-full hover:scale-105 transition-all duration-200"
            onClick={onCancel}
          >
            ❌ No
          </button>
          <button
            className="btn btn-error btn-sm sm:btn-md rounded-full text-white hover:scale-105 transition-all duration-200"
            onClick={onConfirm}
          >
            ✅ Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
