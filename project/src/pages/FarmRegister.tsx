import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useFarmManagement } from '../hooks/useFarmManagement';
import { FarmPageHeader } from '../components/FarmPageHeader';
import { FarmForm } from '../components/FarmForm';
import { LoadingOverlay } from '../components/LoadingOverlay';

const FarmRegister: React.FC = () => {
  const {
    formData,
    formErrors,
    isSubmitting,
    clients,
    handleInputChange,
    handleSubmit,
    handleFormReset,
    loadClients,
  } = useFarmManagement();

  // Carregar clientes ao montar o componente
  useEffect(() => {
    loadClients();
  }, []);

  const handleFormSubmit = async () => {
    const success = await handleSubmit();
    
    if (success) {
      notification.success({
        message: 'Sucesso!',
        description: 'Granja cadastrada com sucesso!',
        placement: 'topRight',
        duration: 4,
      });
      
      handleFormReset();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-4 pt-16 pb-8">
      <div className="flex flex-col gap-6">
        <FarmPageHeader />
        <FarmForm
          formData={formData}
          formErrors={formErrors}
          isSubmitting={isSubmitting}
          clients={clients}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
        />
      </div>
      <LoadingOverlay 
        show={isSubmitting}
        message="Cadastrando granja e endereço..."
      />
    </div>
  );
};

export default FarmRegister;
