import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes';
import { FarmProvider } from './contexts/FarmContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginTemplate from './templates/Login';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FarmProvider>
        <Routes>
          <Route path="/login" element={<LoginTemplate />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </FarmProvider>
    </AuthProvider>
  );
};

export default App;


/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FarmProvider } from './contexts/FarmContext';
import EmployeesPage from './pages/EmployeesPage';
// Outros imports...

function App() {
  return (
    <FarmProvider>
      <Router>
        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          
        </Routes>
      </Router>
    </FarmProvider>
  );
}

export default App;*/
