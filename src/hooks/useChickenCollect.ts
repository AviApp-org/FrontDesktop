import api from '../config/axios';
import { CollectChickenData } from '@/@types/CollectChickenData';

const chickenCollectHook = {
  
  createChickenCollect: async (chickenCollectData : CollectChickenData) => {
    try {
      const response = await api.post('/api/collect-chicken', chickenCollectData);
      return response.data as CollectChickenData;
    } catch (e) {
      console.error('Error creating chicken collect:', e);
      return null;
    }
  },

  listAllchickenCollects: async () => {
    try {
      const response = await api.get('/api/collect-chicken');
      return response.data as CollectChickenData[];
    } catch (e) {
      console.error('Error listing chicken collects:', e);
      return [];
    }
  },

  getByAviary: async (aviaryId : number) => {
    try {
      const response = await api.get(`/api/collect-chicken/aviary/${aviaryId}`);
      return response.data as CollectChickenData[];
    } catch (e) {
      console.error('Error getting chicken collects by aviary:', e);
      return [];
    }
  },
  
  getByDate: async (date : string) => {
    try {
      const response = await api.get(`/api/collect-chicken/date/${date}`);
      return response.data as CollectChickenData[];
    } catch (e) {
      console.error('Error getting chicken collects by date:', e);
      return [];
    }
  },

  getByDateAndAviary: async (date : string, aviaryId : number) => {
    try {
      const response = await api.get(`/api/collect-chicken/date/${date}/aviary/${aviaryId}`);
      return response.data as CollectChickenData[];
    } catch (e) {
      console.error('Error getting chicken collects by date and aviary:', e);
      return [];
    }
  },

  deleteCollect: async (collectId: number) => {
    try{
        const response = await api.delete(`/api/collect-chicken/${collectId}`);
        return response.data;
    }catch (e) {
      console.error('Error deleting collect:', e);
      return null;
    }
  }
  
};

export default chickenCollectHook;
