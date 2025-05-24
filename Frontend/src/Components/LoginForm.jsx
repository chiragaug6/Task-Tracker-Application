import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Thunks/authThunks.js";
import { validateLoginForm } from "../utils/formValidators.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "Test@123",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update form data and clear errors for the field on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear any existing error messages for this field and global errors
    setErrors((prev) => ({ ...prev, [name]: "", global: "" }));
  };

  // Validate and submit the login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields using external validator function
    const validationErrors = validateLoginForm(formData);

    // If there are validation errors, set them in state and do not proceed
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const response = await dispatch(login(formData));
    setLoading(false);

    // If login successful, navigate user to home page
    if (response?.payload?.success) {
      navigate("/");
    } else {
      setErrors((prev) => ({
        ...prev,
        global: response?.payload?.message || "Invalid email or password",
      }));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Show global error message */}
      {errors.global && (
        <p className="text-error text-center font-medium" role="alert">
          {errors.global}
        </p>
      )}

      {/* Email input */}
      <div className="form-control w-full">
        <label htmlFor="email" className="label">
          <span className="label-text font-semibold">Email Address</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className={`input input-bordered w-full ${
            errors.email ? "input-error" : "input-primary"
          }`}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && (
          <span
            id="email-error"
            className="text-error mt-1 text-sm"
            role="alert"
          >
            {errors.email}
          </span>
        )}
      </div>

      {/* Password input with toggle */}
      <div className="form-control w-full relative">
        <label htmlFor="password" className="label">
          <span className="label-text font-semibold">Password</span>
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          className={`input input-bordered w-full pr-16 ${
            errors.password ? "input-error" : "input-primary"
          }`}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-sm text-primary"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {errors.password && (
          <span
            id="password-error"
            className="text-error mt-1 text-sm"
            role="alert"
          >
            {errors.password}
          </span>
        )}
      </div>

      {/* Submit button */}
      <div className="form-control mt-6">
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="btn btn-primary btn-block text-lg font-semibold hover:btn-secondary transition duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
