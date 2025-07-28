import api from '../config/axios';
import { AviaryData } from '@/@types/AviaryData';
import api from '@/config/axios';

const aviaryHook = {
  
  createAviary: async (aviaryData: AviaryData) => {
    try {
<<<<<<< HEAD
      const response = await api.post(`${API_URL}/aviaries`, aviaryData);
=======
      const response = await api.post('/api/aviaries', aviaryData);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as AviaryData;
    } catch (e) {
      console.error('Error creating aviary:', e);
      return null;
    }
  },

  getAviariesByBatch: async (batachId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/aviaries/batch/${batachId}`);
=======
      const response = await api.get(`/api/aviaries/batch/${batachId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as AviaryData[];
    } catch (e) {
      console.error('Error getting aviaries by batch:', e);
      return [];
    }
  },

  getAviaryById: async (aviaryId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/aviaries/${aviaryId}`);
=======
      const response = await api.get(`/api/aviaries/${aviaryId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as AviaryData;
    } catch (e) {
      console.error('Error getting aviary by ID:', e);
      return null;
    }
  },

  getAllAviaries: async () => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/aviaries`);
=======
      const response = await api.get('/api/aviaries');
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as AviaryData[];
    } catch (e) {
      console.error('Error getting all aviaries:', e);
      return [];
    }
  },

  updateAviary: async (aviaryId: number, aviaryData: AviaryData) => {
    try {
<<<<<<< HEAD
      const response = await api.put(`${API_URL}/aviaries/${aviaryId}`, aviaryData);
=======
      const response = await api.put(`/api/aviaries/${aviaryId}`, aviaryData);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as AviaryData;
    } catch (e) {
      console.error('Error updating aviary:', e);
      return null;
    }
  },

  deleteAviary: async (aviaryId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.delete(`${API_URL}/aviaries/${aviaryId}`);
=======
      const response = await api.delete(`/api/aviaries/${aviaryId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data;
    } catch (e) {
      console.error('Error deleting aviary:', e);
      return null;
    }
  },
};

export default aviaryHook;
