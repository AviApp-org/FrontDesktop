import api from '../config/axios';
import { EmployeeData } from '@/@types/EmployeeData';

const employeeHook = {
  getEmployee: async () => {
    try {
      const response = await api.get('/api/employees');
      return response.data as EmployeeData[];
    } catch (e) {
      console.error('Error getting employees:', e);
      return [];
    }
  },

  getEmployeeByID: async (employeeId: number) => {
    try {
      const response = await api.get(`/api/employees/${employeeId}`);
      return response.data as EmployeeData;
    } catch (e) {
      console.error('Error getting employee by ID:', e);
      return null;
    }
  },

  getEmployeeByFarmID: async (farmId: number) => {
    try {
      const response = await api.get(`/api/employees/farm/${farmId}`);
      return response.data as EmployeeData[];
    } catch (e) {
      console.error('Error getting employee by ID:', e);
      return [];
    }
  },

  createEmployee: async (employee: EmployeeData) => {
    try {
      console.log('🚀 Enviando dados para criar funcionário:', employee);

      const response = await api.post('/api/employees', employee);
      console.log('✅ Funcionário criado com sucesso:', response.data);
      return response.data as EmployeeData;
    } catch (e) {
      console.error('Error creating employee:', e);
      throw new Error('Erro ao criar funcionário');
    }
  },

  updateEmployee: async (employeeId: number, employee: EmployeeData) => {
    try {
      console.log('🔄 Atualizando funcionário:', { employeeId, employee });

      const response = await api.put(`/api/employees/${employeeId}`, employee);
      console.log('✅ Funcionário atualizado com sucesso:', response.data);
      return response.data as EmployeeData;
    } catch (e) {
      console.error('Error updating employee:', e);
      throw new Error('Erro ao atualizar funcionário');
    }
  },

  deleteEmployee: async (employeeId: number) => {
    try {
      console.log('🗑️ Deletando funcionário:', employeeId);

      const response = await api.delete(`/api/employees/${employeeId}`);
      console.log('✅ Funcionário deletado com sucesso');
      return response.data;
    } catch (e) {
      console.error('Error deleting employee:', e);
      throw new Error('Erro ao excluir funcionário');
    }
  },
};

export default employeeHook;
