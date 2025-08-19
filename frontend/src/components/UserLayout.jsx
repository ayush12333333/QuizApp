import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UserLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <nav className="space-x-5">
        <NavLink
  to="/userDashboard" // Home
  className={({ isActive }) => isActive ? "underline font-semibold" : ""}
>
  Home
</NavLink>

<NavLink
  to="/userDashboard/quizzes" // Available Quizzes
  className={({ isActive }) => isActive ? "underline font-semibold" : ""}
>
  Quizzes
</NavLink>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 px-3 py-1 rounded text-white"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Yaha pe Home/Quizzes/Leaderboard/History render hoga */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        &copy; 2025 QuizApp. All rights reserved.
      </footer>
    </div>
  );
};

export default UserLayout;
