import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FarmContextType {
  farmId: number;  // ✅ Mudado para number
  setFarmId: (id: number) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ✅ Converter localStorage para number
  const [farmId, setFarmId] = useState<number>(
    Number(localStorage.getItem('farmId')) || 1
  );

  const handleSetFarmId = (id: number) => {
    setFarmId(id);
    localStorage.setItem('farmId', String(id)); // ✅ Salvar como string no localStorage
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
