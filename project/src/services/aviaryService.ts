import { AviaryData } from '../@types/AviaryData';
import api from '../config/axios';
import { API_ENDPOINTS } from '../config/api';

export const aviaryService = {
  getAll: async (batchId: number): Promise<AviaryData[]> => {
    const response = await api.get(`${API_ENDPOINTS.aviaries}`, {
      params: { batchId }
    });
    return response.data;
  },

  getById: async (id: number): Promise<AviaryData> => {
    const response = await api.get(`${API_ENDPOINTS.aviaries}/${id}`);
    return response.data;
  },

  create: async (aviary: Omit<AviaryData, 'id'>): Promise<AviaryData> => {
    const response = await api.post(API_ENDPOINTS.aviaries, aviary);
    return response.data;
  },

  update: async (id: number, aviary: Partial<AviaryData>): Promise<AviaryData> => {
    const response = await api.put(`${API_ENDPOINTS.aviaries}/${id}`, aviary);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.aviaries}/${id}`);
  }
}; 