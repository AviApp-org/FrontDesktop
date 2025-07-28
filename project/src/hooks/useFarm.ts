import api from '../config/axios';
import { FarmData } from '@/@types/FarmData';
import api from '@/config/axios';

const farmHook = {
  getFarmByID: async (farmId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/farms/${farmId}`);
=======
      const response = await api.get(`/api/farms/${farmId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as FarmData[];
    } catch (e) {
      console.error('Error getting farm by ID:', e);
      return [];
    }
  },
<<<<<<< HEAD

    getFarms: async () => {
        try {
        const response = await api.get(`${API_URL}/farms`);
        return response.data as FarmData[];
        } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error('Axios error message:', e.message);
            console.error('Axios error response:', e.response);
        }
        return [];
        }
    },
    createFarm: async (farmData: FarmData) => {
        try {
            const response = await api.post(`${API_URL}/farms`, farmData);
            return response.data as FarmData;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error message:', e.message);
                console.error('Axios error response:', e.response);
            }
            throw new Error('Erro ao criar fazenda');
        }
    },
    deleteFarm: async (farmId: string) => {
        try {
            const response = await api.delete(`${API_URL}/farms/${farmId}`);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error message:', e.message);
                console.error('Axios error response:', e.response);
            }
            throw new Error('Erro ao deletar fazenda');
        }
    },
=======
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
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
};
export default farmHook;
