import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal/20 border-t-teal rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    // Redirect to home if not admin
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
