import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div
      className={`h-screen bg-gray-50 ${
        collapsed ? "w-16" : "w-80"
      } p-3 shadow-lg border-r border-gray-200 flex flex-col transition-all duration-300`}
    >
      {/* Header with Toggle Button */}
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-200 text-gray-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {collapsed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* User Profile Card - Only shown when expanded */}
      {!collapsed && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg
                className="w-5 h-5 text-blue-600"
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
            </div>
            <div>
              <p className="font-medium text-gray-800 truncate max-w-xs">
                {user.email}
              </p>
              <p className="text-sm text-gray-500">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {user.role}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Label - Only shown when expanded */}
      {!collapsed && (
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Navigation
        </p>
      )}

      {/* Navigation Links */}
      <div className="flex-grow">
        {user.role === "user" && (
          <nav className="space-y-1">
            <Link
              to="/orders"
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "px-4"
              } py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md group transition-colors`}
              title="My Orders"
            >
              <svg
                className={`${
                  collapsed ? "" : "mr-3"
                } h-5 w-5 text-gray-400 group-hover:text-blue-500`}
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
              {!collapsed && "My Orders"}
            </Link>

            <Link
              to="/profile"
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "px-4"
              } py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md group transition-colors`}
              title="My Profile"
            >
              <svg
                className={`${
                  collapsed ? "" : "mr-3"
                } h-5 w-5 text-gray-400 group-hover:text-blue-500`}
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
              {!collapsed && "My Profile"}
            </Link>

            <Link
              to="/"
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "px-4"
              } py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md group transition-colors`}
              title="Security"
            >
              <svg
                className={`${
                  collapsed ? "" : "mr-3"
                } h-5 w-5 text-gray-400 group-hover:text-blue-500`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              {!collapsed && "Security"}
            </Link>
          </nav>
        )}

        {user.role === "admin" && (
          <nav className="space-y-1">
            <Link
              to="/manage-user"
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "px-4"
              } py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md group transition-colors`}
              title="Manage Users"
            >
              <svg
                className={`${
                  collapsed ? "" : "mr-3"
                } h-5 w-5 text-gray-400 group-hover:text-blue-500`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
              {!collapsed && "Manage Users"}
            </Link>

            <Link
              to="/add-cars"
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "px-4"
              } py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md group transition-colors`}
              title="Add New Car"
            >
              <svg
                className={`${
                  collapsed ? "" : "mr-3"
                } h-5 w-5 text-gray-400 group-hover:text-blue-500`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              {!collapsed && "Add New Car"}
            </Link>
            <Link
              to="/manage-cars"
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "px-4"
              } py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md group transition-colors`}
              title="Manage Cars"
            >
              <svg
                className={`${
                  collapsed ? "" : "mr-3"
                } h-5 w-5 text-gray-400 group-hover:text-blue-500`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              {!collapsed && "Manage Cars"}
            </Link>
            <Link
              to="/orders"
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "px-4"
              } py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md group transition-colors`}
              title="Manage Orders"
            >
              <svg
                className={`${
                  collapsed ? "" : "mr-3"
                } h-5 w-5 text-gray-400 group-hover:text-blue-500`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              {!collapsed && "Manage Orders"}
            </Link>
          </nav>
        )}
      </div>

      {/* Logout Section */}
      <div
        className={`border-t border-gray-200 pt-4 mt-6 flex ${
          collapsed ? "justify-center" : ""
        }`}
      >
        {collapsed ? (
          <button
            onClick={() =>
              document.querySelector('button[type="submit"]')?.click()
            }
            className="p-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-full"
            title="Logout"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        ) : (
          <LogoutButton className="w-full" />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
