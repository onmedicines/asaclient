import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/admin/login" />;
}
