import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePermissions, UserRole } from '../@types/auth';
import { useAuthContext } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';
import Layout from './Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuthContext();

  // Mostra loading enquanto verifica autenticação
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

  // Verifica se a rota atual requer permissões específicas
  const requiredRoles = RoutePermissions[location.pathname as keyof typeof RoutePermissions];
  
  if (requiredRoles && user?.userRole && !requiredRoles.includes(user.userRole as any)) {
    // Redireciona para a página inicial se o usuário não tem permissão
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute; 