import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import QuizPage from "./adminpages/QuizPage";
import QuestionPage from "./adminpages/QuestionPage";
import ResultPage from "./adminpages/ResultPage";
import LeaderboardPage from "./adminpages/LeaderboardPage";
import Logout from "./adminpages/Logout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="quizzes" element={<QuizPage />} />
          <Route path="questions" element={<QuestionPage />} />
          <Route path="results" element={<ResultPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
        </Route>

        {/* Logout */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
