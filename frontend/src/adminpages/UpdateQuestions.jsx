import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateQuestions = () => {
  const { quizId } = useParams(); // quizId will come from route like /admin/quizzes/1/questions
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8081/admin/quizzes/${quizId}/questions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setQuestions(data);
        } else {
          setMessage("❌ Failed to load questions");
        }
      } catch (err) {
        setMessage("❌ Network error: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleUpdate = async (questionId, updatedQuestion) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8081/admin/quizzes/${quizId}/questions/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedQuestion),
        }
      );

      if (res.ok) {
        setMessage("✅ Question updated successfully!");
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.message}`);
      }
    } catch (err) {
      setMessage("❌ Network error: " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Update Questions for Quiz #{quizId}
      </h2>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      {questions.map((q, index) => (
        <div
          key={q.id}
          className="border p-4 rounded-lg mb-4 bg-white shadow"
        >
          <label className="block font-semibold mb-1">Question</label>
          <input
            type="text"
            value={q.questionText}
            onChange={(e) =>
              handleChange(index, "questionText", e.target.value)
            }
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block font-semibold mb-1">Options</label>
          {q.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={(e) => {
                const updated = [...q.options];
                updated[i] = e.target.value;
                handleChange(index, "options", updated);
              }}
              className="w-full p-2 border rounded mb-1"
            />
          ))}

          <label className="block font-semibold mb-1">Correct Answer</label>
          <input
            type="text"
            value={q.correctAnswer}
            onChange={(e) =>
              handleChange(index, "correctAnswer", e.target.value)
            }
            className="w-full p-2 border rounded mb-2"
          />

          <button
            onClick={() => handleUpdate(q.id, q)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpdateQuestions;
