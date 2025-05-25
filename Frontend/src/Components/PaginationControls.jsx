import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../Redux/Slices/filterSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationControls = () => {
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.task);
  const { page } = useSelector((state) => state.filter);

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-2 mt-6 px-4">
      {page > 1 && (
        <button
          onClick={handlePrev}
          className="btn btn-sm btn-outline flex items-center gap-2"
        >
          <FaArrowLeft />
        </button>
      )}

      {[...Array(totalPages)].map((_, idx) => {
        const pageNum = idx + 1;
        return (
          <button
            key={pageNum}
            onClick={() => dispatch(setPage(pageNum))}
            className={`btn btn-sm ${
              pageNum === page ? "btn-primary" : "btn-outline"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {page < totalPages && (
        <button
          onClick={handleNext}
          className="btn btn-sm btn-outline flex items-center gap-2"
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default PaginationControls;
