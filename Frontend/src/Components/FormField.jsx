import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
}) => (
  <div>
    {/* Label for the input field */}
    <label htmlFor={name} className="label">
      <span className="label-text text-gray-300 font-semibold">{label}</span>
    </label>

    {/* Input field with dynamic classes for error styling */}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`input input-bordered input-primary w-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-500 focus:ring-2 ${
        error ? "input-error" : ""
      }`}
      aria-invalid={!!error} // Accessibility: indicates if the input has an error
      aria-describedby={`${name}-error`} // Links input to the error message
    />

    {/* Show error message if present */}
    {error && (
      <label
        id={`${name}-error`}
        className="label text-error font-medium"
        role="alert" // Accessibility: alerts screen readers about the error
      >
        {error}
      </label>
    )}
  </div>
);

export default FormField;
