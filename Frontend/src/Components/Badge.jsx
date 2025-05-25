import React from "react";
// Helper to get badge class based on status
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Completed":
      return "badge-success";
    case "Incomplete":
      return "badge-error";
    default:
      return "badge-warning";
  }
};

// Helper to get badge class based on priority
const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case "High":
      return "badge-error";
    case "Medium":
      return "badge-warning";
    default:
      return "badge-info";
  }
};

// Reusable Badge component for status or priority
const Badge = ({ label, type }) => {
  const badgeClass =
    type === "status"
      ? getStatusBadgeClass(label)
      : getPriorityBadgeClass(label);

  return <span className={`badge badge-soft ${badgeClass}`}>{label}</span>;
};

export default Badge;
