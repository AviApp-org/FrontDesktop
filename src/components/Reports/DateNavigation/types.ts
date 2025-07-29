export interface DateNavigationProps {
  reportType: 'Diário' | 'Semanal' | 'Mensal';
  currentDate: string;
  currentDateIndex: number;
  dateRange: string[];
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onGoToDay: (index: number) => void;
  formatDateForDisplay: (date: string) => string;
}
