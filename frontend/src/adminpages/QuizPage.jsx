import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { Link } from "react-router-dom";

const QuizPage = () => {
  const { quizzes, loading, deleteQuiz } = useContext(QuizContext);

  if (loading) {
    return <p className="text-center text-gray-500">Loading quizzes...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-600">
        📚 Available Quizzes
      </h1>

      {quizzes.length === 0 ? (
        <p className="text-gray-500 text-center">No quizzes available yet.</p>
      ) : (
        <ul className="space-y-4">
          {quizzes.map((q) => (
            <li
              key={q.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="mb-3 sm:mb-0">
                <span className="text-lg font-semibold text-gray-700 block sm:inline">
                  {q.title}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-2">
                <Link
                  to={`/admin/quizzes/${q.id}/questions`}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition w-full sm:w-auto text-center"
                >
                  ➕ Add Question
                </Link>
                <Link
                  to={`/admin/quizzes/${q.id}/update-question`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition w-full sm:w-auto text-center"
                >
                  ✏ Update Question
                </Link>
                <Link
                  to={`/admin/quizzes/${q.id}/results`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition w-full sm:w-auto text-center"
                >
                  📊 Results
                </Link>
                <Link
                  to={`/admin/quizzes/${q.id}/leaderboard`}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition w-full sm:w-auto text-center"
                >
                  🏆 Leaderboard
                </Link>
             
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizPage;
