import React from "react";

const QuizExplanation = ({ quizId, explanation, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Quiz Explanation (ID: {quizId})</h2>

        {explanation && explanation.length > 0 ? (
          <ul className="space-y-3">
            {explanation.map((item) => (
              <li
                key={item.questionId}
                className={`p-3 border rounded ${
                  item.status === "Correct"
                    ? "bg-green-100 border-green-400"
                    : item.status === "Incorrect"
                    ? "bg-red-100 border-red-400"
                    : "bg-gray-100 border-gray-400"
                }`}
              >
                <p className="font-semibold">{item.questionText}</p>
                <p>Your Answer: {item.selectedAnswer || "Skipped"}</p> 
                <p>Correct Answer: {item.correctAnswer}</p>
                <p>Status: {item.status}</p>
                <p>Marks: {item.marksAwarded}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No explanation available</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuizExplanation;
