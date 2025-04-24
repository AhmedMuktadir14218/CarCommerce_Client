import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <nav className="bg-gray-50 shadow-md h-[8vh] px-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <span className="font-bold text-xl text-gray-800">Car Store</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/all-products"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium relative ${
              isActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
            Cart
          </div>
        </NavLink>
      </div>

      {/* Auth Section */}
      <div className="flex items-center space-x-2">
        {token ? (
          <>
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span className="hidden md:inline">Account</span>
              </button>

              <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/manage-user"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Manage Users
                    </Link>
                    <Link
                      to="/manage-cars"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Manage Cars
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Manage Orders
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              ></path>
            </svg>
            <span>Sign In</span>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button - Shown only on small screens */}
      <button className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
