import React, { useState } from 'react';
import { useFinancial } from '../hooks/useFinancial';
import { useAuthContext } from '../contexts/AuthContext';
import FinancialTemplate from '../templates/Financial';

const Financial: React.FC = () => {
  const { user } = useAuthContext();
  const [batchId, setBatchId] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [weekStart, setWeekStart] = useState<string>('');
  const [monthYear, setMonthYear] = useState<string>('');
  const { loading, data, fetchDaily, fetchWeekly, fetchMonthly } = useFinancial();

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
      loading={loading}
      data={data}
      onFetchDaily={() => fetchDaily(batchId, date)}
      onFetchWeekly={() => fetchWeekly(batchId, weekStart)}
      onFetchMonthly={() => fetchMonthly(batchId, monthYear)}
    />
  );
};

export default Financial;