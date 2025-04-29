import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AviaryData } from '../@types/AviaryData';
import { aviaryService } from '../services/aviaryService';

export const useAviaries = (batchId: string) => {
  return useQuery({
    queryKey: ['aviaries', batchId],
    queryFn: () => aviaryService.getAll(batchId),
    enabled: !!batchId
  });
};

export const useAviary = (id: string) => {
  return useQuery({
    queryKey: ['aviary', id],
    queryFn: () => aviaryService.getById(id)
  });
};

export const useCreateAviary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (aviary: Omit<AviaryData, 'id'>) => aviaryService.create(aviary),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aviaries', variables.batchId] });
    }
  });
};

export const useUpdateAviary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AviaryData> }) => 
      aviaryService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['aviary', data.id] });
      queryClient.invalidateQueries({ queryKey: ['aviaries', data.batchId] });
    }
  });
};

export const useDeleteAviary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => aviaryService.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['aviary', id] });
    }
  });
};
