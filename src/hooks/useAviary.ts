import api from '../config/axios';
import { AviaryData } from '@/@types/AviaryData';

const aviaryHook = {
  createAviary: async (aviaryData: AviaryData) => {
    try {
      const response = await api.post('/api/aviaries', aviaryData);
      return response.data as AviaryData;
    } catch (e) {
      console.error('Error creating aviary:', e);
      return null;
    }
  },

  getAviariesByBatch: async (batachId: number) => {
    try {
      const response = await api.get(`/api/aviaries/batch/${batachId}`);
      return response.data as AviaryData[];
    } catch (e) {
      console.error('Error getting aviaries by batch:', e);
      return [];
    }
  },

  getAviaryById: async (aviaryId: number) => {
    try {
      const response = await api.get(`/api/aviaries/${aviaryId}`);
      return response.data as AviaryData;
    } catch (e) {
      console.error('Error getting aviary by ID:', e);
      return null;
    }
  },

  getAllAviaries: async () => {
    try {
      const response = await api.get('/api/aviaries');
      return response.data as AviaryData[];
    } catch (e) {
      console.error('Error getting all aviaries:', e);
      return [];
    }
  },

  updateAviary: async (aviaryId: number, aviaryData: AviaryData) => {
    try {
      const response = await api.put(`/api/aviaries/${aviaryId}`, aviaryData);
      return response.data as AviaryData;
    } catch (e) {
      console.error('Error updating aviary:', e);
      return null;
    }
  },

  deleteAviary: async (aviaryId: number) => {
    try {
      const response = await api.delete(`/api/aviaries/${aviaryId}`);
      return response.data;
    } catch (e) {
      console.error('Error deleting aviary:', e);
      throw e;
    }
  },
};

export default aviaryHook;
