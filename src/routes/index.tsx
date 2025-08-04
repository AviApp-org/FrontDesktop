
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';
import Financial from '../pages/Financial';
//import DataEntry from '../pages/DataEntry';
import BatchManagement from '../pages/BatchManagement';
import EmployeesPage from '../pages/EmployeesPage';
import ClientRegister from '../pages/ClientRegister';
import FarmRegister from '../pages/FarmRegister';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '@/pages/Login';
import CollectsPage from '../pages/CollectsPage';
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} /> {/* <- Adicione isso antes de tudo */}

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/financial"
        element={
          <ProtectedRoute>
            <Financial />
          </ProtectedRoute>
        }
      />

      <Route
        path="/collects"
        element={
          <ProtectedRoute>
            <CollectsPage />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/data-entry"
        element={
          <ProtectedRoute>
            <DataEntry />
          </ProtectedRoute>
        }
      />
       */}
      <Route
        path="/batches"
        element={
          <ProtectedRoute>
            <BatchManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients/register"
        element={
          <ProtectedRoute>
            <ClientRegister />
          </ProtectedRoute>
        }
      />

      <Route
        path="/farms/register"
        element={
          <ProtectedRoute>
            <FarmRegister />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}