import axios from 'axios';
import { API_URL } from '@/config/api';
import { AviaryData } from '@/@types/AviaryData';
const aviaryHook = {
  
  createAviary: async (aviaryData: AviaryData) => {
    try {
      const response = await axios.post(`${API_URL}/aviaries`, aviaryData);
      return response.data as AviaryData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message); 
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  getAviariesByBatch: async (batachId: number) => {
    try {
      const response = await axios.get(`${API_URL}/aviaries/batch/${batachId}`);
      return response.data as AviaryData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

  getAviaryById: async (aviaryId: number) => {
    try {
      const response = await axios.get(`${API_URL}/aviaries/${aviaryId}`);
      return response.data as AviaryData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  getAllAviaries: async () => {
    try {
      const response = await axios.get(`${API_URL}/aviaries`);
      return response.data as AviaryData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

  updateAviary: async (aviaryId: number, aviaryData: AviaryData) => {
    try {
      const response = await axios.put(`${API_URL}/aviaries/${aviaryId}`, aviaryData);
      return response.data as AviaryData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

  deleteAviary: async (aviaryId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/aviaries/${aviaryId}`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },
};

export default aviaryHook;
