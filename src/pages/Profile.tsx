import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
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
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            Authentication Required
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            You need to be logged in to view your profile.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white text-blue-600 text-2xl font-bold border-4 border-white">
              {user.email[0].toUpperCase()}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <p className="text-blue-100">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="divide-y divide-gray-200">
            <div className="py-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Account Information
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Email
                  </span>
                  <span className="font-medium text-gray-900">
                    {user.email}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Role
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Account Status
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="py-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Account Management
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/change-password")}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                  Change Password
                </button>

                <button
                  onClick={() => navigate("/update-profile")}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <svg
                    className="mr-2 h-4 w-4"
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
                  Update Profile
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-40 flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg
                className="mr-2 h-4 w-4"
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
                ></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
