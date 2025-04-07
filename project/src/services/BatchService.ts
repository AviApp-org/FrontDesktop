import { Batch } from '../types/interfaces/batch';
import axios from 'axios';
import { API_URL } from '../config/api';

export class BatchService {
  static async getById(id: number): Promise<Batch> {
    const response = await axios.get(`${API_URL}/api/batches/${id}`);
    return response.data;
  }

  static async create(batch: Omit<Batch, 'id'>): Promise<Batch> {
    const response = await axios.post(`${API_URL}/api/batches`, batch);
    return response.data;
  }

  static async activate(id: number): Promise<void> {
    await axios.patch(`${API_URL}/api/batches/${id}/activate`);
  }

  static async deactivate(id: number): Promise<void> {
    await axios.patch(`${API_URL}/api/batches/${id}/deactivate`);
  }
} 