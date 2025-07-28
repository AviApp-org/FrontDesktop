import api from '../config/axios';
import { ClientData } from '@/@types/ClientData';
import api from '@/config/axios';
const clientHook = {
  
  createClient: async (clientData: ClientData) => {
    try {
<<<<<<< HEAD
      const response = await api.post(`${API_URL}/clients`, clientData);
=======
      const response = await api.post('/api/clients', clientData);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as ClientData;
    } catch (e) {
      console.error('Error creating client:', e);
      return null;
    }
  },

  listClients: async () => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/clients`);
=======
      const response = await api.get('/api/clients');
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as ClientData[];
    } catch (e) {
      console.error('Error listing clients:', e);
      return null;
    }
  },

  getClientById: async (clientId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/clients/${clientId}`);
=======
      const response = await api.get(`/api/clients/${clientId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as ClientData;
    } catch (e) {
      console.error('Error getting client by ID:', e);
      return null;
    }
  },

  updateClient: async (clientId: number, clientData: ClientData) => {
    try {
<<<<<<< HEAD
      const response = await api.put(`${API_URL}/clients/${clientId}`, clientData);
=======
      const response = await api.put(`/api/clients/${clientId}`, clientData);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as ClientData;
    } catch (e) {
      console.error('Error updating client:', e);
      return null;
    }
  },

  activateClient: async (clientId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.patch(`${API_URL}/clients/${clientId}/activate`);
=======
      const response = await api.patch(`/api/clients/${clientId}/activate`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data;
    } catch (e) {
      console.error('Error activating client:', e);
      return null;
    }
  },

  deactivateClient: async (clientId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.patch(`${API_URL}/clients/${clientId}/deactivate`);
=======
      const response = await api.patch(`/api/clients/${clientId}/deactivate`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data;
    } catch (e) {
      console.error('Error deactivating client:', e);
      return null;
    }
  },

  deleteClient: async (clientId:number) => {
    try{
<<<<<<< HEAD
        const response = await api.delete(`${API_URL}/clients/${clientId}`)
=======
        const response = await api.delete(`/api/clients/${clientId}`)
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
        return response.data
    }catch (e) {
      console.error('Error deleting client:', e);
      return null;
    }
  }
};

export default clientHook;
