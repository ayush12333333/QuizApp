import React, { useState } from "react";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8081/admin/quizzes";

const UpdateQuizModal = ({ quiz, onClose, onQuizUpdated }) => {
  const [title, setTitle] = useState(quiz.title);
  const [category, setCategory] = useState(quiz.category);
  const [difficulty, setDifficulty] = useState(quiz.difficulty);
  const [timer, setTimer] = useState(quiz.timer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${quiz.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, category, difficulty, timer }),
      });
      if (!res.ok) throw new Error("Failed to update quiz");
      const data = await res.json();
      toast.success("Quiz updated!");
      onQuizUpdated(data);
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Update Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="SCIENCE">Science</option>
            <option value="MATH">Math</option>
            <option value="TECH">Tech</option>
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
          <input
            type="number"
            placeholder="Timer (minutes)"
            value={timer}
            min={1}
            onChange={(e) => setTimer(parseInt(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-400 rounded text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-yellow-500 rounded text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuizModal;
