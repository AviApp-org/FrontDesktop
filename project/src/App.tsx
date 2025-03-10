import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Financial from './pages/Financial';
import CollectionReview from './pages/CollectionReview';
import Personnel from './pages/Personnel';
import DataEntry from './pages/DataEntry';
import Layout from './components/Layout';
import BatchManagement from './pages/BatchManagement';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/reports" element={
          <Layout>
            <Reports />
          </Layout>
        } />
        <Route path="/financial" element={
          <Layout>
            <Financial />
          </Layout>
        } />
        <Route path="/collection-review" element={
          <Layout>
            <CollectionReview />
          </Layout>
        } />
        <Route path="/personnel" element={
          <Layout>
            <Personnel />
          </Layout>
        } />
        <Route path="/data-entry" element={
          <Layout>
            <DataEntry />
          </Layout>
        } />
        <Route path="/batch-management" element={
          <Layout>
            <BatchManagement />
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;