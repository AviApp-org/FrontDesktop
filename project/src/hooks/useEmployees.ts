import { API_URL } from '../config/api';
import axios from 'axios';
import { EmployeeData } from '@/@types/EmployeeData';


const employeeHook = {

  getEmployee: async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      return response.data as EmployeeData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

getEmployeeByID: async (employeeId: number) => {
    try {
      const response = await axios.get(`${API_URL}/employees/${employeeId}`);
      return response.data as EmployeeData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },
  createEmployee: async (employee: EmployeeData) => {
    try {
      const response = await axios.post(`${API_URL}/employees`, employee);
      return response.data as EmployeeData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      throw new Error('Erro ao criar funcionário');
    }
  },
  updateEmployee: async (employeeId: number, employee: EmployeeData) => {
    try {
      const response = await axios.put(`${API_URL}/employees/${employeeId}`, employee);
      return response.data as EmployeeData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      throw new Error('Erro ao atualizar funcionário');
    }
  },

  deleteEmployee: async (employeeId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/employees/${employeeId}`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      throw new Error('Erro ao excluir funcionário');
    }
  }
};
export default employeeHook;
