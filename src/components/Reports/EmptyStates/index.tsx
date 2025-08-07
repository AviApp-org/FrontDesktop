import React from 'react';
import { formatDateForDisplay } from '../../../utils/reportUtils';
import { EmptyStateNoDateProps } from './types';

export const EmptyStateNoDate: React.FC<EmptyStateNoDateProps> = ({ reportType }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm text-center py-12">
    <div className="text-6xl mb-4">📅</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Selecione uma data
    </h3>
    <p className="text-gray-500">
      Escolha uma data para visualizar o relatório {reportType.toLowerCase()}.
    </p>
  </div>
);

interface EmptyStateWaitingProps {
  selectedDate: string;
}

export const EmptyStateWaiting: React.FC<EmptyStateWaitingProps> = ({ selectedDate }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm text-center py-12">
    <div className="text-6xl mb-4">⏳</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Clique em "Buscar Relatório"
    </h3>
    <p className="text-gray-500">
      Data selecionada: {formatDateForDisplay(selectedDate)}
    </p>
  </div>
);

interface EmptyStateNoDataProps {
  selectedDate: string;
  batchId: number;
  onRetry: () => void;
}

export const EmptyStateNoData: React.FC<EmptyStateNoDataProps> = ({ 
  selectedDate, 
  batchId, 
  onRetry 
}) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm text-center py-12">
    <div className="text-6xl mb-4">📊</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Nenhum dado encontrado
    </h3>
    <p className="text-gray-500 mb-4">
      Não foram encontrados dados para o lote {batchId} na data {formatDateForDisplay(selectedDate)}.
    </p>
    <button
      onClick={onRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
    >
      Tentar Novamente
    </button>
  </div>
);

interface EmptyStateNoAviariesProps {
  hasReportData: boolean;
  totalEggs: number;
  totalDeaths: number;
}

export const EmptyStateNoAviaries: React.FC<EmptyStateNoAviariesProps> = ({ 
  hasReportData, 
  totalEggs, 
  totalDeaths 
}) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm text-center py-12">
    <div className="text-6xl mb-4">🏠</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Nenhum aviário encontrado
    </h3>
    {hasReportData ? (
      <div className="space-y-4">
        <p className="text-gray-500">
          O relatório foi encontrado, mas não contém dados de aviários válidos.
        </p>
        {(totalEggs > 0 || totalDeaths > 0) && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-md mx-auto">
            <h4 className="font-semibold text-blue-800 mb-2">📊 Dados Gerais Disponíveis:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{totalEggs.toLocaleString()}</div>
                <div className="text-gray-600">🥚 Total de Ovos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{totalDeaths.toLocaleString()}</div>
                <div className="text-gray-600">💀 Total de Mortes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <p className="text-gray-500">
        Não foram encontrados dados de aviários para esta consulta.
      </p>
    )}
  </div>
);

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div className="bg-red-50 rounded-lg border border-red-200 shadow-sm text-center py-12">
    <div className="text-6xl mb-4">❌</div>
    <h3 className="text-xl font-semibold text-red-600 mb-2">
      Erro ao carregar relatório
    </h3>
    <p className="text-red-500 mb-4 max-w-md mx-auto">
      {error}
    </p>
    <button
      onClick={onRetry}
      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
    >
      Tentar Novamente
    </button>
  </div>
);

interface LoadingStateProps {
  reportType: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ reportType }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm text-center py-12">
    <div className="text-6xl mb-4">⏳</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Carregando relatório {reportType.toLowerCase()}...
    </h3>
    <p className="text-gray-500">
      Por favor, aguarde enquanto buscamos os dados.
    </p>
  </div>
);