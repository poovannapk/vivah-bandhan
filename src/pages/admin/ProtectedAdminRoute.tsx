import React from 'react';
import { Navigate } from 'react-router-dom';

const isAdmin = () => {
  // Example: decode JWT and check role, or check a value in localStorage
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'admin';
  } catch {
    return false;
  }
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAdmin()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedAdminRoute;
