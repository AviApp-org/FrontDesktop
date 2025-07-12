import { API_URL } from '../config/api';
import axios from 'axios';
import { FarmData } from '@/@types/FarmData';

const farmHook = {

  getFarmByID: async (farmId: number) => {
    try {
      const response = await axios.get(`${API_URL}/farms/${farmId}`);
      return response.data as FarmData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

    getFarms: async () => {
        try {
        const response = await axios.get(`${API_URL}/farms`);
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
            const response = await axios.post(`${API_URL}/farms`, farmData);
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
            const response = await axios.delete(`${API_URL}/farms/${farmId}`);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error message:', e.message);
                console.error('Axios error response:', e.response);
            }
            throw new Error('Erro ao deletar fazenda');
        }
    },
};
    export default farmHook;