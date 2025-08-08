import React, { useState } from 'react';
import { useFinancial } from '../hooks/useFinancial';
import { useAuthContext } from '../contexts/AuthContext';
import FinancialTemplate from '../templates/Financial';
import axios from '../config/axios';
import { toast } from 'react-toastify';
import api from '../config/axios';

const Financial: React.FC = () => {
  const { user } = useAuthContext();
  const [batchId, setBatchId] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [weekStart, setWeekStart] = useState<string>('');
  const [monthYear, setMonthYear] = useState<string>('');
  const [eggValue, setEggValue] = useState<number>(0);
  const { loading, data, fetchDaily, fetchWeekly, fetchMonthly } = useFinancial();

  const onSaveEggValue = async () => {
    try {
      await api.post('/egg-value', { value: eggValue });
      toast.success('Valor do ovo salvo com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar valor do ovo!');
    }
  };

  return (
    <FinancialTemplate
      batchId={batchId}
      setBatchId={setBatchId}
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
      onFetchDaily={() => fetchDaily(batchId, date)}
      onFetchWeekly={() => fetchWeekly(batchId, weekStart)}
      onFetchMonthly={() => fetchMonthly(batchId, monthYear)}
    />
  );
};

export default Financial;
