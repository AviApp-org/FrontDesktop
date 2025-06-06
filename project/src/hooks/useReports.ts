import { useState, useCallback } from 'react';
import api from '../config/axios';

export const useReports = () => {
  const [reportType, setReportType] = useState<'Diário' | 'Semanal' | 'Mensal'>('Diário');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [batchId, setBatchId] = useState<string>('36');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedAviaries, setExpandedAviaries] = useState<number[]>([]);
  
  // ✅ Novos estados para navegação
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);
  const [dateRange, setDateRange] = useState<string[]>([]);

  const handleReportTypeChange = (type: 'Diário' | 'Semanal' | 'Mensal') => {
    console.log('🔄 Mudando tipo de relatório para:', type);
    setReportType(type);
    setReportData(null);
    setError(null);
    setCurrentDateIndex(0);
    
    // ✅ Gerar range de datas baseado no tipo
    if (selectedDate) {
      generateDateRange(selectedDate, type);
    }
  };

  // ✅ Função para gerar range de datas
  const generateDateRange = (startDate: string, type: 'Diário' | 'Semanal' | 'Mensal') => {
    const dates: string[] = [];
    const start = new Date(startDate);
    
    let days = 1; // Diário = 1 dia
    if (type === 'Semanal') days = 7;
    if (type === 'Mensal') days = 30;
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      
      dates.push(`${year}-${month}-${day}`);
    }
    
    console.log('📅 Range de datas gerado:', { type, startDate, days, dates });
    setDateRange(dates);
  };

  // ✅ Função para buscar relatório de uma data específica
  const fetchReportForDate = useCallback(async (date: string) => {
    if (!date || !batchId) {
      setError('Data ou lote inválido.');
      return;
    }

    console.log('🚀 Buscando relatório para data:', date);

    setLoading(true);
    setError(null);

    try {
      // Converter YYYY-MM-DD para DD-MM-YYYY
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      
      const endpoint = `/api/daily-report/${batchId}/${formattedDate}`;
      console.log('🔍 Endpoint:', endpoint);
      
      const response = await api.get(endpoint);
      console.log('✅ Dados recebidos para', date, ':', response.data);
      
      setReportData(response.data);

    } catch (err: any) {
      console.error('❌ Erro ao buscar relatório para', date, ':', err);
      
      if (err.response?.status === 404) {
        setError(`Nenhum relatório encontrado para ${formatDateForDisplay(date)}`);
      } else if (err.response) {
        setError(`Erro ${err.response.status}: ${err.response.data?.message || err.response.statusText}`);
      } else if (err.request) {
        setError('Erro de conexão. Verifique se o backend está rodando.');
      } else {
        setError(err.message || 'Erro ao carregar relatório');
      }
      
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  // ✅ Função principal para buscar relatório
  const fetchReport = useCallback(async () => {
    if (!selectedDate || !batchId) {
      setError('Por favor, selecione uma data e um lote.');
      return;
    }

    // Gerar range de datas
    generateDateRange(selectedDate, reportType);
    
    // Buscar relatório da primeira data
    await fetchReportForDate(selectedDate);
  }, [selectedDate, batchId, reportType, fetchReportForDate]);

  // ✅ Navegação entre dias
  const goToPreviousDay = useCallback(async () => {
    if (currentDateIndex > 0) {
      const newIndex = currentDateIndex - 1;
      setCurrentDateIndex(newIndex);
      await fetchReportForDate(dateRange[newIndex]);
    }
  }, [currentDateIndex, dateRange, fetchReportForDate]);

  const goToNextDay = useCallback(async () => {
    if (currentDateIndex < dateRange.length - 1) {
      const newIndex = currentDateIndex + 1;
      setCurrentDateIndex(newIndex);
      await fetchReportForDate(dateRange[newIndex]);
    }
  }, [currentDateIndex, dateRange, fetchReportForDate]);

  const goToSpecificDay = useCallback(async (index: number) => {
    if (index >= 0 && index < dateRange.length) {
      setCurrentDateIndex(index);
      await fetchReportForDate(dateRange[index]);
    }
  }, [dateRange, fetchReportForDate]);

  // ✅ Função para formatar data para exibição
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const toggleAviario = (index: number) => {
    setExpandedAviaries(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isAviaryExpanded = (index: number) => {
    return expandedAviaries.includes(index);
  };

  // ✅ Dados da data atual
  const currentDate = dateRange[currentDateIndex];
  const canGoPrevious = currentDateIndex > 0;
  const canGoNext = currentDateIndex < dateRange.length - 1;

  return {
    reportType,
    selectedDate,
    batchId,
    loading,
    reportData,
    error,
    expandedAviaries,
    
    // ✅ Novos retornos para navegação
    currentDate,
    currentDateIndex,
    dateRange,
    canGoPrevious,
    canGoNext,
    
    // Funções existentes
    setSelectedDate,
    setBatchId,
    handleReportTypeChange,
    fetchReport,
    toggleAviario,
    isAviaryExpanded,
    
    // ✅ Novas funções de navegação
    goToPreviousDay,
    goToNextDay,
    goToSpecificDay,
    formatDateForDisplay,
  };
};
