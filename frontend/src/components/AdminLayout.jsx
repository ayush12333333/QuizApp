import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header / Navbar */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/admin/quizzes" className="hover:text-yellow-300 transition">Quizzes</Link>
            <Link to="/admin/questions" className="hover:text-yellow-300 transition">Questions</Link>
            <Link to="/admin/results" className="hover:text-yellow-300 transition">Results</Link>
            <Link to="/admin/leaderboard" className="hover:text-yellow-300 transition">Leaderboard</Link>
            <Link to="/logout" className="hover:text-red-400 transition">Logout</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <nav className="md:hidden bg-purple-700 px-4 py-2 space-y-2">
            <Link to="/admin/quizzes" className="block hover:text-yellow-300 transition">Quizzes</Link>
            <Link to="/admin/questions" className="block hover:text-yellow-300 transition">Questions</Link>
            <Link to="/admin/results" className="block hover:text-yellow-300 transition">Results</Link>
            <Link to="/admin/leaderboard" className="block hover:text-yellow-300 transition">Leaderboard</Link>
            <Link to="/logout" className="block hover:text-red-400 transition">Logout</Link>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet /> {/* yahan admin ke alag-alag pages render honge */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; {new Date().getFullYear()} QuizMaster Admin Panel
      </footer>
    </div>
  );
}
