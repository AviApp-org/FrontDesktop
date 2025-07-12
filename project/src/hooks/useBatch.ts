import { BatchData } from '@/@types/BatchData'
import { API_URL } from '../config/api';
import axios from 'axios';

const batchHook = {

  getBatchByID: async (batchId: number) => {
    try {
      const response = await axios.get(`${API_URL}/batches/${batchId}`);
      return response.data as BatchData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

  getBatchByFarm: async (farmId: number) => {
    try {
      const response = await axios.get(`${API_URL}/batches/farm/${farmId}`);
      return response.data as BatchData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },
 
  createBatch: async (batchData: BatchData) => {
    try {
      const response = await axios.post(`${API_URL}/batches`, batchData);
      return response.data as BatchData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      throw new Error('Erro ao criar lote');
    }
  },

  deactivateBatch: async (batchId: string) => {
    try {
      const response = await axios.patch(`${API_URL}/batches/${batchId}/deactivate`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      throw new Error('Erro ao desativar lote');
    }
  },

  activateBatch: async (batchId: string) => {
    try {
      const response = await axios.patch(`${API_URL}/batches/${batchId}/activate`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      throw new Error('Erro ao ativar lote');
    }
  },

  updateBatch: async (batchId: string, batchData: BatchData) => {
    try {
      const response = await axios.put(`${API_URL}/batches/${batchId}`, batchData);
      return response.data as BatchData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      throw new Error('Erro ao atualizar lote');
    }
  },

  deleteBatch: async (batchId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/batches/${batchId}`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      throw new Error('Erro ao excluir lote');
    }
  }
}

export default batchHook;

