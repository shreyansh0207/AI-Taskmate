import React from 'react';
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export function RedirectIfAuth({ children }) {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/" replace />;
  return children;
}


