import React from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationControls = ({ currentPage, setCurrentPage }) => {
  const { totalPages } = useSelector((state) => state.task);

  const handlePrevClick = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-2 mt-6 px-4">
      {/* Prev Button */}
      {currentPage > 1 && (
        <button
          onClick={handlePrevClick}
          className="btn btn-sm btn-outline flex items-center gap-2"
        >
          <FaArrowLeft /> Prev
        </button>
      )}

      {/* Page Number Buttons */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        const isActive = currentPage === pageNumber;

        return (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`btn btn-sm transition-all ${
              isActive ? "btn-primary" : "btn-outline"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          onClick={handleNextClick}
          className="btn btn-sm btn-outline flex items-center gap-2"
        >
          Next <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default PaginationControls;
