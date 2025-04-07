import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Batch } from '../types/interfaces/batch';
import api from '../config/axios';
import { API_ENDPOINTS } from '../config/api';
import { AxiosError } from 'axios';
import { formatDateToDDMMYYYY } from '../utils/formatDate';

// Funções para operações CRUD usando a API real
const fetchBatchById = async (id: number): Promise<Batch> => {
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

const postData = async (batch: Omit<Batch, 'id'>): Promise<Batch> => {
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
      farmId: batch.farmId
    };
    
    console.log('Dados formatados para envio:', formattedBatch);
    
    const response = await api.post(API_ENDPOINTS.batches, formattedBatch);
    console.log('Lote criado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar lote:', error);
    
    // Tratamento específico para erro 400
    if (error instanceof AxiosError && error.response?.status === 400) {
      // Tentar extrair a mensagem de erro do backend
      let errorMessage = 'Dados inválidos. Verifique os campos e tente novamente.';
      
      if (error.response.data) {
        // Se o backend retornar uma mensagem de erro
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (typeof error.response.data === 'object') {
          // Tentar extrair mensagens de erro de validação
          const validationErrors = Object.entries(error.response.data)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          
          if (validationErrors) {
            errorMessage = `Erro de validação: ${validationErrors}`;
          }
        }
      }
      
      console.error('Detalhes do erro 400:', error.response.data);
      throw new Error(errorMessage);
    }
    
    throw error;
  }
};

const activateBatch = async (id: number): Promise<void> => {
  try {
    console.log('Ativando lote:', id);
    await api.patch(`${API_ENDPOINTS.batches}/${id}/activate`);
    console.log('Lote ativado com sucesso');
  } catch (error) {
    console.error('Erro ao ativar lote:', error);
    throw error;
  }
};

const deactivateBatch = async (id: number): Promise<void> => {
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
export const useBatchById = (id: number) => {
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
    mutationFn: async (data: Omit<Batch, 'id'>) => {
      const formattedBatch = {
        ...data,
        startDate: formatDateToDDMMYYYY(data.startDate),
      };

      console.log('Dados formatados para envio:', formattedBatch);

      const response = await api.post<Batch>(API_ENDPOINTS.batches, formattedBatch);
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
    mutationFn: async (id: number) => {
      const response = await api.patch<Batch>(`${API_ENDPOINTS.batches}/${id}/activate`);
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
    mutationFn: async (id: number) => {
      const response = await api.patch<Batch>(`${API_ENDPOINTS.batches}/${id}/deactivate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
    },
  });
}