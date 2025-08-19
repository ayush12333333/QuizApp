import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center px-6 md:px-0 max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-800 drop-shadow-lg">
            Welcome to QuizApp!
          </h2>
          <p className="mb-8 text-xl md:text-2xl text-gray-700">
            Test your knowledge, take quizzes, and challenge yourself. 
            Improve your skills every day!
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 transition duration-300 transform hover:-translate-y-1"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Optional decorative shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300 rounded-full opacity-30 -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-300 rounded-full opacity-30 -z-10 animate-pulse"></div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
