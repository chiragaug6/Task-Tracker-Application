import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../Redux/Thunks/authThunks";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../utils/formValidators.js";
import FormField from "../Components/FormField";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Error state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true); 

    const response = await dispatch(register(formData));

    setIsSubmitting(false);

    if (response?.payload?.success) {
      navigate("/");
    }

    // Reset form
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-xl shadow-xl max-w-md w-full text-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-400 tracking-wide">
          Create Your Account
        </h2>
        <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            error={errors.email}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            error={errors.password}
          />

          <button
            type="submit"
            className="btn btn-primary w-full text-lg font-semibold hover:btn-secondary transition duration-300"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
