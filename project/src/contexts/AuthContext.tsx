import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from '../services/api';

interface Farm {
  id: string;
  name: string;
  code: string;
  // outros dados da granja
}

interface AuthContextData {
  signed: boolean;
  farm: Farm | null;
  loading: boolean;
  signIn(credentials: { farmCode: string; password: string }): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn({ farmCode, password }: { farmCode: string; password: string }) {
    try {
      setLoading(true);
      const response = await api.post('/auth/farm/login', { farmCode, password });
      
      setFarm(response.data.farm);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      localStorage.setItem('@App:token', response.data.token);
      localStorage.setItem('@App:farm', JSON.stringify(response.data.farm));
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    setFarm(null);
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:farm');
    api.defaults.headers.common['Authorization'] = '';
  }

  return (
    <AuthContext.Provider value={{ signed: !!farm, farm, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 