import { DailyReportData } from '../../@types/DailyReportData';
import { WeeklyReportData } from '../../@types/WeeklyReportData';
import { ReportType } from '../../hooks/useReportsManagement';


export interface ReportModalProps {
  report: DailyReportData | WeeklyReportData;
  type: ReportType;
  onClose: () => void;
}

export interface ReportCardProps {
  report: DailyReportData | WeeklyReportData;
  type: ReportType;
  onSelect: (report: DailyReportData | WeeklyReportData) => void;
  onExport: (reportId: string, format: 'pdf' | 'excel') => void;
}
