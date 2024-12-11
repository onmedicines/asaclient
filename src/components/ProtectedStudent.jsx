import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedStudent({ children }) {
  const token = localStorage.getItem("token"); // Replace with your actual auth logic

  return token ? children : <Navigate to="/student/login" />;
}
