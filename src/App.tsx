import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes';
import { FarmProvider } from './contexts/FarmContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginTemplate from './templates/Login';
import { Bounce, ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FarmProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Routes>
          <Route path="/login" element={<LoginTemplate />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </FarmProvider>
    </AuthProvider>
  );
};

export default App;
