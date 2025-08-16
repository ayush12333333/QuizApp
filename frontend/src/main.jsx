import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QuizProvider } from "./context/QuizContext";
import { AuthProvider } from "./context/AuthContext"; // AuthProvider import karo
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </AuthProvider>
  </StrictMode>
);
