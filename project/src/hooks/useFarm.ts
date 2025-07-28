import api from '../config/axios';
import { FarmData } from '@/@types/FarmData';

const farmHook = {
  getFarmByID: async (farmId: number) => {
    try {
      const response = await api.get(`/api/farms/${farmId}`);
      return response.data as FarmData[];
    } catch (e) {
      console.error('Error getting farm by ID:', e);
      return [];
    }
  },
getFarmByClientID: async (clientId: number) => {
    try {
      const response = await api.get(`/api/farms/client/${clientId}`);
      return response.data as FarmData[];
    } catch (e) {
      console.error('Error getting farm by ID:', e);
      return [];
    }
  },
  getFarms: async () => {
    try {
      const response = await api.get('/api/farms');
      return response.data as FarmData[];
    } catch (e) {
      console.error('Error getting farms:', e);
      return [];
    }
  },
  createFarm: async (farmData: FarmData) => {
    try {
      const response = await api.post('/api/farms', farmData);
      return response.data as FarmData;
    } catch (e) {
      console.error('Error creating farm:', e);
      throw new Error('Erro ao criar fazenda');
    }
  },
  deleteFarm: async (farmId: string) => {
    try {
      const response = await api.delete(`/api/farms/${farmId}`);
      return response.data;
    } catch (e) {
      console.error('Error deleting farm:', e);
      throw new Error('Erro ao deletar fazenda');
    }
  },
};
export default farmHook;
