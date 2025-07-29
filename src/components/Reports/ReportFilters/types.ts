
export interface ReportFiltersProps {
  reportType: 'Diário' | 'Semanal' | 'Mensal';
  selectedDate: string;
  batchId: string;
  loading: boolean;
  onReportTypeChange: (type: 'Diário' | 'Semanal' | 'Mensal') => void;
  onDateChange: (date: string) => void;
  onBatchChange: (batchId: string) => void;
  onSearch: () => void;
}