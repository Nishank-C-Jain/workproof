import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

const ProtectedRoute = ({ allowedRole, children }) => {
  const { role } = useAuth();

  if (!role) {
    // Not logged in
    return <Navigate to="/org/login" replace />;
  }

  if (role !== allowedRole) {
    // Role not allowed
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
