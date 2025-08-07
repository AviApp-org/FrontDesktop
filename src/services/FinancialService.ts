import axios from '../config/axios';

export const getDailyFinancialDetails = async (batchId: number, date: string) => {
  const res = await axios.get(`/financial-details/${batchId}/${date}`);
  return res.data;
};

export const getWeeklyFinancialDetails = async (batchId: number, startDate: string) => {
  const res = await axios.get(`/financial-details/${batchId}/weekly/${startDate}`);
  return res.data;
};

export const getMonthlyFinancialDetails = async (batchId: number, yearMonth: string) => {
  const res = await axios.get(`/financial-details/${batchId}/monthly/${yearMonth}`);
  return res.data;
};