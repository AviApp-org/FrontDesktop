import { AviaryData } from '../@types/AviaryData';
import api from '../config/axios';
import { API_ENDPOINTS } from '../config/api';

export const aviaryService = {
  getAll: async (batchId: string): Promise<AviaryData[]> => {
    if (!batchId) {
      throw new Error('batchId é obrigatório para buscar aviários');
    }
    const response = await api.get(`${API_ENDPOINTS.aviaries}`, {
      params: { batchId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<AviaryData> => {
    const response = await api.get(`${API_ENDPOINTS.aviaries}/${id}`);
    return response.data;
  },

  create: async (aviary: Omit<AviaryData, 'id'>): Promise<AviaryData> => {
    const response = await api.post(API_ENDPOINTS.aviaries, aviary);
    return response.data;
  },

  update: async (id: string, aviary: Partial<AviaryData>): Promise<AviaryData> => {
    const response = await api.put(`${API_ENDPOINTS.aviaries}/${id}`, aviary);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.aviaries}/${id}`);
  }
}; 