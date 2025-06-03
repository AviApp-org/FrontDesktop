import { ReportFiltersState } from '../../hooks/useReportsManagement';
import { BatchData } from '../../@types/BatchData';
import { AviaryData } from '../../@types/AviaryData';

export interface ReportFiltersProps {
  filters: ReportFiltersState;
  batches: BatchData[];
  aviaries: AviaryData[];
  isLoading: boolean;
  onFilterChange: (filters: Partial<ReportFiltersState>) => void;
  onSearch: () => void;
}