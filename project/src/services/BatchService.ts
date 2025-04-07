import { Batch } from '../types/interfaces/batch';
import axios, { AxiosPromise } from 'axios';

const API_URL = "http://localhost:8080";

class BatchService {
  async getAll(): Promise<Batch[]> {
    const response = await axios.get(`${API_URL}/batches`);
    return response.data;
  }

  async create(batch: Omit<Batch, 'id'>): Promise<Batch> {
    const response = await axios.post(`${API_URL}/batches`, batch);
    return response.data;
  }

  async update(id: number, batch: Partial<Batch>): Promise<Batch> {
    const response = await axios.put(`${API_URL}/batches/${id}`, batch);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/batches/${id}`);
  }
}

export const batchService = new BatchService(); 