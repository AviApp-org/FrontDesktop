import React from 'react';
import { AppRoutes } from './routes';
import { FarmProvider } from './contexts/FarmContext';

const App: React.FC = () => {
  return(
  <FarmProvider>
    <AppRoutes />;
  </FarmProvider>
  )
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
