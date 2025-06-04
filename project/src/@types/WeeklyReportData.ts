import { DailyReportData } from './DailyReportData';

export interface WeeklyReportData {
  batch: string;
  startDate: string; 
  endDate: string; 
  dailyReports: DailyReportData[];
}
