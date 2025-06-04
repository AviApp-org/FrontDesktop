import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BatchData } from '@/@types/BatchData'
import api from '../config/axios';
import { API_ENDPOINTS } from '../config/api';
import { AxiosError } from 'axios';
import { formatDateForBackend } from '../utils/formatDate';

// ✅ Buscar TODOS os lotes de uma granja
const fetchAllBatches = async (): Promise<BatchData[]> => {
  try {
    console.log('Buscando todos os lotes da granja');
    const farmId = "1"; // ID da granja
    const response = await api.get(`${API_ENDPOINTS.batches}/farm/${farmId}`);
    console.log('Lotes encontrados:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lotes:', error);
    throw error;
  }
};

// ✅ Buscar UM lote específico por ID
const fetchBatchById = async (id: string): Promise<BatchData> => {
  try {
    console.log('Buscando lote por ID:', id);
    const response = await api.get(`${API_ENDPOINTS.batches}/${id}`);
    console.log('Lote encontrado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lote:', error);
    throw error;
  }
};

// ✅ Criar novo lote
const postData = async (batch: Omit<BatchData, 'id'>): Promise<BatchData> => {
  try {
    console.log('Criando novo lote:', batch);
    
    if (!batch.name || !batch.startDate || !batch.farmId) {
      throw new Error('Nome, data de início e ID da fazenda são obrigatórios');
    }
    
    if (batch.status && !['ACTIVE', 'COMPLETED', 'CANCELLED'].includes(batch.status)) {
      batch.status = 'ACTIVE';
    }
    
    const formattedBatch = {
      name: batch.name,
      startDate: formatDateForBackend(batch.startDate),
      status: batch.status || 'ACTIVE',
      farmId: batch.farmId || "1"
    };
    
    console.log('Dados formatados para envio:', formattedBatch);
    
    const response = await api.post(API_ENDPOINTS.batches, formattedBatch);
    console.log('Lote criado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar lote:', error);
    throw error;
  }
};

// ✅ Ativar lote
const activateBatch = async (id: string): Promise<void> => {
  try {
    console.log('Ativando lote:', id);
    await api.patch(`${API_ENDPOINTS.batches}/${id}/activate`);
    console.log('Lote ativado com sucesso');
  } catch (error) {
    console.error('Erro ao ativar lote:', error);
    throw error;
  }
};

// ✅ Desativar lote
const deactivateBatch = async (id: string): Promise<void> => {
  try {
    console.log('Desativando lote:', id);
    await api.patch(`${API_ENDPOINTS.batches}/${id}/deactivate`);
    console.log('Lote desativado com sucesso');
  } catch (error) {
    console.error('Erro ao desativar lote:', error);
    throw error;
  }
};

// ✅ Hook para buscar TODOS os lotes
export const useBatches = () => {
  return useQuery({
    queryKey: ['batches'],
    queryFn: fetchAllBatches,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// ✅ Hook para buscar UM lote por ID
export const useBatchById = (id: string) => {
  return useQuery({
    queryKey: ['batch', id],
    queryFn: () => fetchBatchById(id),
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });
};

// ✅ Hook para criar lote
export function usePostBatchData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<BatchData, 'id'>) => {
      const formattedBatch = {
        ...data,
        startDate: formatDateForBackend(data.startDate),
      };

      console.log('Dados formatados para envio:', formattedBatch);

      const response = await api.post<BatchData>(API_ENDPOINTS.batches, formattedBatch);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
    },
  });
}

// ✅ Hook para atualizar lote
export function useUpdateBatchData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Omit<BatchData, 'id'>> }) => {
      const formattedData = {
        ...data,
        startDate: data.startDate ? formatDateForBackend(data.startDate) : undefined,
      };

      console.log('Dados formatados para atualização:', formattedData);

      const response = await api.put<BatchData>(`${API_ENDPOINTS.batches}/${id}`, formattedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
    },
  });
}

// ✅ Hook para ativar lote
export function useActivateBatchData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch(`${API_ENDPOINTS.batches}/${id}/activate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
    },
  });
}

// ✅ Hook para desativar lote
export function useDeactivateBatchData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch(`${API_ENDPOINTS.batches}/${id}/deactivate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
    },
  });
}
