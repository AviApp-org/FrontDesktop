import { ReportStatistics } from "@/@types/report";

export interface ReportCardProps {
  report: ReportStatistics;
  reportType: 'detalhado' | 'diario' | 'semanal';
  onView: (report: ReportStatistics) => void;
  onDownload?: (report: ReportStatistics) => void;
}
