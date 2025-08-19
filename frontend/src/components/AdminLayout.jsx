import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <nav className="space-x-6">
          <NavLink to="/adminDashboard" end className={({ isActive }) => isActive ? "underline font-semibold" : ""}>
            Home
          </NavLink>
          <NavLink to="/adminDashboard/quizzes" className={({ isActive }) => isActive ? "underline font-semibold" : ""}>
            Quizzes
          </NavLink>
          <NavLink to="/adminDashboard/create" className={({ isActive }) => isActive ? "underline font-semibold" : ""}>
            Create
          </NavLink>
          <button onClick={handleLogout} className="ml-6 bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </nav>
      </header>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Render child route */}
      </main>

      <footer className="bg-gray-200 text-center p-4 mt-auto">
        &copy; 2025 QuizApp. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminLayout;
