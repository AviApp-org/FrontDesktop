import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePermissions } from '../@types/AuthTypes';
import { useAuthContext } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';
import Layout from './Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuthContext();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const requiredRoles = RoutePermissions[location.pathname as keyof typeof RoutePermissions];
  
  if (requiredRoles && user?.role && !requiredRoles.includes(user.role as any)) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute; 