import { useState } from 'react';
import axios from '../config/axios';
import api from '../config/axios';

interface FinancialDetails {
  hatchableTotal: number;
  marketTotal: number;
  total: number;
}

export const useFinancial = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FinancialDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Salvar valor do ovo
  const saveEggValue = async (eggValue: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/egg-value', { value: eggValue });
      return true;
    } catch (err) {
      setError('Erro ao salvar valor do ovo!');
      return false;
    } finally {   
      setLoading(false);
    }
  };

  // Buscar relatório diário
  const fetchDaily = async (batchId: number, date: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/financial-details/${batchId}/${date}`);
      setData(res.data);
    } catch (err) {
      setError('Erro ao buscar relatório diário!');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Buscar relatório semanal
  const fetchWeekly = async (batchId: number, startDate: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/financial-details/${batchId}/weekly/${startDate}`);
      setData(res.data);
    } catch (err) {
      setError('Erro ao buscar relatório semanal!');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Buscar relatório mensal
  const fetchMonthly = async (batchId: number, yearMonth: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/financial-details/${batchId}/monthly/${yearMonth}`);
      setData(res.data);
    } catch (err) {
      setError('Erro ao buscar relatório mensal!');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    saveEggValue,
    fetchDaily,
    fetchWeekly,
    fetchMonthly,
    setData,
  };
};