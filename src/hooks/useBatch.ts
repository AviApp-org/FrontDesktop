import { BatchData } from '@/@types/BatchData'
import { AviaryData } from '@/@types/AviaryData';
import { CreateAviaryData } from '@/@types/CreateAviaryData';
import aviaryHook from './useAviary';
import { showErrorMessage } from '../utils/errorHandler';
import { toast } from 'react-toastify';
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
  },

  // Operações de Lote com toast (do useBatchManagement)
  getBatchesByFarm: async (farmId: number) => {
    try {
      const batchesData = await batchHook.getBatchByFarm(farmId);
      return batchesData;
    } catch (err) {
      console.error('Erro ao buscar lotes:', err);
      throw new Error('Erro ao carregar lotes');
    }
  },

  createBatchWithToast: async (data: any) => {
    try {
      await batchHook.createBatch({ ...data, farmId: '1' });
      toast.success('Lote criado com sucesso!');
    } catch (error) {
      const message = `Erro ao criar lote: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  updateBatchWithToast: async (batchId: string, data: any) => {
    try {
      await batchHook.updateBatch(batchId, data);
      toast.success('Lote atualizado com sucesso!');
    } catch (error) {
      const message = `Erro ao atualizar lote: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  activateBatchWithToast: async (id: string) => {
    try {
      await batchHook.activateBatch(id);
      toast.success('Lote ativado com sucesso!');
    } catch (error) {
      const message = `Erro ao ativar lote: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  deactivateBatchWithToast: async (id: string) => {
    try {
      await batchHook.deactivateBatch(id);
      toast.success('Lote desativado com sucesso!');
    } catch (error) {
      const message = `Erro ao desativar lote: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  // Operações de Aviário
  getAviariesByBatch: async (batchId: number) => {
    try {
      const aviaries = await aviaryHook.getAviariesByBatch(batchId);
      return aviaries;
    } catch (err) {
      console.error('Erro ao buscar aviários:', err);
      return [];
    }
  },

  createAviary: async (aviaryData: CreateAviaryData) => {
    try {
      const dataToSend = {
        ...aviaryData,
        batchId: Number(aviaryData.batchId),
      };
      await aviaryHook.createAviary(dataToSend);
      toast.success('Aviário criado com sucesso!');
    } catch (error) {
      const message = `Erro ao criar aviário: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  updateAviary: async (aviaryId: number, aviaryData: CreateAviaryData) => {
    try {
      const dataToSend = {
        ...aviaryData,
        batchId: Number(aviaryData.batchId),
      };
      await aviaryHook.updateAviary(aviaryId, dataToSend);
      toast.success('Aviário atualizado com sucesso!');
    } catch (error) {
      const message = `Erro ao atualizar aviário: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
    }
  },

  deleteAviary: async (id: string) => {
    try {
      await aviaryHook.deleteAviary(Number(id));
      toast.success('Aviário deletado com sucesso!');
    } catch (error) {
      const message = `Erro ao deletar aviário: ${showErrorMessage(error)}`;
      toast.error(message);
      throw new Error(message);
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

