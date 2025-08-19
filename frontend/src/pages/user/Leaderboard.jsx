// Leaderboard.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8081/api/results"; 

const Leaderboard = ({ quizId, onClose }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/quiz/${quizId}/leaderboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [quizId]);

  if (loading) return <p className="text-center mt-4">Loading leaderboard...</p>;

  if (leaderboard.length === 0)
    return (
      <div className="text-center mt-4">
        <p>No one has attempted this quiz yet.</p>
        <button
          className="mt-2 px-3 py-1 bg-gray-400 rounded text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Leaderboard</h2>
        <table className="w-full table-auto border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Rank</th>
              <th className="border px-2 py-1">User</th>
              <th className="border px-2 py-1">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border px-2 py-1">{idx + 1}</td>
                <td className="border px-2 py-1">{entry.username}</td>
                <td className="border px-2 py-1">
                  {entry.score}/{entry.totalMarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <button
            className="px-3 py-1 bg-gray-400 rounded text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
