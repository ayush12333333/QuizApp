import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8081/user";

const QuizStart = ({ quizId, onClose, onFinish, alreadyCompleted }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(alreadyCompleted || false);

  // Update completed state if prop changes
  useEffect(() => {
    setCompleted(alreadyCompleted);
  }, [alreadyCompleted]);

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${API_URL}/questions/${quizId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setQuestions(data);

        if (!completed && data.length > 0) {
          setTimer(data.length * 60); // normal timer for new quiz
        }
      } catch (err) {
        toast.error("Failed to fetch questions");
      }
    };
    fetchQuiz();
  }, [quizId, completed]);

  // Timer countdown
  useEffect(() => {
    if (completed || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, completed]);

  const handleOptionSelect = (option) => {
    if (completed) return; // prevent changes in completed quiz
    setSelectedOptions({ ...selectedOptions, [currentQIndex]: option });
  };

  const handleNextOrFinish = async () => {
    if (completed) return; // cannot submit again
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      if (submitting) return;
      setSubmitting(true);

      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User not logged in");

        const userAnswers = Object.entries(selectedOptions).map(
          ([index, selectedOption]) => ({
            questionId: questions[index].id,
            selectedAnswer: selectedOption,
          })
        );

        const res = await fetch("http://localhost:8081/user-answers/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            quizId: quizId,
            answers: userAnswers,
          }),
        });

        if (!res.ok) throw new Error("Failed to submit quiz");

        toast.success("Quiz submitted successfully");
        setCompleted(true);
        if (onFinish) onFinish(quizId);
        onClose();
      } catch (err) {
        toast.error(err.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  const question = questions[currentQIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-2">
          {completed ? "Quiz (Completed)" : "Quiz Started"}
        </h2>
        {!completed && <p>Time left: {timer}s</p>}

        <div className="mt-4">
          <p className="font-semibold">{question.questionText}</p>
          <div className="space-y-2 mt-2">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className={`w-full p-2 border rounded ${
                  selectedOptions[currentQIndex] === opt
                    ? "bg-blue-500 text-white"
                    : ""
                } ${completed ? "cursor-not-allowed opacity-60" : ""}`}
                onClick={() => handleOptionSelect(opt)}
                disabled={completed}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="px-3 py-1 bg-gray-400 rounded text-white"
            onClick={onClose}
          >
            Quit
          </button>

          {!completed && (
            <button
              className="px-3 py-1 bg-green-500 rounded text-white"
              onClick={handleNextOrFinish}
            >
              {currentQIndex < questions.length - 1
                ? "Next"
                : submitting
                ? "Submitting..."
                : "Finish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
