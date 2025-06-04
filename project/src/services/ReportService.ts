import api from '../config/axios';
import { DailyReportData } from '../@types/DailyReportData';
import { WeeklyReportData } from '../@types/WeeklyReportData';
import { ReportFilters } from '../@types/ReportFilters';

// Função para converter data de YYYY-MM-DD para DD-MM-YYYY (formato que o backend aceita)
const formatDateToBackend = (dateString: string): string => {
  if (!dateString) return '';
  
  console.log('📅 Formatando data:', dateString);
  
  // Se já está no formato DD-MM-YYYY, retorna como está
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
    console.log('📅 Data já está no formato DD-MM-YYYY:', dateString);
    return dateString;
  }
  
  // Converte de YYYY-MM-DD para DD-MM-YYYY
  const [year, month, day] = dateString.split('-');
  const formattedDate = `${day}-${month}-${year}`;
  console.log('📅 Data convertida de', dateString, 'para', formattedDate);
  return formattedDate;
};

export const reportService = {
  async getDailyReportById(reportId: number): Promise<DailyReportData> {
    console.log('🔍 Buscando relatório diário por ID:', reportId);
    const response = await api.get(`/api/daily-report/${reportId}`);
    return response.data;
  },

  async getDailyReports(filters: ReportFilters): Promise<DailyReportData[]> {
    console.log('🔍 Buscando relatórios diários com filtros:', filters);
    
    try {
      // Formatar a data para o formato que o backend aceita (DD-MM-YYYY)
      const formattedDate = formatDateToBackend(filters.startDate);
      
      console.log('📅 Dados para requisição:', {
        batchId: filters.batchId,
        originalDate: filters.startDate,
        formattedDate: formattedDate,
        batchIdType: typeof filters.batchId
      });

      // URL exata conforme o controller: /api/daily-report/{batchId}/{localDate}
      const endpoint = `/api/daily-report/${filters.batchId}/${formattedDate}`;
      console.log('🔍 Endpoint completo:', endpoint);
      console.log('🌐 URL completa será:', `http://localhost:8080${endpoint}`);
      
      const response = await api.get(endpoint);
      console.log('✅ Resposta recebida:', response.data);
      return [response.data];
      
    } catch (error: any) {
      console.error('❌ Erro detalhado ao buscar relatórios diários:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      });
      throw error;
    }
  },

  async getWeeklyReport(batchId: number, date: string): Promise<WeeklyReportData> {
    console.log('🔍 Buscando relatório semanal:', { batchId, date });
    
    try {
      // Formatar a data para o formato que o backend aceita
      const formattedDate = formatDateToBackend(date);
      console.log('📅 Data formatada para semanal:', { original: date, formatted: formattedDate });
      
      // URL conforme o controller: /api/daily-report/week/{batchId}/{localDate}
      const endpoint = `/api/daily-report/week/${batchId}/${formattedDate}`;
      console.log('🔍 Endpoint semanal completo:', endpoint);
      console.log('🌐 URL completa será:', `http://localhost:8080${endpoint}`);
      
      const response = await api.get(endpoint);
      console.log('✅ Resposta semanal recebida:', response.data);
      return response.data;
      
    } catch (error: any) {
      console.error('❌ Erro detalhado ao buscar relatório semanal:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      });
      throw error;
    }
  },

  async getMonthlyReport(batchId: number, date: string): Promise<any> {
    console.log('🔍 Buscando relatório mensal:', { batchId, date });
    
    try {
      const formattedDate = formatDateToBackend(date);
      const endpoint = `/api/daily-report/month/${batchId}/${formattedDate}`;
      console.log('🔍 Endpoint mensal completo:', endpoint);
      
      const response = await api.get(endpoint);
      return response.data;
      
    } catch (error: any) {
      console.error('❌ Erro ao buscar relatório mensal:', error);
      throw error;
    }
  }
};
