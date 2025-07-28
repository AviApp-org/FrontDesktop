import { BatchData } from '@/@types/BatchData'
<<<<<<< HEAD
import { API_URL } from '../config/api';
import axios from 'axios';
import api from '@/config/axios';
=======
import api from '../config/axios';
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7

const batchHook = {

  getBatchByID: async (batchId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/batches/${batchId}`);
=======
      const response = await api.get(`/api/batches/${batchId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as BatchData[];
    } catch (e) {
      console.error('Error fetching batch:', e);
      return [];
    }
  },

  getBatchByFarm: async (farmId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/batches/farm/${farmId}`);
=======
      const response = await api.get(`/api/batches/farm/${farmId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as BatchData[];
    } catch (e) {
      console.error('Error fetching batches by farm:', e);
      return [];
    }
  },
 
  createBatch: async (batchData: BatchData) => {
    try {
<<<<<<< HEAD
      const response = await api.post(`${API_URL}/batches`, batchData);
=======
      const response = await api.post('/api/batches', batchData);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as BatchData;
    } catch (e) {
      console.error('Error creating batch:', e);
      throw new Error('Erro ao criar lote');
    }
  },

  deactivateBatch: async (batchId: string) => {
    try {
<<<<<<< HEAD
      const response = await api.patch(`${API_URL}/batches/${batchId}/deactivate`);
=======
      const response = await api.patch(`/api/batches/${batchId}/deactivate`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data;
    } catch (e) {
      console.error('Error deactivating batch:', e);
      throw new Error('Erro ao desativar lote');
    }
  },

  activateBatch: async (batchId: string) => {
    try {
<<<<<<< HEAD
      const response = await api.patch(`${API_URL}/batches/${batchId}/activate`);
=======
      const response = await api.patch(`/api/batches/${batchId}/activate`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data;
    } catch (e) {
      console.error('Error activating batch:', e);
      throw new Error('Erro ao ativar lote');
    }
  },

  updateBatch: async (batchId: string, batchData: BatchData) => {
    try {
<<<<<<< HEAD
      const response = await api.put(`${API_URL}/batches/${batchId}`, batchData);
=======
      const response = await api.put(`/api/batches/${batchId}`, batchData);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as BatchData;
    } catch (e) {
      console.error('Error updating batch:', e);
      throw new Error('Erro ao atualizar lote');
    }
  },

  deleteBatch: async (batchId: string) => {
    try {
<<<<<<< HEAD
      const response = await api.delete(`${API_URL}/batches/${batchId}`);
=======
      const response = await api.delete(`/api/batches/${batchId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data;
    } catch (e) {
      console.error('Error deleting batch:', e);
      throw new Error('Erro ao excluir lote');
    }
  }
}

export default batchHook;

