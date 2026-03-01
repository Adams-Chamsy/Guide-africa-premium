import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SkeletonDetail } from './Skeleton';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="page-container"><SkeletonDetail /></div>;
  if (!isAuthenticated) return <Navigate to="/connexion" state={{ from: location }} replace />;
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />;
  return children;
};

export default AdminRoute;
