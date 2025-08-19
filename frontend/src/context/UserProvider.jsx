import React, { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const login = (token, role, userId) => {
    setToken(token);
    setRole(role);
    setUserId(userId);
    
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setToken("");
    setRole("");
    setUserId("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider value={{ token, role, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
