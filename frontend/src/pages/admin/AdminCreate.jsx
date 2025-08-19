import React, { useState } from "react";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8081/admin/quizzes";

const AdminCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "",
    timer: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.difficulty) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.timer < 1) {
      toast.error("Timer must be at least 1 minute");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          difficulty: formData.difficulty,
          timer: formData.timer,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to create quiz");
      }

      const data = await res.json();
      toast.success("Quiz created successfully: " + data.title);
      // Reset form
      setFormData({ title: "", category: "", difficulty: "", timer: 1 });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="GENERAL">General</option>
            <option value="SCIENCE">Science</option>
            <option value="MATH">Math</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Timer (minutes)</label>
          <input
            type="number"
            name="timer"
            value={formData.timer}
            onChange={handleChange}
            min={1}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default AdminCreate;
