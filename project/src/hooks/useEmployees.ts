// src/hooks/useEmployees.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EmployeeData } from '../@types/EmployeeData';
import { employeeService } from '../services/EmployeeService';

export function useEmployees(farmId: number) {
  return useQuery({
    queryKey: ['employees', farmId],
    queryFn: () => employeeService.getAll(farmId),
    enabled: !!farmId,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employee: Omit<EmployeeData, 'id' | 'createdAt'>) => employeeService.create(employee),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['employees', variables.farmId] });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<EmployeeData> }) =>
      employeeService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['employees', variables.data.farmId] });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => employeeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}
