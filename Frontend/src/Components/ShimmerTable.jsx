import React from "react";

const ShimmerTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full rounded-2xl shadow-md bg-base-100 animate-pulse">
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="hover:bg-base-200 transition-all">
              <td>
                <div className="h-4 w-32 bg-base-300 rounded"></div>
              </td>
              <td>
                <div className="h-4 w-20 bg-base-300 rounded"></div>
              </td>
              <td>
                <div className="h-4 w-20 bg-base-300 rounded"></div>
              </td>
              <td>
                <div className="flex justify-center gap-2">
                  <div className="h-8 w-8 bg-base-300 rounded-full"></div>
                  <div className="h-8 w-8 bg-base-300 rounded-full"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShimmerTable;
