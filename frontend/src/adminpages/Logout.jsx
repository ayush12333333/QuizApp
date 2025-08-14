import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect to login
  }, [navigate]);

  return null; // ya spinner dikha sakte ho
}
