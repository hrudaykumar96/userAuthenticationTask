import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { logoutUser } from "../services/userServices";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const logout = async () => {
    const response = await logoutUser();
    if (response) {
      if (response?.success) {
        navigate("/login");
        sessionStorage.removeItem("user");
        toast.success("User logged out successfully");
        window.location.reload();
      } else if (response.error) {
        toast.error(response.error);
      }
    } else {
      toast.error("Please try again later");
    }
  };
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
            A
          </div>
          <span className="font-semibold text-xl text-gray-800">Acme</span>
        </NavLink>

        {location.pathname === "/profile" ? (
          <NavLink
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            <FaSignInAlt />
            Logout
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            <FaSignInAlt />
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}
