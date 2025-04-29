import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePermissions, UserRole } from '../@types/auth';
import Layout from './Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // TODO: Obter usuário do contexto de autenticação
  const user = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    role: UserRole.ADMIN
  };

  const isAuthenticated = true; // TODO: Implementar lógica real de autenticação

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica se a rota atual requer permissões específicas
  const requiredRoles = RoutePermissions[location.pathname as keyof typeof RoutePermissions];
  
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    // Redireciona para a página inicial se o usuário não tem permissão
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute; 