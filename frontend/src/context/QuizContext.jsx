import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; 
import BASE_URL from "../services/apiConfig";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const { token } = useContext(AuthContext); 
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Fetch all quizzes ---
  const fetchQuizzes = async () => {
    if (!token) return; // agar token nahi hai to call mat karo
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/quizzes`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 auto fetch when token changes
  useEffect(() => {
    fetchQuizzes();
  }, [token]);

  // --- Create new quiz ---
  const createQuiz = async (quiz) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(quiz)
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      await fetchQuizzes(); 
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  // --- Delete quiz ---
  const deleteQuiz = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/quizzes/${id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      await fetchQuizzes();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <QuizContext.Provider value={{ quizzes, loading, fetchQuizzes, createQuiz, deleteQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
