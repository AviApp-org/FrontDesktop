import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AviaryData } from '../@types/AviaryData';
import { aviaryService } from '../services/aviaryService';

export function useAviaries(batchId: number) {
  return useQuery({
    queryKey: ['aviaries', batchId],
    queryFn: () => aviaryService.getAll(batchId),
    enabled: !!batchId,
  });
}

export function useCreateAviary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (aviary: Omit<AviaryData, 'id'>) => aviaryService.create(aviary),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aviaries', variables.batchId] });
    },
  });
}

export function useUpdateAviary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AviaryData> }) => 
      aviaryService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aviaries', variables.data.batchId] });
    },
  });
}

export function useDeleteAviary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => aviaryService.delete(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aviaries'] });
    },
  });
}
