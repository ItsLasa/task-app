// src/components/ProtectedRoute.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  // Optional: Auto-login guest users
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
    // OR redirect to home:
    // return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
