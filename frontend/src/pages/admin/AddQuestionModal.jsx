import React, { useState } from "react";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8081/admin/quizzes";

const AddQuestionModal = ({ quizId, onClose, onQuestionAdded }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [marks, setMarks] = useState(1);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${quizId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          questionText,
          options,
          correctAnswer,
          marks,
        }),
      });
      if (!res.ok) throw new Error("Failed to add question");
      const data = await res.json();
      toast.success("Question added!");
      onQuestionAdded(data);
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Add Question
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Question text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          ))}
          <input
            type="text"
            placeholder="Correct answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="number"
            placeholder="Marks"
            value={marks}
            min={1}
            onChange={(e) => setMarks(parseInt(e.target.value))}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded-md text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionModal;
