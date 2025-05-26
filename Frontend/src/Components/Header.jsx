import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Thunks/authThunks.js";
import ConfirmModal from "./ConfirmModal.jsx";

const Header = () => {
  const { isLoggedIn, LoggedInUser } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmLogout = async () => {
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  };

  return (
    <header className="bg-base-200 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between py-3">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-primary hover:text-primary-focus transition"
          >
            📝 Task Tracker
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-6">
            {isLoggedIn && (
              <h2 className="text-base font-medium text-gray-500">
                Hello,{" "}
                <span className="font-semibold">{LoggedInUser?.name}</span>
              </h2>
            )}

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
                onClick={() => setShowConfirm(true)}
                className="btn btn-sm btn-error text-white hover:bg-error-focus transition"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to Logout?"
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </header>
  );
};

export default Header;
