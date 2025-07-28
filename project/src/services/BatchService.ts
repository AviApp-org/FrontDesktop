import { Batch } from '../types/interfaces/batch';
import api from '../config/axios';

export class BatchService {
  static async getById(id: string): Promise<Batch> {
    const response = await api.get(`/api/batches/${id}`);
    return response.data;
  }

  static async create(batch: Omit<Batch, 'id'>): Promise<Batch> {
    const response = await api.post('/api/batches', batch);
    return response.data;
  }

  static async activate(id: string): Promise<void> {
    await api.patch(`/api/batches/${id}/activate`);
  }

  static async deactivate(id: string): Promise<void> {
    await api.patch(`/api/batches/${id}/deactivate`);
  }
} 