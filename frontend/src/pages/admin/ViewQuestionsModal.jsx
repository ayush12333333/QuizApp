import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8081/admin/quizzes";

const ViewQuestionsModal = ({ quizId, onClose }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${API_URL}/${quizId}/questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Questions</h2>
        {questions.length === 0 && <p>No questions found.</p>}
        <ul className="space-y-2">
          {questions.map((q) => (
            <li key={q.id} className="border p-2 rounded">
              <p>{q.questionText}</p>
              <p className="text-sm text-gray-500">Marks: {q.marks}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-3">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-400 rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionsModal;
