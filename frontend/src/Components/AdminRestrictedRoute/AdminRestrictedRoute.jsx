// AdminRestrictedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRestrictedRoute = ({ children }) => {
  const userRole = parseInt(localStorage.getItem("isModerator")); // Assuming you store the user's role in localStorage (e.g., 'admin')
  if (userRole === 0) {
    // If the user is not an admin, redirect to ForbiddenPage
    return <Navigate to="/forbidden" replace />;
  }

  return children; // Render the requested component if the user is an admin
};

export default AdminRestrictedRoute;
