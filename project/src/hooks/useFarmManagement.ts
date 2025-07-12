import { useState } from 'react';
import { FarmData } from '../@types/FarmData';
import { AddressData } from '../@types/AddressData';

export interface FarmFormData {
  // Dados da granja
  name: string;
  clientId: number | null;
  
  // Dados do endereço
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

const initialFormData: FarmFormData = {
  name: '',
  clientId: null,
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: ''
};

export const useFarmManagement = () => {
  // Estados
  const [formData, setFormData] = useState<FarmFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState<Array<{ id: number; name: string }>>([]);
  const [farms, setFarms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Carregar clientes
  const loadClients = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      setFormErrors({ clients: 'Erro ao carregar lista de clientes' });
    }
  };

  // Carregar fazendas
  const loadFarms = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      // Replace with your actual API/service call
      const response = await fetch('http://localhost:8080/api/farms');
      if (response.ok) {
        const data = await response.json();
        setFarms(data);
      }
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Validação do formulário
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Validação da granja
    if (!formData.name.trim()) {
      errors.name = 'Por favor, insira o nome da granja';
    }
    
    if (!formData.clientId) {
      errors.clientId = 'Por favor, selecione o cliente';
    }

    // Validação do endereço
    if (!formData.cep.trim()) {
      errors.cep = 'Por favor, insira o CEP';
    } else if (!/^\d{8}$/.test(formData.cep.replace(/\D/g, ''))) {
      errors.cep = 'CEP deve conter 8 dígitos';
    }

    if (!formData.street.trim()) {
      errors.street = 'Por favor, insira a rua';
    }

    if (!formData.number.trim()) {
      errors.number = 'Por favor, insira o número';
    }

    if (!formData.neighborhood.trim()) {
      errors.neighborhood = 'Por favor, insira o bairro';
    }

    if (!formData.city.trim()) {
      errors.city = 'Por favor, insira a cidade';
    }

    if (!formData.state.trim()) {
      errors.state = 'Por favor, insira o estado';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Criar endereço
  const createAddress = async (): Promise<number | null> => {
    const addressData: Omit<AddressData, 'id'> = {
      street: formData.street.trim(),
      number: formData.number.trim(),
      cep: formData.cep.replace(/\D/g, ''),
      neighborhood: formData.neighborhood.trim(),
      city: formData.city.trim(),
      state: formData.state.trim()
    };


    const addressResponse = await fetch('http://localhost:8080/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(addressData),
    });

    const addressResult = await addressResponse.json();

    if (!addressResponse.ok) {
      const error = addressResult.message || 'Erro ao cadastrar endereço';
      throw new Error(error);
    }

    if (!addressResult || !addressResult.id) {
      throw new Error('ID do endereço não retornado pela API');
    }

    // Verificar se o endereço foi criado
    const checkAddressResponse = await fetch(`http://localhost:8080/api/addresses/${addressResult.id}`);
    if (!checkAddressResponse.ok) {
      throw new Error('Erro ao verificar endereço criado');
    }

    // Delay para garantir disponibilidade
    await new Promise(resolve => setTimeout(resolve, 1000));

    return addressResult.id;
  };

  // Criar granja
  const createFarm = async (addressId: number): Promise<void> => {
    const farmData = {
      name: formData.name.trim(),
      addressId: addressId,
      clientId: formData.clientId,
      employeesId: []
    };
    
    
    const farmResponse = await fetch('http://localhost:8080/api/farms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(farmData),
    });

    const farmResult = await farmResponse.json();

    if (!farmResponse.ok) {
      // Se houver erro, tentar deletar o endereço criado
      try {
        await fetch(`http://localhost:8080/api/addresses/${addressId}`, {
          method: 'DELETE',
        });
      } catch (deleteError) {
        console.error('Erro ao deletar endereço:', deleteError);
      }

      const error = farmResult.message || 'Erro ao cadastrar granja';
      throw new Error(error);
    }
  };

  // Handlers
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    
    if (name === 'cep') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 8) {
        setFormData({ ...formData, [name]: cleaned });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Limpar erro do campo
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // 1. Criar endereço
      const addressId = await createAddress();
      if (!addressId) {
        throw new Error('Falha ao criar endereço');
      }

      // 2. Criar granja
      await createFarm(addressId);
      
      // 3. Reset form após sucesso
      setFormData(initialFormData);
      return true;
    } catch (error) {
      console.error('Erro detalhado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao cadastrar granja. Tente novamente.';
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

  const handleOpenDialog = () => {
    // Your logic to open the farm registration dialog
  };

  return {
    // Estados
    formData,
    formErrors,
    isSubmitting,
    clients,
    farms,
    isLoading,
    isError,
    
    // Handlers
    handleInputChange,
    handleSubmit,
    handleFormReset,
    loadClients,
    loadFarms,
    handleOpenDialog,
  };
};
