import axios from 'axios';
import { API_URL } from '@/config/api';
import { CollectEggData } from '@/@types/CollectEggData';
const clientHook = {
  
  createEggCollect: async (eggCollectData : CollectEggData) => {
    try {
      const response = await axios.post(`${API_URL}/collect-egg`, eggCollectData);
      return response.data as CollectEggData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  listAllEggCollects: async () => {
    try {
      const response = await axios.get(`${API_URL}/collect-egg`);
      return response.data as CollectEggData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

  getByAviary: async (aviaryId : number) => {
    try {
      const response = await axios.get(`${API_URL}/collect-egg/aviary/${aviaryId}`);
      return response.data as CollectEggData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },
  
  getByDate: async (date : string) => {
    try {
      const response = await axios.get(`${API_URL}/collect-egg/date/${date}`);
      return response.data as CollectEggData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

  getByDateAndAviary: async (date : string, aviaryId : number) => {
    try {
      const response = await axios.get(`${API_URL}/collect-egg/date/${date}/aviary/${aviaryId}`);
      return response.data as CollectEggData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

  deleteCollect: async (collectId: number) => {
    try{
        const response = await axios.delete(`${API_URL}/collect-egg/${collectId}`);
        return response.data;
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
