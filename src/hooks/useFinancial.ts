import { useState } from 'react';
import {
  getDailyFinancialDetails,
  getWeeklyFinancialDetails,
  getMonthlyFinancialDetails,
} from '../services/FinancialService';

export const useFinancial = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchDaily = async (batchId: number, date: string) => {
    setLoading(true);
    try {
      const result = await getDailyFinancialDetails(batchId, date);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeekly = async (batchId: number, startDate: string) => {
    setLoading(true);
    try {
      const result = await getWeeklyFinancialDetails(batchId, startDate);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthly = async (batchId: number, yearMonth: string) => {
    setLoading(true);
    try {
      const result = await getMonthlyFinancialDetails(batchId, yearMonth);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, fetchDaily, fetchWeekly, fetchMonthly };
};