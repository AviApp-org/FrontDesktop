import { useState } from 'react';
import { ClientData } from '../@types/ClientData';
import { ClientStatus } from '../Enums';
import { validateCNPJ } from '../utils/validators';
import { clientService } from '../services/clientService';
import { showErrorMessage } from '../utils/errorHandler';

export interface ClientFormData extends Omit<ClientData, 'id'> {}

const initialFormData: ClientFormData = {
  name: '',
  email: '',
  cnpj: '',
  phone: '',
  status: ClientStatus.ACTIVE
};

export const useClientManagement = () => {
  // Estados
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validação do formulário
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Por favor, insira o nome do cliente';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Por favor, insira o e-mail do cliente';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Por favor, insira um e-mail válido';
    }

    if (!formData.cnpj.trim()) {
      errors.cnpj = 'Por favor, insira o CNPJ do cliente';
    } else if (formData.cnpj.length !== 14) {
      errors.cnpj = 'O CNPJ deve ter 14 dígitos';
    } else if (!/^\d{14}$/.test(formData.cnpj)) {
      errors.cnpj = 'O CNPJ deve conter apenas números';
    } else if (!validateCNPJ(formData.cnpj)) {
      errors.cnpj = 'CNPJ inválido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Por favor, insira o telefone do cliente';
    }

    if (!formData.status) {
      errors.status = 'Por favor, selecione o status do cliente';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Sanitizar dados do formulário
  const sanitizeFormData = (values: ClientFormData): ClientFormData => ({
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    cnpj: values.cnpj.replace(/\D/g, ''),
    phone: values.phone.replace(/\D/g, ''),
    status: values.status
  });

  // Handlers
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    
    if (name === 'cnpj') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 14) {
        setFormData({ ...formData, [name]: cleaned });
      }
    } else if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Limpar erro do campo quando usuário começar a digitar
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const sanitizedData = sanitizeFormData(formData);
      console.log('🔍 Dados do cliente sendo enviados:', sanitizedData);
      
      await clientService.create(sanitizedData);
      
      // Reset form após sucesso
      setFormData(initialFormData);
      return true;
    } catch (error) {
      const errorMessage = showErrorMessage(error);
      setFormErrors({ submit: errorMessage });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormReset = () => {
    setFormData(initialFormData);
    setFormErrors({});
  };

  return {
    // Estados
    formData,
    formErrors,
    isSubmitting,
    
    // Handlers
    handleInputChange,
    handleSubmit,
    handleFormReset,
  };
};
