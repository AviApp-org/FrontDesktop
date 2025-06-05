import { useState, useCallback } from 'react';
import api from '../config/axios';

export const useReports = () => {
  const [reportType, setReportType] = useState<'Diário' | 'Semanal' | 'Mensal'>('Diário');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [batchId, setBatchId] = useState<string>('36');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [summaryData, setSummaryData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedAviaries, setExpandedAviaries] = useState<number[]>([]);

  const handleReportTypeChange = (type: 'Diário' | 'Semanal' | 'Mensal') => {
    console.log('🔄 Mudando tipo de relatório para:', type);
    setReportType(type);
    setReportData(null);
    setSummaryData(null);
    setError(null);
  };

  const fetchReport = useCallback(async () => {
    if (!selectedDate || !batchId) {
      setError('Por favor, selecione uma data e um lote.');
      return;
    }

    console.log('🚀 Iniciando busca de relatório:', {
      type: reportType,
      date: selectedDate,
      batchId: batchId
    });

    setLoading(true);
    setError(null);
    setReportData(null);
    setSummaryData(null);

    try {
      // Converter YYYY-MM-DD para DD-MM-YYYY
      const [year, month, day] = selectedDate.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      
      let endpoint = '';
      
      if (reportType === 'Diário') {
        endpoint = `/api/daily-report/${batchId}/${formattedDate}`; // ✅ COM /api
      } else if (reportType === 'Semanal') {
        endpoint = `/api/weekly-report/${batchId}/${formattedDate}`; // ✅ COM /api
      } else if (reportType === 'Mensal') {
        endpoint = `/api/monthly-report/${batchId}/${formattedDate}`; // ✅ COM /api
      }

      console.log('🔍 Endpoint final:', endpoint);
      console.log('🔍 URL completa será:', `http://localhost:8080${endpoint}`);
      
      const response = await api.get(endpoint);
      
      if (reportType === 'Diário') {
        console.log('✅ Dados do relatório diário:', response.data);
        setReportData(response.data);
      } else {
        console.log('✅ Dados do relatório semanal/mensal:', response.data);
        setSummaryData(response.data);
      }

    } catch (err: any) {
      console.error('❌ Erro ao buscar relatório:', err);
      
      if (err.response) {
        setError(`Erro ${err.response.status}: ${err.response.data?.message || err.response.statusText}`);
      } else if (err.request) {
        setError('Erro de conexão. Verifique se o backend está rodando.');
      } else {
        setError(err.message || 'Erro ao carregar relatório');
      }
    } finally {
      setLoading(false);
    }
  }, [selectedDate, batchId, reportType]);

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

  return {
    reportType,
    selectedDate,
    batchId,
    loading,
    reportData,
    summaryData,
    error,
    expandedAviaries,
    setSelectedDate,
    setBatchId,
    handleReportTypeChange,
    fetchReport,
    toggleAviario,
    isAviaryExpanded,
  };
};
