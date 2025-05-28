export interface FilterState {
  showMaisRecente: boolean;
  showMaisAntigo: boolean;
  showUltimoVisualizado: boolean;
}

export interface ReportFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: FilterState;
  onFilterChange: (filterKey: keyof FilterState) => void;
}