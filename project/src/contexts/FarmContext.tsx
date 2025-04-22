import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FarmContextType {
  farmId: string;
  setFarmId: (id: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [farmId, setFarmId] = useState<string>(localStorage.getItem('farmId') || '1');

  const handleSetFarmId = (id: string) => {
    setFarmId(id);
    localStorage.setItem('farmId', id);
  };

  return (
    <FarmContext.Provider value={{ farmId, setFarmId: handleSetFarmId }}>
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
