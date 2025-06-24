import api from '../config/axios';
import { DailyReportData } from '../@types/DailyReportData';
import { WeeklyReportData } from '../@types/WeeklyReportData';

// Função para converter data de YYYY-MM-DD para DD-MM-YYYY (formato que o backend aceita)
const formatDateToBackend = (dateString: string): string => {
  if (!dateString) return '';
  
  // Se já está no formato DD-MM-YYYY, retorna como está
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
    return dateString;
  }
  
  // Converte de YYYY-MM-DD para DD-MM-YYYY
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const reportService = {
  async getDailyReportById(reportId: number): Promise<DailyReportData> {
    console.log('🔍 Buscando relatório diário por ID:', reportId);
    const response = await api.get(`/daily-report/${reportId}`);
    return response.data;
  },

  async getDailyReport(batchId: number, date: string): Promise<DailyReportData> {
    console.log('🔍 Buscando relatório diário:', { batchId, date });
    
    try {
      // Formatar a data para o formato que o backend aceita (DD-MM-YYYY)
      const formattedDate = formatDateToBackend(date);
      
      console.log('📅 Data formatada:', {
        original: date,
        formatted: formattedDate,
        batchId: batchId
      });

      // Usar o formato que funcionou: /daily-report/{batchId}/{date}
      const endpoint = `/daily-report/${batchId}/${formattedDate}`;
      console.log('🔍 Endpoint:', endpoint);
      
      const response = await api.get(endpoint);
      return response.data;
      
    } catch (error) {
      console.error('❌ Erro ao buscar relatório diário:', error);
      throw error;
    }
  },

  async getWeeklyReport(batchId: number, date: string): Promise<WeeklyReportData> {
    console.log('🔍 Buscando relatório semanal:', { batchId, date });
    
    try {
      // Formatar a data para o formato que o backend aceita (DD-MM-YYYY)
      const formattedDate = formatDateToBackend(date);
      
      console.log('📅 Data formatada para semanal:', {
        original: date,
        formatted: formattedDate,
        batchId: batchId
      });

      // Usar o mesmo padrão do diário
      const endpoint = `/weekly-report/${batchId}/${formattedDate}`;
      console.log('🔍 Endpoint semanal:', endpoint);
      
      const response = await api.get(endpoint);
      return response.data;
      
    } catch (error) {
      console.error('❌ Erro ao buscar relatório semanal:', error);
      throw error;
    }
  },

  async getMonthlyReport(batchId: number, date: string): Promise<WeeklyReportData> {
    console.log('🔍 Buscando relatório mensal:', { batchId, date });
    
    try {
      // Formatar a data para o formato que o backend aceita (DD-MM-YYYY)
      const formattedDate = formatDateToBackend(date);
      
      console.log('📅 Data formatada para mensal:', {
        original: date,
        formatted: formattedDate,
        batchId: batchId
      });

      // Usar o mesmo padrão do diário
      const endpoint = `/monthly-report/${batchId}/${formattedDate}`;
      console.log('🔍 Endpoint mensal:', endpoint);
      
      const response = await api.get(endpoint);
      return response.data;
      
    } catch (error) {
      console.error('❌ Erro ao buscar relatório mensal:', error);
      throw error;
    }
  }
};
