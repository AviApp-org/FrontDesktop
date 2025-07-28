import { API_URL } from '../config/api';
import axios from 'axios';
import { EmployeeData } from '@/@types/EmployeeData';
import api from '@/config/axios';

const employeeHook = {

  getEmployee: async () => {
    try {
      const response = await api.get(`${API_URL}/employees`);
      return response.data as EmployeeData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response?.data);
        console.error('Axios error status:', e.response?.status);
      }
      return [];
    }
  },

  getEmployeeByID: async (employeeId: number) => {
    try {
      const response = await api.get(`${API_URL}/employees/${employeeId}`);
      return response.data as EmployeeData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response?.data);
        console.error('Axios error status:', e.response?.status);
      }
      return null;
    }
  },

  createEmployee: async (employee: EmployeeData) => {
    try {
      console.log('🚀 Enviando dados para criar funcionário:', employee);
      console.log('🌐 URL da requisição:', `${API_URL}/employees`);
      
      const response = await api.post(`${API_URL}/employees`, employee);
      console.log('✅ Funcionário criado com sucesso:', response.data);
      return response.data as EmployeeData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('❌ Erro ao criar funcionário:');
        console.error('- Message:', e.message);
        console.error('- Status:', e.response?.status);
        console.error('- Data:', e.response?.data);
        console.error('- Headers:', e.response?.headers);
        console.error('- Config:', e.config);
        
        // Tentar extrair mensagem de erro mais específica
        const errorMessage = e.response?.data?.message || 
                           e.response?.data?.error || 
                           e.response?.data || 
                           e.message;
        
        throw new Error(`Erro ao criar funcionário: ${errorMessage}`);
      }
      console.error('❌ Erro não-axios:', e);
      throw new Error('Erro ao criar funcionário');
    }
  },

  updateEmployee: async (employeeId: number, employee: EmployeeData) => {
    try {
      console.log('🔄 Atualizando funcionário:', { employeeId, employee });
      
      const response = await api.put(`${API_URL}/employees/${employeeId}`, employee);
      console.log('✅ Funcionário atualizado com sucesso:', response.data);
      return response.data as EmployeeData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('❌ Erro ao atualizar funcionário:');
        console.error('- Message:', e.message);
        console.error('- Status:', e.response?.status);
        console.error('- Data:', e.response?.data);
        
        const errorMessage = e.response?.data?.message || 
                           e.response?.data?.error || 
                           e.response?.data || 
                           e.message;
        
        throw new Error(`Erro ao atualizar funcionário: ${errorMessage}`);
      }
      throw new Error('Erro ao atualizar funcionário');
    }
  },

  deleteEmployee: async (employeeId: number) => {
    try {
      console.log('🗑️ Deletando funcionário:', employeeId);
      
      const response = await api.delete(`${API_URL}/employees/${employeeId}`);
      console.log('✅ Funcionário deletado com sucesso');
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('❌ Erro ao deletar funcionário:');
        console.error('- Message:', e.message);
        console.error('- Status:', e.response?.status);
        console.error('- Data:', e.response?.data);
        
        const errorMessage = e.response?.data?.message || 
                           e.response?.data?.error || 
                           e.response?.data || 
                           e.message;
        
        throw new Error(`Erro ao excluir funcionário: ${errorMessage}`);
      }
      throw new Error('Erro ao excluir funcionário');
    }
  }
};

export default employeeHook;
