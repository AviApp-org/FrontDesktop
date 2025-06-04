import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Plugin necessário
import { DailyReportData } from '../@types/DailyReportData';
import { WeeklyReportData } from '../@types/WeeklyReportData';
import { reportService } from '../services/ReportService';
import { useBatches } from './useBatch';
import { useAviaries } from './useAviary';

// Ativar o plugin do dayjs
dayjs.extend(isSameOrBefore);

export type ReportType = 'daily' | 'weekly';

export interface ReportFiltersState {
  type: ReportType;
  startDate: string;
  endDate: string;
  batchId: number;
  aviaryId?: number;
}

export const useReportsManagement = () => {
  // Estados
  const [filters, setFilters] = useState<ReportFiltersState>({
    type: 'daily',
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    batchId: 1,
  });

  const [dailyReports, setDailyReports] = useState<DailyReportData[]>([]);
  const [weeklyReports, setWeeklyReports] = useState<WeeklyReportData[]>([]);
  const [selectedReport, setSelectedReport] = useState<DailyReportData | WeeklyReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hooks para buscar dados
  const { data: batches = [], isLoading: isLoadingBatches } = useBatches();
  const { data: aviaries = [], isLoading: isLoadingAviaries } = useAviaries(filters.batchId?.toString() || '1');

  // Buscar relatórios diários
  const fetchDailyReports = useCallback(async () => {
    if (!filters.batchId || !filters.startDate) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log(`🔍 Buscando relatórios diários: batchId=${filters.batchId}, período=${filters.startDate} até ${filters.endDate}`);
      
      // Usar o método getDailyReports da sua service
      const reportFilters = {
        batchId: filters.batchId,
        startDate: filters.startDate,
        endDate: filters.endDate,
        aviaryId: filters.aviaryId
      };

      const reports = await reportService.getDailyReports(reportFilters);
      setDailyReports(reports);
      console.log(`✅ ${reports.length} relatórios diários carregados:`, reports);
      
    } catch (error) {
      console.error('❌ Erro ao buscar relatórios diários:', error);
      setError('Erro ao carregar relatórios diários. Verifique se existem dados para o período selecionado.');
      setDailyReports([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters.batchId, filters.startDate, filters.endDate, filters.aviaryId]);

  // Buscar relatórios semanais
  const fetchWeeklyReports = useCallback(async () => {
    if (!filters.batchId || !filters.startDate) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log(`🔍 Buscando relatórios semanais: batchId=${filters.batchId}, startDate=${filters.startDate}`);
      
      // Usar o método getWeeklyReport da sua service
      const report = await reportService.getWeeklyReport(filters.batchId, filters.startDate);
      setWeeklyReports([report]);
      console.log('✅ Relatório semanal carregado:', report);
      
    } catch (error) {
      console.error('❌ Erro ao buscar relatório semanal:', error);
      setError('Erro ao carregar relatório semanal. Verifique se existem dados para o período selecionado.');
      setWeeklyReports([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters.batchId, filters.startDate]);

  // Buscar relatórios baseado no tipo
  const fetchReports = useCallback(() => {
    if (filters.type === 'daily') {
      setWeeklyReports([]); // Limpar relatórios semanais
      fetchDailyReports();
    } else {
      setDailyReports([]); // Limpar relatórios diários
      fetchWeeklyReports();
    }
  }, [filters.type, fetchDailyReports, fetchWeeklyReports]);

  // Buscar relatórios quando os filtros mudarem
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Handlers
  const handleFilterChange = (newFilters: Partial<ReportFiltersState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSearch = () => {
    fetchReports();
  };

  const handleReportSelect = (report: DailyReportData | WeeklyReportData) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const exportReport = async (reportId: string, format: 'pdf' | 'excel') => {
    try {
      console.log('📄 Tentando exportar relatório:', { type: filters.type, format, reportId });
      
      // Usar o método exportReport da sua service
      await reportService.exportReport(filters.type, format, reportId);
      message.success(`Relatório exportado em ${format.toUpperCase()} com sucesso!`);
      
    } catch (error) {
      console.error('❌ Erro ao exportar relatório:', error);
      message.error('Erro ao exportar relatório');
    }
  };

  return {
    filters,
    dailyReports,
    weeklyReports,
    selectedReport,
    isLoading: isLoading || isLoadingBatches || isLoadingAviaries,
    error,
    batches,
    aviaries,
    handleFilterChange,
    handleSearch,
    handleReportSelect,
    handleCloseModal,
    exportReport,
  };
};
