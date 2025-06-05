import { ReportType } from '../../../@types/reportTypes';

export interface ReportFiltersProps {
  reportType: ReportType;
  selectedDate: string;
  batchId: number;
  loading: boolean;
  onReportTypeChange: (type: ReportType) => void;
  onDateChange: (date: string) => void;
  onBatchChange: (batchId: number) => void;
  onSearch: () => void;
}