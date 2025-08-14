import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">QuizMaster</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
          <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
          <Link to="/signup" className="hover:text-yellow-300 transition">Signup</Link>
        </div>

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
        <div className="md:hidden bg-purple-700 px-4 py-2 space-y-2">
          <Link to="/" className="block hover:text-yellow-300 transition">Home</Link>
          <Link to="/about" className="block hover:text-yellow-300 transition">About</Link>
          <Link to="/login" className="block hover:text-yellow-300 transition">Login</Link>
          <Link to="/signup" className="block hover:text-yellow-300 transition">Signup</Link>
        </div>
      )}
    </nav>
  );
}
