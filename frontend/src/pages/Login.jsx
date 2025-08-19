import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../services/authService";
import { toast } from "react-hot-toast";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const data = await loginUser(formData.email, formData.password);

      const role = data.role;
      const userId = data.userId;
   
      if (!role || !userId) {
        toast.error("Login response incomplete");
        return;
      }

      // Save in context + localStorage
      login(data.token, role, userId);
      toast.success("Login successful");

      //  Navigate based on role
      if (role === "ADMIN") navigate("/adminDashboard");
      else navigate("/userDashboard");
    } catch (err) {
      if (err.message === "Invalid password") toast.error("Wrong password");
      else toast.error("Signup first");
    }
  };

  return (
    <LoginForm
      title="Login"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    >
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:underline font-semibold"
        >
          Sign up
        </Link>
      </p>
    </LoginForm>
  );
};

export default Login;
