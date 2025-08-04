import api from '../config/axios';
import { ClientData } from '@/@types/ClientData';
import { ClientStatus } from '@/@types/enums/enumClientStatus';
import { validateCNPJ } from '../utils/validators';
import { showErrorMessage } from '../utils/errorHandler';
import { toast } from 'react-toastify';

export interface ClientFormData extends Omit<ClientData, 'id'> {}

const initialFormData: ClientFormData = {
  name: '',
  email: '',
  cnpj: '',
  phone: '',
  status: ClientStatus.ACTIVE
};

const clientHook = {
  
  createClient: async (clientData: ClientData) => {
    try {
      const response = await api.post('/api/clients', clientData);
      return response.data as ClientData;
    } catch (e) {
      console.error('Error creating client:', e);
      return null;
    }
  },

  listClients: async () => {
    try {
      const response = await api.get('/api/clients');
      return response.data as ClientData[];
    } catch (e) {
      console.error('Error listing clients:', e);
      return [];
    }
  },

  getClientById: async (clientId: number) => {
    try {
      const response = await api.get(`/api/clients/${clientId}`);
      return response.data as ClientData;
    } catch (e) {
      console.error('Error getting client by ID:', e);
      return null;
    }
  },

  updateClient: async (clientId: number, clientData: ClientData) => {
    try {
      const response = await api.put(`/api/clients/${clientId}`, clientData);
      return response.data as ClientData;
    } catch (e) {
      console.error('Error updating client:', e);
      return null;
    }
  },

  activateClient: async (clientId: number) => {
    try {
      const response = await api.patch(`/api/clients/${clientId}/activate`);
      return response.data;
    } catch (e) {
      console.error('Error activating client:', e);
      return null;
    }
  },

  deactivateClient: async (clientId: number) => {
    try {
      const response = await api.patch(`/api/clients/${clientId}/deactivate`);
      return response.data;
    } catch (e) {
      console.error('Error deactivating client:', e);
      return null;
    }
  },

  deleteClient: async (clientId:number) => {
    try{
        const response = await api.delete(`/api/clients/${clientId}`)
        return response.data
    }catch (e) {
      console.error('Error deleting client:', e);
      return null;
    }
  },

  // Operações com toast (do useClientManagement)
  createClientWithToast: async (clientData: ClientData) => {
    try {
      const response = await api.post('/api/clients', clientData);
      toast.success('Cliente criado com sucesso!');
      return response.data as ClientData;
    } catch (error) {
      const message = `Erro ao criar cliente: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  updateClientWithToast: async (clientId: number, clientData: ClientData) => {
    try {
      const response = await api.put(`/api/clients/${clientId}`, clientData);
      toast.success('Cliente atualizado com sucesso!');
      return response.data as ClientData;
    } catch (error) {
      const message = `Erro ao atualizar cliente: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  deleteClientWithToast: async (clientId: number) => {
    try {
      const response = await api.delete(`/api/clients/${clientId}`);
      toast.success('Cliente excluído com sucesso!');
      return response.data;
    } catch (error) {
      const message = `Erro ao excluir cliente: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  activateClientWithToast: async (clientId: number) => {
    try {
      const response = await api.patch(`/api/clients/${clientId}/activate`);
      toast.success('Cliente ativado com sucesso!');
      return response.data;
    } catch (error) {
      const message = `Erro ao ativar cliente: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  deactivateClientWithToast: async (clientId: number) => {
    try {
      const response = await api.patch(`/api/clients/${clientId}/deactivate`);
      toast.success('Cliente desativado com sucesso!');
      return response.data;
    } catch (error) {
      const message = `Erro ao desativar cliente: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  // Validação
  validateClientForm: (formData: ClientFormData): boolean => {
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
    
    return Object.keys(errors).length === 0;
  },

  // Sanitizar dados do formulário
  sanitizeClientData: (values: ClientFormData): ClientFormData => ({
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    cnpj: values.cnpj.replace(/\D/g, ''),
    phone: values.phone.replace(/\D/g, ''),
    status: values.status
  }),

  // Dados iniciais
  getInitialFormData: (): ClientFormData => ({ ...initialFormData })
};

export default clientHook;
