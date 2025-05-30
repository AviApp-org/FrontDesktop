import React from 'react';
import { message, notification } from 'antd';
import { useClientManagement } from '../hooks/useClientManagement';
import { ClientPageHeader } from '../components/ClientPageHeader';
import { ClientForm } from '../components/ClientForm';

const ClientRegister: React.FC = () => {
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    handleFormReset,
  } = useClientManagement();

  const handleFormSubmit = async () => {
    const success = await handleSubmit();
    
    if (success) {
      // ✅ Usar notification do Ant Design
      notification.success({
        message: 'Sucesso!',
        description: 'Cliente cadastrado com sucesso!',
        placement: 'topRight',
        duration: 3,
      });
      
      handleFormReset();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <ClientPageHeader />
          
          <ClientForm
            formData={formData}
            formErrors={formErrors}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;
