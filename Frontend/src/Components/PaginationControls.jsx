import React from "react";

const PaginationControls = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    // Container for pagination buttons, centered and responsive
    <div className="flex justify-center flex-wrap gap-3 mt-6 px-4">
      {/* Create an array of length totalPages to map over for buttons */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1; // Calculate page number starting from 1
        const isActive = currentPage === pageNumber; // Check if this page is the current active page

        return (
          <button
            key={index} // Unique key for each button
            onClick={() => setCurrentPage(pageNumber)} // Set the current page when clicked
            className={`px-4 cursor-pointer py-2 rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm border
              ${
                isActive
                  ? // Styles for active (selected) page button
                    "bg-primary text-white border-primary dark:bg-blue-500 dark:border-blue-500"
                  : // Styles for inactive page buttons
                    "bg-base-100 text-base-content border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              }
              // Common hover and focus styles for accessibility and interaction feedback
              hover:bg-primary hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1`}
            aria-label={`Go to page ${pageNumber}`} // Accessibility label for screen readers
          >
            {pageNumber} {/* Display page number */}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationControls;
