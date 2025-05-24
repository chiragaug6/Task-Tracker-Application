import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Thunks/authThunks.js";

const Header = () => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  }

  return (
    <header className="bg-base-200 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between py-3">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-primary hover:text-primary-focus transition"
          >
            📝 Task Manager
          </Link>

          {/* Navigation Buttons */}
          <div className="mt-2 sm:mt-0 flex gap-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm btn-outline btn-primary hover:bg-primary hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm btn-primary text-white hover:bg-primary-focus transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-error text-white hover:bg-error-focus transition"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
