import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import QuizPage from "./adminpages/QuizPage";
import AddQuestion from "./adminpages/AddQuestion";
import ResultPage from "./adminpages/ResultPage";
import LeaderboardPage from "./adminpages/LeaderboardPage";
import Logout from "./adminpages/Logout";
import CreateQuiz from "./adminpages/CreateQuiz";
import UpdateQuestions from "./adminpages/UpdateQuestions";


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
          
         <Route path="create-quiz" element={<CreateQuiz />} />
        <Route path="/admin/quizzes/:quizId/questions" element={<AddQuestion />} />
          <Route path="results" element={<ResultPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="/admin/quizzes/:quizId/update-question" element={<UpdateQuestions/>}></Route>
          <Route path="/admin/quizzes/:quizId/results" element={<ResultPage />} />
          <Route path="/admin/quizzes/:quizId/leaderboard" element={<LeaderboardPage />} />
        </Route>

        {/* Logout */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
