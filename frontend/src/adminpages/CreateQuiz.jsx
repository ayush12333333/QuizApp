import React, { useState } from "react";

const CreateQuizForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "",
    timer: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = ["SCIENCE", "MATHS", "HISTORY", "TECHNOLOGY", "GENERAL"];
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.title || !formData.category || !formData.difficulty || !formData.timer) {
    setMessage("⚠️ Please fill all fields!");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const token = localStorage.getItem("token"); // login ke baad store kiya hua token lo

    const res = await fetch("http://localhost:8081/admin/quizzes", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // yahan token bhejo
      },
      body: JSON.stringify({
        title: formData.title,
        category: formData.category,
        difficulty: formData.difficulty,
        timer: parseInt(formData.timer),
      }),
    });

    if (res.ok) {
      setMessage("✅ Quiz created successfully!");
      setFormData({ title: "", category: "", difficulty: "", timer: "" });
    } else {
      const err = await res.json();
      setMessage(`❌ Error: ${err.message || "Failed to create quiz"}`);
    }
  } catch (error) {
    setMessage(`❌ Network error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Create New Quiz
        </h2>

        {/* Title */}
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter quiz title"
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Category */}
        <label className="block mb-2 font-semibold">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Difficulty */}
        <label className="block mb-2 font-semibold">Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">-- Select Difficulty --</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>

        {/* Timer */}
        <label className="block mb-2 font-semibold">Timer (in minutes)</label>
        <input
          type="number"
          name="timer"
          value={formData.timer}
          onChange={handleChange}
          placeholder="e.g., 10"
          min="1"
          className="w-full p-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Message */}
        {message && (
          <p className="mb-4 text-center font-semibold text-red-500">
            {message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition duration-200 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuizForm;
