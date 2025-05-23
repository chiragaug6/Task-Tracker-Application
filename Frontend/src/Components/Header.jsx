import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">📝 Task Manager</h1>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
