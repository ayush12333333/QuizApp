import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResultPage = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8081/api/results/quiz/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setResults(await res.json());
        } else {
          setMessage("❌ Failed to load results");
        }
      } catch (err) {
        setMessage("❌ Network error: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [quizId]);

  if (loading) return <p className="text-center mt-10">Loading results...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">📊 Results for Quiz #{quizId}</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}

      <table className="w-full border-collapse border border-gray-300 bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Username</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Total Marks</th>
            <th className="border p-2">Correct</th>
            <th className="border p-2">Wrong</th>
            <th className="border p-2">Skipped</th>
            <th className="border p-2">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">{r.username}</td>
              <td className="border p-2">{r.score}</td>
              <td className="border p-2">{r.totalMarks}</td>
              <td className="border p-2">{r.correctCount}</td>
              <td className="border p-2">{r.wrongCount}</td>
              <td className="border p-2">{r.skippedCount}</td>
              <td className="border p-2">{new Date(r.submittedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultPage;
