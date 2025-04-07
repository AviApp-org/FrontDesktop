import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Financial from './pages/Financial';
import CollectionReview from './pages/CollectionReview';
import DataEntry from './pages/DataEntry';
import Layout from './components/Layout';
import { BatchManagement } from './pages/BatchManagement';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      
      <Route
        path="/reports"
        element={
          <Layout>
            <Reports />
          </Layout>
        }
      />
      
      <Route
        path="/financial"
        element={
          <Layout>
            <Financial />
          </Layout>
        }
      />
      
      <Route
        path="/review"
        element={
          <Layout>
            <CollectionReview />
          </Layout>
        }
      />
      
      {/* <Route
        path="/employees"
        element={
          <Layout>
            <Personnel />
          </Layout>
        }
      /> */}
      
      <Route
        path="/data-entry"
        element={
          <Layout>
            <DataEntry />
          </Layout>
        }
      />
      
      <Route
        path="/lots"
        element={
          <Layout>
            <BatchManagement />
          </Layout>
        }
      />
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
