import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <AppLayout>
      <div className="mt-16 flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-800 shadow-xl rounded-lg p-8 sm:p-10">
          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-center text-primary mb-8 tracking-wide">
            Welcome Back
          </h2>
          {/* Login form component */}
          <LoginForm />
          {/* Link to register page for new users */}
          <p className="mt-6 text-center text-base-content">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
