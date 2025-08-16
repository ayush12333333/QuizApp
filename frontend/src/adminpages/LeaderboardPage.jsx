import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const LeaderboardPage = () => {
  const { quizId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // assuming you stored JWT at login

    fetch(`http://localhost:8081/api/results/quiz/${quizId}/leaderboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => setLeaderboard(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Leaderboard</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 sm:px-4 py-2">Username</th>
              <th className="border px-2 sm:px-4 py-2">Score</th>
              <th className="border px-2 sm:px-4 py-2">Total Marks</th>
              <th className="border px-2 sm:px-4 py-2">Correct</th>
              <th className="border px-2 sm:px-4 py-2">Wrong</th>
              <th className="border px-2 sm:px-4 py-2">Skipped</th>
              <th className="border px-2 sm:px-4 py-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-2 sm:px-4 py-2">{entry.username}</td>
                <td className="border px-2 sm:px-4 py-2">{entry.score}</td>
                <td className="border px-2 sm:px-4 py-2">{entry.totalMarks}</td>
                <td className="border px-2 sm:px-4 py-2">{entry.correctCount}</td>
                <td className="border px-2 sm:px-4 py-2">{entry.wrongCount}</td>
                <td className="border px-2 sm:px-4 py-2">{entry.skippedCount}</td>
                <td className="border px-2 sm:px-4 py-2 whitespace-nowrap">
                  {new Date(entry.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
