import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import farmHook from '../hooks/useFarm';
import { FarmData } from '../@types/FarmData';

interface FarmContextType {
  farmId: number; 
  farmData: FarmData | null;
  setFarmId: (id: number) => void;
  loadingFarm: boolean;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [farmId, setFarmId] = useState<number>(
    Number(localStorage.getItem('farmId')) || 0
  );
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [loadingFarm, setLoadingFarm] = useState(false);
  
  const { user, isAuthenticated } = useAuthContext();

  useEffect(() => {
    const loadUserFarm = async () => {
      if (isAuthenticated && user?.clientId) {
        setLoadingFarm(true);
        try {
          const farms = await farmHook.getFarmByClientID(user.clientId);
          if (farms) {
            const userFarm = farms; // Pega a primeira farm do cliente
            setFarmData(userFarm);
            if (userFarm.id) {
              setFarmId(userFarm.id);
              localStorage.setItem('farmId', String(userFarm.id));
            }
          }
        } catch (error) {
          console.error('Erro ao carregar farm do usuário:', error);
        } finally {
          setLoadingFarm(false);
        }
      } else {
        // Limpar dados quando não autenticado
        setFarmData(null);
        setFarmId(0);
        localStorage.removeItem('farmId');
      }
    };

    loadUserFarm();
  }, [isAuthenticated, user?.clientId]);

  const handleSetFarmId = (id: number) => {
    setFarmId(id);
    localStorage.setItem('farmId', String(id));
  };

  return (
    <FarmContext.Provider value={{ 
      farmId, 
      farmData, 
      setFarmId: handleSetFarmId, 
      loadingFarm 
    }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = (): FarmContextType => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
