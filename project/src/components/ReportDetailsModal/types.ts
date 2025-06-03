import { DailyReportData } from '../../@types/DailyReportData';
import { WeeklyReportData } from '../../@types/WeeklyReportData';

export interface ReportDetailsModalProps {
  visible: boolean;
  report: DailyReportData | WeeklyReportData | null;
  onClose: () => void;
}
