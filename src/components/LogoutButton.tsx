import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";

const LogoutButton = ({ className }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className={`${className} bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
