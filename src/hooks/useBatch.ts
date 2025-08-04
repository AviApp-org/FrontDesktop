import { BatchData } from '@/@types/BatchData'
import { AviaryData } from '@/@types/AviaryData';
import { CreateAviaryData } from '@/@types/CreateAviaryData';
import aviaryHook from './useAviary';
import api from '../config/axios';

const batchHook = {

  getBatchByID: async (batchId: number) => {
    try {
      const response = await api.get(`/api/batches/${batchId}`);
      return response.data as BatchData[];
    } catch (e) {
      console.error('Error fetching batch:', e);
      throw new Error('Erro ao buscar lote');
    }
  },

  getBatchByFarm: async (farmId: number) => {
    try {
      const response = await api.get(`/api/batches/farm/${farmId}`);
      return response.data as BatchData[];
    } catch (e) {
      console.error('Error fetching batches by farm:', e);
      throw new Error('Erro ao buscar lotes da fazenda');
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
  },

  // Operações de Aviário
  getAviariesByBatch: async (batchId: number) => {
    try {
      const aviaries = await aviaryHook.getAviariesByBatch(batchId);
      return aviaries;
    } catch (err) {
      console.error('Erro ao buscar aviários:', err);
      throw new Error('Erro ao buscar aviários');
    }
  },

  createAviary: async (aviaryData: CreateAviaryData) => {
    try {
      const dataToSend = {
        ...aviaryData,
        batchId: Number(aviaryData.batchId),
      };
      await aviaryHook.createAviary(dataToSend);
    } catch (error) {
      throw new Error('Erro ao criar aviário');
    }
  },

  updateAviary: async (aviaryId: number, aviaryData: CreateAviaryData) => {
    try {
      const dataToSend = {
        ...aviaryData,
        batchId: Number(aviaryData.batchId),
      };
      await aviaryHook.updateAviary(aviaryId, dataToSend);
    } catch (error) {
      throw new Error('Erro ao atualizar aviário');
    }
  },

  deleteAviary: async (id: string) => {
    try {
      await aviaryHook.deleteAviary(Number(id));
    } catch (error) {
      throw new Error('Erro ao deletar aviário');
    }
  },

  // Validação
  validateBatchData: (data: any) => {
    const errors: Record<string, string> = {};
    if (!data.name?.trim()) errors.name = 'Nome do lote é obrigatório';
    if (!data.startDate) errors.startDate = 'Data de início é obrigatória';
    return Object.keys(errors).length === 0;
  }
}

export default batchHook;

