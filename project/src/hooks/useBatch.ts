import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BatchData } from '@/@types/BatchData'
import api from '../config/axios';
import { API_ENDPOINTS } from '../config/api';
import { AxiosError } from 'axios';
import { formatDateToDDMMYYYY } from '../utils/formatDate';

// Funções para operações CRUD usando a API real
const fetchAllBatches = async (): Promise<BatchData[]> => {
  try {
    console.log('Buscando todos os lotes da granja');
    const response = await api.get(API_ENDPOINTS.batches);
    console.log('Lotes encontrados:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lotes:', error);
    throw error;
  }
};

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

const postData = async (batch: Omit<BatchData, 'id'>): Promise<BatchData> => {
  try {
    console.log('Criando novo lote:', batch);
    
    // Validar dados antes de enviar
    if (!batch.name || !batch.startDate || !batch.farmId) {
      throw new Error('Nome, data de início e ID da fazenda são obrigatórios');
    }
    
    // Garantir que o status seja um dos valores permitidos
    if (batch.status && !['ACTIVE', 'COMPLETED', 'CANCELLED'].includes(batch.status)) {
      batch.status = 'ACTIVE'; // Valor padrão
    }
    
    // Formatar datas para o formato esperado pelo backend (DD/MM/YYYY)
    const formattedBatch = {
      name: batch.name,
      startDate: formatDateToDDMMYYYY(batch.startDate),
      status: batch.status || 'ACTIVE',
      farmId: batch.farmId || "1" // Garantir que sempre tenha um farmId
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

// Hooks para gerenciar os dados
export const useBatches = () => {
  return useQuery({
    queryKey: ['batches'],
    queryFn: fetchAllBatches,
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 30, // 30 minutos
  });
};

export const useBatchById = (id: string) => {
  return useQuery({
    queryKey: ['batch', id],
    queryFn: () => fetchBatchById(id),
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });
};

export function usePostBatchData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<BatchData, 'id'>) => {
      const formattedBatch = {
        ...data,
        startDate: formatDateToDDMMYYYY(data.startDate),
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

export function useUpdateBatchData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Omit<BatchData, 'id'>> }) => {
      const formattedData = {
        ...data,
        startDate: data.startDate ? formatDateToDDMMYYYY(data.startDate) : undefined,
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