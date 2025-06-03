import api from '../config/axios';
import { API_ENDPOINTS } from '../config/api';
import { DailyReportData } from '../@types/DailyReportData';
import { WeeklyReportData } from '../@types/WeeklyReportData';

export interface ReportFilters {
  startDate: string;
  endDate: string;
  batchId?: number;
  aviaryId?: number;
}

export const reportService = {
  // Buscar relatório diário por ID
  async getDailyReportById(reportId: number): Promise<DailyReportData> {
    console.log(`🔍 Buscando relatório diário: ${API_ENDPOINTS.reports.daily}/${reportId}`);
    const response = await api.get(`${API_ENDPOINTS.reports.daily}/${reportId}`);
    return response.data;
  },

  // Buscar relatórios diários (simulando busca por período)
  async getDailyReports(filters: ReportFilters): Promise<DailyReportData[]> {
    try {
      // Como sua API busca por ID específico, vamos simular uma busca
      // Você pode ajustar isso conforme sua necessidade
      console.log('🔍 Buscando relatórios diários com filtros:', filters);
      
      // Por enquanto, vamos buscar um relatório específico (ID 2)
      // Você pode implementar uma lógica para buscar múltiplos IDs
      const reportId = 2; // ou usar alguma lógica baseada nos filtros
      const report = await this.getDailyReportById(reportId);
      
      return [report]; // Retorna como array
    } catch (error) {
      console.error('❌ Erro ao buscar relatórios diários:', error);
      return [];
    }
  },

  // Buscar relatório semanal
  async getWeeklyReport(batchId: number, date: string): Promise<WeeklyReportData> {
    console.log(`🔍 Buscando relatório semanal: ${API_ENDPOINTS.reports.weekly}/${batchId}/${date}`);
    const response = await api.get(`${API_ENDPOINTS.reports.weekly}/${batchId}/${date}`);
    return response.data;
  },

  // Buscar relatórios semanais (adaptado para sua API)
  async getWeeklyReports(filters: Omit<ReportFilters, 'aviaryId'>): Promise<WeeklyReportData[]> {
    try {
      console.log('🔍 Buscando relatórios semanais com filtros:', filters);
      
      // Usar o batchId dos filtros ou um padrão
      const batchId = filters.batchId || 1;
      const date = filters.startDate; // Usar a data de início como referência
      
      const report = await this.getWeeklyReport(batchId, date);
      return [report]; // Retorna como array
    } catch (error) {
      console.error('❌ Erro ao buscar relatórios semanais:', error);
      return [];
    }
  },

  // Exportar relatório (placeholder - implementar conforme necessário)
  async exportReport(type: 'daily' | 'weekly', format: 'pdf' | 'excel', reportId: string): Promise<Blob> {
    // Implementar quando tiver endpoint de exportação
    throw new Error('Exportação ainda não implementada no backend');
  }
};
