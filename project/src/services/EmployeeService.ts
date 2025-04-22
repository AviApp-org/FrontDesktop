// src/services/employeeService.ts
import api from '../config/axios';
import { EmployeeData } from '../@types/EmployeeData';

export const employeeService = {
  getAll: async (farmId: string): Promise<EmployeeData[]> => {
    const { data } = await api.get(`/employees?farmId=${farmId}`);
    return data;
  },
  create: async (employee: Omit<EmployeeData, 'id' | 'createdAt'>): Promise<EmployeeData> => {
    const { data } = await api.post('/employees', employee);
    return data;
  },
  update: async (id: number, employee: Partial<EmployeeData>): Promise<EmployeeData> => {
    const { data } = await api.put(`/employees/${id}`, employee);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },
};
