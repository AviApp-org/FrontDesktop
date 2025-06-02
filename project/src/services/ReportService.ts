import api from '../config/axios';
import { DailyReportData } from '../@types/DailyReportData';
import { WeeklyReportData } from '../@types/WeeklyReportData';

export const reportService = {
  getDailyReport: async (batchId: number, date: string): Promise<DailyReportData> => {
    const { data } = await api.get(`/daily-report/${batchId}/${date}`);
    return data;
  },

  getWeeklyReport: async (batchId: number, startDate: string): Promise<WeeklyReportData> => {
    const { data } = await api.get(`/daily-report/week/${batchId}/${startDate}`);
    return data;
  }
};
