import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
// Pages
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";




import AdminLayout from "./components/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminCreate from "./pages/admin/AdminCreate";
import UserLayout from "./components/UserLayout";
import UserHome from "./pages/user/UserHome";
import Leaderboard from "./pages/user/Leaderboard";
import AvailableQuizzes from "./pages/user/AvailableQuizzes";


function App() {
  const { role } = useContext(UserContext); //  read role from context

  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!role || role !== allowedRole) return <Navigate to="/login" replace />;
    return children;
  };

  return (
   
    <Router>
      
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
       <Route
  path="/adminDashboard/*"
  element={
    <ProtectedRoute allowedRole="ADMIN">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminHome />} />
  <Route path="quizzes" element={<AdminQuizzes />} />
   <Route path="create" element={<AdminCreate />} />
</Route>
        <Route
          path="/userDashboard/*"
          element={
            <ProtectedRoute allowedRole="USER">
              <UserLayout />
            </ProtectedRoute>
          }
        >

        {/* Catch-all */}
        <Route index element={<UserHome />} />
  <Route path="quizzes" element={<AvailableQuizzes />} />
  <Route path="leaderboard" element={<Leaderboard />} />
  
</Route>
      </Routes>
    </Router>
  );
}

export default App;
