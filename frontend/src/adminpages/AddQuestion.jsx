import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function CreateQuestionForm() {
  const { quizId } = useParams(); // URL se quizId mil gaya

  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 1,
    timerSeconds: 5,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8081/admin/quizzes/${quizId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to add question");

      const data = await response.json();
      console.log("Question added:", data);
      alert("Question added successfully!");

      // Reset form
      setFormData({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: 1,
        timerSeconds: 5,
      });
    } catch (error) {
      console.error(error);
      alert("Error adding question");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Question for Quiz #{quizId}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question Text */}
        <div>
          <label className="block font-medium mb-1">Question Text</label>
          <input
            type="text"
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter your question"
            required
          />
        </div>

        {/* Options */}
        <div>
          <label className="block font-medium mb-1">Options</label>
          {formData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 mb-2"
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>

        {/* Correct Answer */}
        <div>
          <label className="block font-medium mb-1">Correct Answer</label>
          <input
            type="text"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter correct answer"
            required
          />
        </div>

        {/* Marks */}
        <div>
          <label className="block font-medium mb-1">Marks</label>
          <input
            type="number"
            name="marks"
            min="1"
            value={formData.marks}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Timer */}
        <div>
          <label className="block font-medium mb-1">Timer (seconds)</label>
          <input
            type="number"
            name="timerSeconds"
            min="5"
            value={formData.timerSeconds}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Question
        </button>
      </form>
    </div>
  );
}
