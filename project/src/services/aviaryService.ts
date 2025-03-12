import api from './api';
import { AviaryData } from '../types/interfaces/aviary';

export const aviaryService = {
  getAll: () => api.get('/aviaries'),
  getById: (id: string) => api.get(`/aviaries/${id}`),
  create: (data: AviaryData) => api.post('/aviaries', data),
  update: (id: string, data: AviaryData) => api.put(`/aviaries/${id}`, data),
  delete: (id: string) => api.delete(`/aviaries/${id}`),
};
