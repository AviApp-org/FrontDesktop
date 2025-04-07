import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';
import Financial from '../pages/Financial';
import CollectionReview from '../pages/CollectionReview';
import DataEntry from '../pages/DataEntry';
import Layout from '../components/Layout';
import { BatchManagement } from '../pages/BatchManagement';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

  const isAuthenticated = true; 

  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

export function AppRoutes() {
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
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
} 