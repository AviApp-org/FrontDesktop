import { BatchData } from '@/@types/BatchData'
import api from '../config/axios';

const batchHook = {

  getBatchByID: async (batchId: number) => {
    try {
      const response = await api.get(`/api/batches/${batchId}`);
      return response.data as BatchData[];
    } catch (e) {
      console.error('Error fetching batch:', e);
      return [];
    }
  },

  getBatchByFarm: async (farmId: number) => {
    try {
      const response = await api.get(`/api/batches/farm/${farmId}`);
      return response.data as BatchData[];
    } catch (e) {
      console.error('Error fetching batches by farm:', e);
      return [];
    }
  },
 
  createBatch: async (batchData: BatchData) => {
    try {
      const response = await api.post('/api/batches', batchData);
      return response.data as BatchData;
    } catch (e) {
      console.error('Error creating batch:', e);
      throw new Error('Erro ao criar lote');
    }
  },

  deactivateBatch: async (batchId: string) => {
    try {
      const response = await api.patch(`/api/batches/${batchId}/deactivate`);
      return response.data;
    } catch (e) {
      console.error('Error deactivating batch:', e);
      throw new Error('Erro ao desativar lote');
    }
  },

  activateBatch: async (batchId: string) => {
    try {
      const response = await api.patch(`/api/batches/${batchId}/activate`);
      return response.data;
    } catch (e) {
      console.error('Error activating batch:', e);
      throw new Error('Erro ao ativar lote');
    }
  },

  updateBatch: async (batchId: string, batchData: BatchData) => {
    try {
      const response = await api.put(`/api/batches/${batchId}`, batchData);
      return response.data as BatchData;
    } catch (e) {
      console.error('Error updating batch:', e);
      throw new Error('Erro ao atualizar lote');
    }
  },

  deleteBatch: async (batchId: string) => {
    try {
      const response = await api.delete(`/api/batches/${batchId}`);
      return response.data;
    } catch (e) {
      console.error('Error deleting batch:', e);
      throw new Error('Erro ao excluir lote');
    }
  }
}

export default batchHook;

