// src/services/employeeService.ts
import api from '../config/axios';
import { EmployeeData } from '../@types/EmployeeData';

export const employeeService = {
  getAll: async (farmId: number): Promise<EmployeeData[]> => {
    const { data } = await api.get(`/api/employees?farmId=${farmId}`);
    return data;
  },

  getById: async (id: number): Promise<EmployeeData> => {
    const { data } = await api.get(`/api/employees/${id}`);
    return data;
  },

  create: async (employee: Omit<EmployeeData, 'id' | 'createdAt'>): Promise<EmployeeData> => {
    const { data } = await api.post('/api/employees', employee);
    return data;
  },

  update: async (id: number, employee: Partial<EmployeeData>): Promise<EmployeeData> => {
    const { data } = await api.put(`/api/employees/${id}`, employee);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/employees/${id}`);
  },
};
