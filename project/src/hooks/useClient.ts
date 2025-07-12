import axios from 'axios';
import { API_URL } from '@/config/api';
import { ClientData } from '@/@types/ClientData';
const clientHook = {
  createClient: async (clientData: ClientData) => {
    try {
      const response = await axios.post(`${API_URL}/clients`, clientData);
      return response.data as ClientData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },
  listClients: async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      return response.data as ClientData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  getClientById: async (clientId: number) => {
    try {
      const response = await axios.get(`${API_URL}/clients/${clientId}`);
      return response.data as ClientData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  updateClient: async (clientId: number, clientData: ClientData) => {
    try {
      const response = await axios.put(`${API_URL}/clients/${clientId}`, clientData);
      return response.data as ClientData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  activateClient: async (clientId: number) => {
    try {
      const response = await axios.patch(`${API_URL}/clients/${clientId}/activate`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  deactivateClient: async (clientId: number) => {
    try {
      const response = await axios.patch(`${API_URL}/clients/${clientId}/deactivate`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  deleteClient: async (clientId:number) => {
    try{
        const response = await axios.delete(`${API_URL}/clients/${clientId}`)
        return response.data
    }catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  }
};

export default clientHook;
