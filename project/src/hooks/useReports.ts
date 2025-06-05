import { useState } from 'react';
import api from '../config/axios';
import { ReportData, SummaryData, ReportType } from '../@types/reportTypes';
import { formatDateForAPI, generateDateRange, formatDateForDisplay } from '../utils/reportUtils';

export const useReports = () => {
  const [reportType, setReportType] = useState<ReportType>('Diário');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [batchId, setBatchId] = useState<number>(36);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openAviaries, setOpenAviaries] = useState<{ [key: number]: boolean }>({});

  // Função para buscar múltiplos relatórios e calcular médias
  const fetchMultipleReports = async (dates: string[]): Promise<SummaryData> => {
    const reports: ReportData[] = [];
    
    for (const date of dates) {
      try {
        const formattedDate = formatDateForAPI(date);
        const endpoint = `/api/daily-report/${batchId}/${formattedDate}`;
        const response = await api.get(endpoint);
        reports.push(response.data);
      } catch (err) {
        console.log(`Sem dados para ${date}`);
        // Continua mesmo se não tiver dados para alguns dias
      }
    }

    if (reports.length === 0) {
      throw new Error('Nenhum dado encontrado para o período selecionado');
    }

    // Calcular médias
    const totalDays = reports.length;
    const totalEggs = reports.reduce((sum, r) => sum + r.totalEggsCollected, 0);
    const totalDeaths = reports.reduce((sum, r) => sum + r.totalDeadBirds, 0);
    const avgProduction = reports.reduce((sum, r) => sum + r.production, 0) / totalDays;
    const avgMortality = reports.reduce((sum, r) => sum + r.mortality, 0) / totalDays;
    const avgChickens = reports.reduce((sum, r) => sum + r.currentChickens, 0) / totalDays;
    const avgRoosters = reports.reduce((sum, r) => sum + r.currentRoosters, 0) / totalDays;

    // Calcular média dos tipos de ovos
    const eggTypesMap = new Map<string, number[]>();
    reports.forEach(report => {
      report.percentageByEggType?.forEach(egg => {
        if (!eggTypesMap.has(egg.type)) {
          eggTypesMap.set(egg.type, []);
        }
        eggTypesMap.get(egg.type)!.push(egg.percentage);
      });
    });

    const eggTypesAverage = Array.from(eggTypesMap.entries()).map(([type, percentages]) => ({
      type,
      percentage: percentages.reduce((sum, p) => sum + p, 0) / percentages.length
    }));

    const startDate = formatDateForDisplay(dates[0]);
    const endDate = formatDateForDisplay(dates[dates.length - 1]);

    return {
      period: `${startDate} até ${endDate}`,
      totalDays,
      avgEggsPerDay: totalEggs / totalDays,
      avgDeathsPerDay: totalDeaths / totalDays,
      avgProduction,
      avgMortality,
      avgChickens,
      avgRoosters,
      totalEggs,
      totalDeaths,
      eggTypesAverage
    };
  };

  // Função principal para buscar relatórios
  const fetchReport = async () => {
    if (!selectedDate) {
      setError('Por favor, selecione uma data');
      return;
    }

    setLoading(true);
    setError(null);
    setReportData(null);
    setSummaryData(null);

    try {
      if (reportType === 'Diário') {
        // Relatório diário
        const formattedDate = formatDateForAPI(selectedDate);
        const endpoint = `/api/daily-report/${batchId}/${formattedDate}`;
        
        console.log('🔍 Buscando relatório diário:', { batchId, selectedDate, formattedDate, endpoint });

        const response = await api.get(endpoint);
        console.log('✅ Dados diários recebidos:', response.data);
        
        setReportData(response.data);
        
      } else if (reportType === 'Semanal') {
        // Relatório semanal (7 dias a partir da data selecionada)
        console.log('🔍 Buscando relatório semanal a partir de:', selectedDate);
        
        const dates = generateDateRange(selectedDate, 7);
        console.log('📅 Datas para buscar:', dates);
        
        const summary = await fetchMultipleReports(dates);
        console.log('✅ Resumo semanal calculado:', summary);
        
        setSummaryData(summary);
        
      } else if (reportType === 'Mensal') {
        // Relatório mensal (30 dias a partir da data selecionada)
        console.log('🔍 Buscando relatório mensal a partir de:', selectedDate);
        
        const dates = generateDateRange(selectedDate, 30);
        console.log('📅 Datas para buscar:', dates);
        
        const summary = await fetchMultipleReports(dates);
        console.log('✅ Resumo mensal calculado:', summary);
        
        setSummaryData(summary);
      }
      
    } catch (err: any) {
      console.error('❌ Erro ao buscar relatório:', err);
      
      let errorMessage = 'Erro ao buscar relatório';
      if (err.response?.status === 404) {
        errorMessage = `Nenhum relatório encontrado para o lote ${batchId} na data ${formatDateForDisplay(selectedDate)}`;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Limpar dados quando mudar o tipo de relatório
  const handleReportTypeChange = (newType: ReportType) => {
    setReportType(newType);
    setReportData(null);
    setSummaryData(null);
    setError(null);
  };

  const toggleAviario = (id: number) => {
    setOpenAviaries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return {
    // Estados
    reportType,
    selectedDate,
    batchId,
    loading,
    reportData,
    summaryData,
    error,
    openAviaries,
    
    // Setters
    setSelectedDate,
    setBatchId,
    
    // Handlers
    handleReportTypeChange,
    fetchReport,
    toggleAviario,
  };
};
