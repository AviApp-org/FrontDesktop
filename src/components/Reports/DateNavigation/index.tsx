import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateNavigationProps {
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

export const DateNavigation: React.FC<DateNavigationProps> = ({
  reportType,
  currentDate,
  currentDateIndex,
  dateRange,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onGoToDay,
  formatDateForDisplay
}) => {
  if (reportType === 'Diário') {
    return null; // Não mostrar navegação para diário
  }

  const getNavigationLabel = () => {
    if (reportType === 'Semanal') {
      return `Dia ${currentDateIndex + 1} de 7`;
    }
    if (reportType === 'Mensal') {
      return `Dia ${currentDateIndex + 1} de 30`;
    }
    return '';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Botão Anterior */}
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
            canGoPrevious
              ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Dia Anterior</span>
        </button>

        {/* Informações do dia atual */}
        <div className="text-center flex-1">
          <div className="text-lg font-semibold text-gray-800">
            <span role="img" aria-label="calendar">📅</span> {formatDateForDisplay(currentDate)}
          </div>
          <div className="text-sm text-gray-600">
            {getNavigationLabel()}
          </div>
        </div>

        {/* Botão Próximo */}
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
            canGoNext
              ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Próximo Dia</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Barra de progresso visual */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">
            {formatDateForDisplay(dateRange[0])}
          </span>
          <span className="text-xs text-gray-500">
            {formatDateForDisplay(dateRange[dateRange.length - 1])}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentDateIndex + 1) / dateRange.length) * 100}%`
            }}
          />
        </div>
        
        {/* Pontos clicáveis para navegação rápida */}
        <div className="flex justify-between mt-2">
          {dateRange.map((date, index) => (
            <button
              key={date}
              onClick={() => onGoToDay(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentDateIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={formatDateForDisplay(date)}
              aria-label={`Ir para ${formatDateForDisplay(date)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};