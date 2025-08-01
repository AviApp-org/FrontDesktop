import api from '../config/axios';
import { CollectEggData } from '@/@types/CollectEggData';
const eggCollectHook = {
  
  createEggCollect: async (eggCollectData : CollectEggData) => {
    try {
      const response = await api.post('/api/collect-egg', eggCollectData);
      return response.data as CollectEggData;
    } catch (e) {
      console.error('Error creating egg collect:', e);
      return null;
    }
  },

  listAllEggCollects: async () => {
    try {
      const response = await api.get('/api/collect-egg');
      return response.data as CollectEggData[];
    } catch (e) {
      console.error('Error listing egg collects:', e);
      return [];
    }
  },

  getByAviary: async (aviaryId : number) => {
    try {
      const response = await api.get(`/api/collect-egg/aviary/${aviaryId}`);
      return response.data as CollectEggData[];
    } catch (e) {
      console.error('Error getting egg collects by aviary:', e);
      return [];
    }
  },
  
  getByDate: async (date : string) => {
    try {
      const response = await api.get(`/api/collect-egg/date/${date}`);
      return response.data as CollectEggData[];
    } catch (e) {
      console.error('Error getting egg collects by date:', e);
      return [];
    }
  },

  getByDateAndAviary: async (date : string, aviaryId : number) => {
    try {
      const response = await api.get(`/api/collect-egg/date/${date}/aviary/${aviaryId}`);
      return response.data as CollectEggData[];
    } catch (e) {
      console.error('Error getting egg collects by date and aviary:', e);
      return [];
    }
  },

  deleteCollect: async (collectId: number) => {
    try{
        const response = await api.delete(`/api/collect-egg/${collectId}`);
        return response.data;
    }catch (e) {
      console.error('Error deleting collect:', e);
      return null;
    }
  }
  
};

export default eggCollectHook;
