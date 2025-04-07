import { Batch } from "../types/interfaces/batch";
import axios, { AxiosPromise } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../config/api";

// Função para buscar todos os lotes (GET)
const fetchData = async (): AxiosPromise<Batch[]> => {
  const response = axios.get(API_ENDPOINTS.batches);
  return response;
};

// Função para criar um novo lote (POST)
const postData = async (newBatch: Omit<Batch, 'id'>): AxiosPromise<Batch> => {
  const response = axios.post(API_ENDPOINTS.batches, newBatch);
  return response;
};

// Função para atualizar um lote (PUT)
const updateData = async (updatedBatch: Batch): AxiosPromise<Batch> => {
  const response = await axios.put(`${API_ENDPOINTS.batches}/${updatedBatch.id}`, updatedBatch);
  return response;
};

// Função para deletar um lote (DELETE)
const deleteData = async (batchId: number): AxiosPromise<void> => {
  const response = await axios.delete(`${API_ENDPOINTS.batches}/${batchId}`);
  return response;
};

// Hook para buscar dados de lotes
export function useBatchData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['Batch-data'],
    retry: 2,
  });
  return {
    ...query,
    data: query.data?.data,
  };
}

// Hook para criar um novo lote
export function usePostBatchData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      // Atualiza a lista de lotes após a criação de um novo
      queryClient.invalidateQueries({ queryKey: ['Batch-data'] });
    },
  });
}

// Hook para atualizar um lote
export function useUpdateBatchData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Batch-data'] });
    },
  });
}

// Hook para deletar um lote
export function useDeleteBatchData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Batch-data'] });
    },
  });
}