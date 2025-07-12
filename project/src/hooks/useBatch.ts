import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BatchData } from '@/@types/BatchData'
import api from '../config/axios';
import { API_ENDPOINTS } from '../config/api';

// ✅ Buscar TODOS os lotes de uma granja
const fetchAllBatches = async (): Promise<BatchData[]> => {
  try {
    const farmId = "1"; // ID da granja
    const response = await api.get(`${API_ENDPOINTS.batches}/farm/${farmId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lotes:', error);
    throw error;
  }
};

// ✅ Buscar UM lote específico por ID
const fetchBatchById = async (id: string): Promise<BatchData> => {
  try {
    const response = await api.get(`${API_ENDPOINTS.batches}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lote:', error);
    throw error;
  }
};

// ✅ Criar novo lote
const postData = async (batch: Omit<BatchData, 'id'>): Promise<BatchData> => {
  try {
    
    if (!batch.name || !batch.startDate || !batch.farmId) {
      throw new Error('Nome, data de início e ID da fazenda são obrigatórios');
    }
    
    if (batch.status && !['ACTIVE', 'COMPLETED', 'CANCELLED'].includes(batch.status)) {
      batch.status = 'ACTIVE';
    }
    
    const formattedBatch = {
      name: batch.name,
      startDate:(batch.startDate),
      status: batch.status || 'ACTIVE',
      farmId: batch.farmId || "1"
    };
    
    
    const response = await api.post(API_ENDPOINTS.batches, formattedBatch);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar lote:', error);
    throw error;
  }
};

// ✅ Ativar lote
const activateBatch = async (id: string): Promise<void> => {
  try {
    await api.patch(`${API_ENDPOINTS.batches}/${id}/activate`);
  } catch (error) {
    console.error('Erro ao ativar lote:', error);
    throw error;
  }
};

// ✅ Desativar lote
const deactivateBatch = async (id: string): Promise<void> => {
  try {
    await api.patch(`${API_ENDPOINTS.batches}/${id}/deactivate`);
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
        startDate: (data.startDate),
      };


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
        startDate: data.startDate ? (data.startDate) : undefined,
      };


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
