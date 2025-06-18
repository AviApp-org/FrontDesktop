import { useState, useCallback, useEffect } from 'react';
import api from '../config/axios';
import { useBatches } from './useBatch'; // ✅ Importar o hook existente

export const useReports = () => {
  // ✅ Usar o hook de lotes existente
  const { data: batches, isLoading: batchesLoading, error: batchesError } = useBatches();
  
  const [reportType, setReportType] = useState<'Diário' | 'Semanal' | 'Mensal'>('Diário');
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // ✅ Não pré-setar o lote, deixar vazio inicialmente
  const [batchId, setBatchId] = useState<string>('');
  
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedAviaries, setExpandedAviaries] = useState<number[]>([]);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);
  const [dateRange, setDateRange] = useState<string[]>([]);

  // ✅ Selecionar automaticamente o primeiro lote quando os lotes carregarem
  useEffect(() => {
    if (batches && batches.length > 0 && !batchId) {
      const firstBatch = batches[0];
      setBatchId(firstBatch.id.toString());
      console.log('🎯 Lote selecionado automaticamente:', firstBatch);
    }
  }, [batches, batchId]);

  const handleReportTypeChange = (type: 'Diário' | 'Semanal' | 'Mensal') => {
    console.log('🔄 Mudando tipo de relatório para:', type);
    setReportType(type);
    setReportData(null);
    setError(null);
    setCurrentDateIndex(0);
    setExpandedAviaries([]);
    
    if (selectedDate) {
      generateDateRange(selectedDate, type);
    }
  };

  const generateDateRange = (startDate: string, type: 'Diário' | 'Semanal' | 'Mensal') => {
    const dates: string[] = [];
    
    let start: Date;
    
    if (startDate.includes('/')) {
      const [day, month, year] = startDate.split('/');
      start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else if (startDate.includes('-')) {
      const [year, month, day] = startDate.split('-');
      start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      console.error('❌ Formato de data inválido:', startDate);
      return;
    }
    
    let days = 1;
    if (type === 'Semanal') days = 7;
    if (type === 'Mensal') days = 30;
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      
      dates.push(`${day}/${month}/${year}`);
    }
    
    console.log('📅 Range de datas gerado:', { type, startDate, days, dates });
    setDateRange(dates);
  };

  const fetchReportForDate = useCallback(async (date: string) => {
    if (!date || !batchId) {
      setError('Data ou lote inválido.');
      return;
    }

    console.log('🚀 Buscando relatório para data:', date);

    setLoading(true);
    setError(null);

    try {
      let formattedDate: string;
      
      if (date.includes('/')) {
        const [day, month, year] = date.split('/');
        formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
      } else if (date.includes('-')) {
        const [year, month, day] = date.split('-');
        formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
      } else {
        throw new Error('Formato de data inválido');
      }
      
      const endpoint = `/api/daily-report/${batchId}/${formattedDate}`;
      console.log('🔍 Endpoint final:', endpoint);
      
      const response = await api.get(endpoint);
      console.log('✅ Dados recebidos para', date, ':', response.data);
      
      setReportData(response.data);

    } catch (err: any) {
      console.error('❌ Erro ao buscar relatório para', date, ':', err);
      
      if (err.response?.status === 404) {
        setError(`Nenhum relatório encontrado para ${date}`);
      } else if (err.response?.status === 500) {
        setError(`Erro interno do servidor. Verifique se a data ${date} está no formato correto.`);
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

  const fetchReport = useCallback(async () => {
    if (!selectedDate || !batchId) {
      setError('Por favor, selecione uma data e um lote.');
      return;
    }

    console.log('📊 Iniciando busca do relatório:', { selectedDate, batchId, reportType });

    generateDateRange(selectedDate, reportType);
    await fetchReportForDate(selectedDate);
  }, [selectedDate, batchId, reportType, fetchReportForDate]);

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

  const formatDateForDisplay = (dateString: string): string => {
    return dateString || '';
  };

  const toggleAviario = (index: number) => {
    console.log('🔄 Toggling aviário:', index);
    setExpandedAviaries(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isAviaryExpanded = (index: number) => {
    return expandedAviaries.includes(index);
  };

  const currentDate = dateRange[currentDateIndex];
  const canGoPrevious = currentDateIndex > 0;
  const canGoNext = currentDateIndex < dateRange.length - 1;

  return {
    reportType,
    selectedDate,
    batchId,
    loading: loading || batchesLoading, // ✅ Incluir loading dos lotes
    reportData,
    error: error || batchesError, // ✅ Incluir erro dos lotes
    expandedAviaries,
    currentDate,
    currentDateIndex,
    dateRange,
    canGoPrevious,
    canGoNext,
    
    // ✅ Retornar os lotes do hook existente
    batches: batches || [],
    
    setSelectedDate,
    setBatchId,
    handleReportTypeChange,
    fetchReport,
    toggleAviario,
    isAviaryExpanded,
    goToPreviousDay,
    goToNextDay,
    goToSpecificDay,
    formatDateForDisplay,
  };
};
