import { WeeklyReportData } from '@/@types/WeeklyReportData';
import api from '../config/axios';

const reportHook = {
  getWeek: async (batchId: number, data: string) => {
    try {
      const response = await api.get(`/api/daily-report/week/${batchId}/${data}`);
      return response.data as WeeklyReportData;
    } catch (e) {
      console.error('Error getting week report', e);
      throw e;
    }
  },
  getDay: async (batchId: number, data: string) => {
    try {
      const response = await api.get(`/api/daily-report/${batchId}/${data}`);       

      return response.data as WeeklyReportData[];
    } catch (e) {
      console.error('Error getting daily report', e);
      throw e;
    }
  },
  getMonth: async (batchId: number, data: string) => {
    try {
      const response = await api.get(`/api/daily-report/month/${batchId}/${data}`);
      return response.data as WeeklyReportData[];
    } catch (e) {
      console.error('Error getting month report', e);
      throw e;
    }
  },
};
export default reportHook;
