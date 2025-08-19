import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AddQuestionModal from "./AddQuestionModal";
import ViewQuestionsModal from "./ViewQuestionsModal";
import UpdateQuizModal from "./UpdateQuizModal"; // ✅ new import

const API_URL = "http://localhost:8081/admin/quizzes";

const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);  
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showViewQuestions, setShowViewQuestions] = useState(false);
  const [showUpdateQuiz, setShowUpdateQuiz] = useState(false); 

  // Fetch all quizzes
  const fetchQuizzes = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setQuizzes(data);
    } catch (err) {
      toast.error("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Delete quiz
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this quiz?")) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Quiz deleted");
      setQuizzes(quizzes.filter((q) => q.id !== id));
    } catch (err) {
      toast.error("Failed to delete quiz");
    }
  };

  if (loading) return <p>Loading quizzes...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Quizzes</h2>
      {quizzes.length === 0 && <p>No quizzes found.</p>}
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{quiz.title}</h3>
              <p className="text-sm text-gray-600">{quiz.description}</p>
            </div>
            <div className="space-x-2">
              <button
                className="px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => {
                  setSelectedQuizId(quiz.id);
                  setShowAddQuestion(true);
                }}
              >
                Add Question
              </button>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => {
                  setSelectedQuizId(quiz.id);
                  setShowViewQuestions(true);
                }}
              >
                Questions
              </button>
              <button
                className="px-2 py-1 bg-yellow-500 text-white rounded"
                onClick={() => {
                  setSelectedQuiz(quiz);
                  setShowUpdateQuiz(true);
                }}
              >
                Update
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(quiz.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {showAddQuestion && selectedQuizId && (
        <AddQuestionModal
          quizId={selectedQuizId}
          onClose={() => setShowAddQuestion(false)}
          onQuestionAdded={() => fetchQuizzes()}
        />
      )}

      {/* View Questions Modal */}
      {showViewQuestions && selectedQuizId && (
        <ViewQuestionsModal
          quizId={selectedQuizId}
          onClose={() => setShowViewQuestions(false)}
        />
      )}

      {/* Update Quiz Modal */}
      {showUpdateQuiz && selectedQuiz && (
        <UpdateQuizModal
          quiz={selectedQuiz}
          onClose={() => setShowUpdateQuiz(false)}
          onQuizUpdated={(updatedQuiz) => {
            setQuizzes(
              quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q))
            );
          }}
        />
      )}
    </div>
  );
};

export default AdminQuizzes;
