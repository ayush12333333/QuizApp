import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8081";

const QuizPage = ({ quizId, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${API_URL}/questions/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        toast.error("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizId]);

  // Handle answer selection
  const handleAnswerChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // Submit quiz
  const handleFinish = async () => {
    if (!window.confirm("Are you sure you want to submit?")) return;
    setSubmitting(true);
    try {
      const attempt = { answers }; // format as backend expects
      const res = await fetch(`${API_URL}/submit-quiz/${quizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(attempt),
      });
      if (!res.ok) throw new Error("Failed to submit quiz");
      const result = await res.json();
      toast.success(`Quiz submitted! Score: ${result.score}/${result.totalMarks}`);
      onFinish(result); // parent can close modal or redirect
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading quiz...</p>;

  return (
    <div className="p-4">
      {questions.map((q, idx) => (
        <div key={q.id} className="mb-4 border p-2 rounded">
          <p className="font-semibold">{idx + 1}. {q.questionText}</p>
          <div className="flex flex-col mt-2">
            {q.options.map((opt, i) => (
              <label key={i} className="mb-1">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleAnswerChange(q.id, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleFinish}
        disabled={submitting}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        {submitting ? "Submitting..." : "Finish"}
      </button>
    </div>
  );
};

export default QuizPage;
