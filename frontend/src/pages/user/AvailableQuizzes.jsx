// AvailableQuizzes.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import QuizStart from "./QuizStart";
import Leaderboard from "./Leaderboard";
import QuizExplanation from "./QuizExplanation";

const API_URL = "http://localhost:8081/user";

const AvailableQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(null);
  const [showExplanation, setShowExplanation] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quizzes + completed status
  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/my-quizzes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to fetch quizzes");
      const data = await res.json();

      const processed = data.map((quiz) => ({
        ...quiz,
        completed: quiz.completed === true || quiz.completed === "true",
      }));

      setQuizzes(processed);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleStartQuiz = (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    if (quiz.completed) {
      toast("You have already completed this quiz!");
      return;
    }

    setSelectedQuiz(quizId);
    setAnswers([]);
  };

  const handleSubmitQuiz = async (quizId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const res = await fetch(`${API_URL}-answers/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          quizId,
          answers: answers.map((a) => ({
            questionId: a.questionId,
            selectedAnswer: a.selectedOption,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit quiz");

      toast.success("Quiz submitted successfully");
      setSelectedQuiz(null);
      setAnswers([]);

      // Update quiz completed state locally
      setQuizzes((prev) =>
        prev.map((q) => (q.id === quizId ? { ...q, completed: true } : q))
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleViewExplanation = async (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz || !quiz.completed) {
      toast("You have not attempted this quiz yet");
      return;
    }

    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch(
        `${API_URL}-answers/explanation/${userId}/${quizId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch explanation");
      const data = await res.json();
      setShowExplanation({ quizId, explanation: data });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, selectedOption }];
    });
  };

  if (loading) return <p>Loading quizzes...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.length === 0 && <p>No quizzes available</p>}
      <ul className="space-y-2">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{quiz.title}</span>
            <div className="space-x-2">
              <button
                className={`px-2 py-1 rounded text-white ${
                  quiz.completed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 cursor-pointer"
                }`}
                onClick={() => handleStartQuiz(quiz.id)}
                disabled={quiz.completed}
              >
                Start
              </button>

              <button
                className={`px-2 py-1 rounded text-white ${
                  quiz.completed
                    ? "bg-purple-500 cursor-pointer"
                    : "bg-purple-200 cursor-not-allowed"
                }`}
                onClick={() => handleViewExplanation(quiz.id)}
                disabled={!quiz.completed}
              >
                View Explanation
              </button>

              <button
                className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
                onClick={() => setShowLeaderboard(quiz.id)}
              >
                Leaderboard
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedQuiz && (
        <QuizStart
          quizId={selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
          onFinish={() => handleSubmitQuiz(selectedQuiz)}
          onAnswerSelect={handleAnswerSelect}
          alreadyCompleted={
            quizzes.find((q) => q.id === selectedQuiz)?.completed
          }
        />
      )}

      {showLeaderboard && (
        <Leaderboard
          quizId={showLeaderboard}
          onClose={() => setShowLeaderboard(null)}
        />
      )}

      {showExplanation && (
        <QuizExplanation
          quizId={showExplanation.quizId}
          explanation={showExplanation.explanation}
          onClose={() => setShowExplanation(null)}
        />
      )}
    </div>
  );
};

export default AvailableQuizzes;
