// components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.auth);

  // If data is still loading, show a loading indicator or nothing
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated and has admin privileges
  return user && user.isAdmin ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default AdminRoute;
