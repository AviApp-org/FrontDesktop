import { useState } from 'react';
import api from '../config/axios';
import { ReportData, SummaryData, ReportType } from '../@types/reportTypes';
import { formatDateForAPI, generateDateRange, formatDateForDisplay } from '../utils/reportUtils';
import { normalizeAviaryData, isValidAviaryData } from '../utils/aviaryUtils';

export const useReports = () => {
  const [reportType, setReportType] = useState<ReportType>('Diário');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [batchId, setBatchId] = useState<number>(36);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedAviaries, setExpandedAviaries] = useState<Set<string>>(new Set());

  // Função para processar dados do relatório
  const processReportData = (data: ReportData): ReportData => {
    console.log('🔍 Processando dados do relatório:', data);
    console.log('🏠 Aviários brutos recebidos:', data.aviaryReports);
    
    if (!data.aviaryReports || !Array.isArray(data.aviaryReports)) {
      console.warn('⚠️ aviaryReports não é um array válido:', data.aviaryReports);
      return {
        ...data,
        aviaryReports: []
      };
    }

    const processedAviaries = data.aviaryReports.map((aviary, index) => {
      console.log(`🏠 Processando aviário ${index + 1}:`, {
        aviaryId: aviary.aviaryId,
        id: aviary.id,
        name: aviary.aviaryName || aviary.name,
        eggCollections: aviary.eggCollections?.length || 0,
        deathRecords: aviary.deathRecords?.length || 0,
        rawData: aviary
      });
      
      const normalized = normalizeAviaryData(aviary);
      
      if (!isValidAviaryData(normalized)) {
        console.warn(`⚠️ Aviário ${index + 1} será rejeitado:`, normalized);
        return null;
      }
      
      console.log(`✅ Aviário ${index + 1} aceito:`, normalized);
      return normalized;
    }).filter((aviary): aviary is NonNullable<typeof aviary> => aviary !== null);

    const processedData = {
      ...data,
      aviaryReports: processedAviaries
    };

    console.log('✅ Dados processados:', {
      totalAviariesReceived: data.aviaryReports.length,
      totalAviariesProcessed: processedAviaries.length,
      aviariesWithDetails: processedAviaries.filter(a => 
        (a.eggCollections && a.eggCollections.length > 0) || 
        (a.deathRecords && a.deathRecords.length > 0)
      ).length,
      processedAviaries: processedAviaries.map(a => ({
        id: a.aviaryId,
        name: a.aviaryName,
        collections: a.eggCollections?.length || 0,
        deaths: a.deathRecords?.length || 0
      }))
    });

    return processedData;
  };

  // Função para buscar múltiplos relatórios e calcular médias
  const fetchMultipleReports = async (dates: string[]): Promise<SummaryData> => {
    const reports: ReportData[] = [];
    
    for (const date of dates) {
      try {
        const formattedDate = formatDateForAPI(date);
        const endpoint = `/api/daily-report/${batchId}/${formattedDate}`;
        const response = await api.get(endpoint);
        
        const processedData = processReportData(response.data);
        reports.push(processedData);
      } catch (err) {
        console.log(`⚠️ Sem dados para ${date}`);
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
    setExpandedAviaries(new Set());

    try {
      if (reportType === 'Diário') {
        const formattedDate = formatDateForAPI(selectedDate);
        const endpoint = `/api/daily-report/${batchId}/${formattedDate}`;
        
        console.log('🔍 Buscando relatório diário:', { 
          batchId, 
          selectedDate, 
          formattedDate, 
          endpoint 
        });

        const response = await api.get(endpoint);
        
        console.log('📥 Dados brutos recebidos da API:', response.data);
        
        // ✅ Verificar se temos aviaryReports
        if (!response.data.aviaryReports) {
          console.warn('⚠️ API não retornou aviaryReports, criando array vazio');
          response.data.aviaryReports = [];
        }
        
        // Processar e normalizar dados
        const processedData = processReportData(response.data);
        
        console.log('✅ Dados finais processados:', processedData);
        
        // ✅ Sempre definir reportData, mesmo se não houver aviários
        setReportData(processedData);
        
      } else if (reportType === 'Semanal') {
        console.log('🔍 Buscando relatório semanal a partir de:', selectedDate);
        const dates = generateDateRange(selectedDate, 7);
        const summary = await fetchMultipleReports(dates);
        setSummaryData(summary);
        
      } else if (reportType === 'Mensal') {
        console.log('🔍 Buscando relatório mensal a partir de:', selectedDate);
        const dates = generateDateRange(selectedDate, 30);
        const summary = await fetchMultipleReports(dates);
        setSummaryData(summary);
      }
      
    } catch (err: any) {
      console.error('❌ Erro ao buscar relatório:', err);
      
      let errorMessage = 'Erro ao buscar relatório';
      if (err.response?.status === 404) {
        errorMessage = `Nenhum relatório encontrado para o lote ${batchId} na data ${formatDateForDisplay(selectedDate)}`;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
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
    setExpandedAviaries(new Set());
  };

  // ✅ Função para controlar expansão individual - usando string como chave para ser mais flexível
  const toggleAviario = (aviaryId: string | number) => {
    const id = String(aviaryId); // Converter para string para ser mais flexível
    console.log('🔄 Toggling aviário:', id);
    setExpandedAviaries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        console.log('➖ Fechando aviário:', id);
      } else {
        newSet.add(id);
        console.log('➕ Abrindo aviário:', id);
      }
      console.log('📋 Aviários expandidos:', Array.from(newSet));
      return newSet;
    });
  };

  // ✅ Função para verificar se aviário está expandido
  const isAviaryExpanded = (aviaryId: string | number): boolean => {
    const id = String(aviaryId);
    return expandedAviaries.has(id);
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
    expandedAviaries,
    
    // Setters
    setSelectedDate,
    setBatchId,
    
    // Handlers
    handleReportTypeChange,
    fetchReport,
    toggleAviario,
    isAviaryExpanded,
  };
};

