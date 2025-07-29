import api from '../config/axios';
import { ClientData } from '@/@types/ClientData';
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
  }
};

export default clientHook;
