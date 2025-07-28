import api from '../config/axios';
import { CollectEggData } from '@/@types/CollectEggData';
import api from '@/config/axios';
const clientHook = {
  
  createEggCollect: async (eggCollectData : CollectEggData) => {
    try {
<<<<<<< HEAD
      const response = await api.post(`${API_URL}/collect-egg`, eggCollectData);
=======
      const response = await api.post('/api/collect-egg', eggCollectData);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as CollectEggData;
    } catch (e) {
      console.error('Error creating egg collect:', e);
      return null;
    }
  },

  listAllEggCollects: async () => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/collect-egg`);
=======
      const response = await api.get('/api/collect-egg');
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as CollectEggData[];
    } catch (e) {
      console.error('Error listing egg collects:', e);
      return [];
    }
  },

  getByAviary: async (aviaryId : number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/collect-egg/aviary/${aviaryId}`);
=======
      const response = await api.get(`/api/collect-egg/aviary/${aviaryId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as CollectEggData[];
    } catch (e) {
      console.error('Error getting egg collects by aviary:', e);
      return [];
    }
  },
  
  getByDate: async (date : string) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/collect-egg/date/${date}`);
=======
      const response = await api.get(`/api/collect-egg/date/${date}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as CollectEggData[];
    } catch (e) {
      console.error('Error getting egg collects by date:', e);
      return [];
    }
  },

  getByDateAndAviary: async (date : string, aviaryId : number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/collect-egg/date/${date}/aviary/${aviaryId}`);
=======
      const response = await api.get(`/api/collect-egg/date/${date}/aviary/${aviaryId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as CollectEggData[];
    } catch (e) {
      console.error('Error getting egg collects by date and aviary:', e);
      return [];
    }
  },

  deleteCollect: async (collectId: number) => {
    try{
<<<<<<< HEAD
        const response = await api.delete(`${API_URL}/collect-egg/${collectId}`);
=======
        const response = await api.delete(`/api/collect-egg/${collectId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
        return response.data;
    }catch (e) {
      console.error('Error deleting collect:', e);
      return null;
    }
  }
  
};

export default clientHook;
