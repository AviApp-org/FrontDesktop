export interface ReportFilters {
  batchId: number;
  startDate: string; // Formato YYYY-MM-DD (será convertido para DD-MM-YYYY)
  endDate: string;   // Formato YYYY-MM-DD (será convertido para DD-MM-YYYY)
  aviaryId?: number;
}
