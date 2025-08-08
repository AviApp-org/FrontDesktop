import api from '../config/axios';

export interface EggValueData {
  egg: string;
  value: number;
  batchId: number;
  id?: number;
  timeStamp?: string;
}

const financialHook = {
  saveEggValue: async (eggValue: EggValueData) => {
    try {
      const response = await api.post('/api/egg-value', eggValue);
      return response.data;
    } catch (e) {
      console.error('Erro ao salvar valor do ovo:', e);
      throw new Error('Erro ao salvar valor do ovo!');
    }
  },

  getDailyFinancial: async (batchId: number, date: string) => {
    try {
      const response = await api.get(`/api/financial-details/${batchId}/${date}`);
      return response.data;
    } catch (e) {
      console.error('Erro ao buscar relatório diário:', e);
      throw new Error('Erro ao buscar relatório diário!');
    }
  },

  getWeeklyFinancial: async (batchId: number, startDate: string) => {
    try {
      const response = await api.get(`/api/financial-details/${batchId}/weekly/${startDate}`);
      return response.data;
    } catch (e) {
      console.error('Erro ao buscar relatório semanal:', e);
      throw new Error('Erro ao buscar relatório semanal!');
    }
  },

  getMonthlyFinancial: async (batchId: number, yearMonth: string) => {
    try {
      const response = await api.get(`/api/financial-details/${batchId}/monthly/${yearMonth}`);
      return response.data;
    } catch (e) {
      console.error('Erro ao buscar relatório mensal:', e);
      throw new Error('Erro ao buscar relatório mensal!');
    }
  },

getLastEggValue: async (batchId: number) => {
  try {
    const response = await api.get(`/api/egg-value/last/batch/${batchId}`);
    return response.data as EggValueData;
  } catch (e) {
    console.error('Erro ao buscar último valor do ovo:', e);
    throw new Error('Erro ao buscar último valor do ovo!');
  }
},

};

export default financialHook;