import api from '../config/axios';
import { EmployeeData } from '@/@types/EmployeeData';
import api from '@/config/axios';

const employeeHook = {

  getEmployee: async () => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/employees`);
=======
      const response = await api.get('/api/employees');
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as EmployeeData[];
    } catch (e) {
      console.error('Error getting employees:', e);
      return [];
    }
  },

  getEmployeeByID: async (employeeId: number) => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/employees/${employeeId}`);
=======
      const response = await api.get(`/api/employees/${employeeId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as EmployeeData;
    } catch (e) {
      console.error('Error getting employee by ID:', e);
      return null;
    }
  },

  createEmployee: async (employee: EmployeeData) => {
    try {
      console.log('🚀 Enviando dados para criar funcionário:', employee);
      
<<<<<<< HEAD
      const response = await api.post(`${API_URL}/employees`, employee);
=======
      const response = await api.post('/api/employees', employee);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
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
      
<<<<<<< HEAD
      const response = await api.put(`${API_URL}/employees/${employeeId}`, employee);
=======
      const response = await api.put(`/api/employees/${employeeId}`, employee);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
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
      
<<<<<<< HEAD
      const response = await api.delete(`${API_URL}/employees/${employeeId}`);
=======
      const response = await api.delete(`/api/employees/${employeeId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      console.log('✅ Funcionário deletado com sucesso');
      return response.data;
    } catch (e) {
      console.error('Error deleting employee:', e);
      throw new Error('Erro ao excluir funcionário');
    }
  }
};

export default employeeHook;
