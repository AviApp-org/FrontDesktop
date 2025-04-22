import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';
import Financial from '../pages/Financial';
import CollectionReview from '../pages/CollectionReview';
import DataEntry from '../pages/DataEntry';
import Layout from '../components/Layout';
import { BatchManagement } from '../pages/BatchManagement';
import EmployeesPage from '../pages/EmployeesPage';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = true; 
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

export function AppRoutes() {
  // Podemos obter o farmId de um contexto global ou do localStorage
  const farmId = localStorage.getItem('farmId') || 'default';
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/financial"
        element={
          <PrivateRoute>
            <Financial />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/review"
        element={
          <PrivateRoute>
            <CollectionReview />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/data-entry"
        element={
          <PrivateRoute>
            <DataEntry />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/batches"
        element={
          <PrivateRoute>
            <BatchManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <PrivateRoute>
            <EmployeesPage />
          </PrivateRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}