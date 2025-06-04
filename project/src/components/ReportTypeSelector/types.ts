export interface ReportTypeSelectorProps {
  selectedType: 'detalhado' | 'diario' | 'semanal';
  onTypeChange: (type: 'detalhado' | 'diario' | 'semanal') => void;
}
