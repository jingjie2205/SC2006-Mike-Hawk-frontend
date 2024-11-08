// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId"); // Check for userId in localStorage

  if (!userId) {
    // If user is not logged in, redirect to ForbiddenPage
    return <Navigate to="/forbidden" replace />;
  }

  return children; // Render the requested component if user is logged in
};

export default ProtectedRoute;
