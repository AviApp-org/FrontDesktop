import React, { useState, useEffect } from 'react';
import FinancialTemplate from '../templates/Financial';
import { toast } from 'react-toastify';
import batchHook from '../hooks/useBatch';
import financialHook from '../hooks/useFinancial';
import { BatchData } from '../@types/BatchData';
import { useFarm } from '../contexts/FarmContext';

const Financial: React.FC = () => {
  const { farmId } = useFarm();
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<BatchData | null>(null);
  const [date, setDate] = useState<string>('');
  const [weekStart, setWeekStart] = useState<string>('');
  const [monthYear, setMonthYear] = useState<string>('');
  const [eggValue, setEggValue] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchBatches = async () => {
      if (!farmId) return;
      try {
        const batchesData = await batchHook.getBatchByFarm(farmId);
        setBatches(batchesData);
      } catch (err) {
        toast.error('Erro ao carregar lotes');
      }
    };
    fetchBatches();
  }, [farmId]);

const onSaveEggValue = async () => {
  setLoading(true);
  try {
    if (!selectedBatch) {
      toast.error('Selecione um lote antes de salvar o valor do ovo!');
      return;
    }
    const eggValueData = {
      egg: 'CLEAN',
      value: eggValue,
      batchId: selectedBatch.id
    };
    await financialHook.saveEggValue(eggValueData);
    toast.success('Valor do ovo salvo com sucesso!');
  } catch (error: any) {
    toast.error(error.message || 'Erro ao salvar valor do ovo!');
  } finally {
    setLoading(false);
  }
};
  const handleFetchDaily = async () => {
    if (!selectedBatch) return;
    setLoading(true);
    try {
      const result = await financialHook.getDailyFinancial(selectedBatch.id, date);
      setData(result);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao buscar relatório diário!');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWeekly = async () => {
    if (!selectedBatch) return;
    setLoading(true);
    try {
      const result = await financialHook.getWeeklyFinancial(selectedBatch.id, weekStart);
      setData(result);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao buscar relatório semanal!');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchMonthly = async () => {
    if (!selectedBatch) return;
    setLoading(true);
    try {
      const result = await financialHook.getMonthlyFinancial(selectedBatch.id, monthYear);
      setData(result);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao buscar relatório mensal!');
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  
useEffect(() => {
  const fetchLastEggValue = async () => {
    if (!selectedBatch) return;
    try {
      const lastEggValue = await financialHook.getLastEggValue(selectedBatch.id);
      if (lastEggValue && typeof lastEggValue.value === 'number') {
        setEggValue(lastEggValue.value);
      }
    } catch (error) {
      toast.error('Erro ao carregar último valor do ovo!');
    }
  };
  fetchLastEggValue();
}, [selectedBatch]);

  return (
    <FinancialTemplate
      batches={batches}
      selectedBatch={selectedBatch}
      setSelectedBatch={setSelectedBatch}
      date={date}
      setDate={setDate}
      weekStart={weekStart}
      setWeekStart={setWeekStart}
      monthYear={monthYear}
      setMonthYear={setMonthYear}
      eggValue={eggValue}
      setEggValue={setEggValue}
      onSaveEggValue={onSaveEggValue}
      loading={loading}
      data={data}
      onFetchDaily={handleFetchDaily}
      onFetchWeekly={handleFetchWeekly}
      onFetchMonthly={handleFetchMonthly}
    />
  );
};

export default Financial;