import React from 'react';
import { Card, Button } from 'antd';
import { formatDateForDisplay } from '../../../utils/reportUtils';

interface EmptyStateNoDateProps {
  reportType: string;
}

export const EmptyStateNoDate: React.FC<EmptyStateNoDateProps> = ({ reportType }) => (
  <Card className="text-center py-12">
    <div className="text-6xl mb-4">📅</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Selecione uma data
    </h3>
    <p className="text-gray-500">
      Escolha uma data para visualizar o relatório {reportType.toLowerCase()}.
    </p>
  </Card>
);

interface EmptyStateWaitingProps {
  selectedDate: string;
}

export const EmptyStateWaiting: React.FC<EmptyStateWaitingProps> = ({ selectedDate }) => (
  <Card className="text-center py-12">
    <div className="text-6xl mb-4">⏳</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Clique em "Buscar Relatório"
    </h3>
    <p className="text-gray-500">
      Data selecionada: {formatDateForDisplay(selectedDate)}
    </p>
  </Card>
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
  <Card className="text-center py-12">
    <div className="text-6xl mb-4">📊</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Nenhum dado encontrado
    </h3>
    <p className="text-gray-500 mb-4">
      Não foram encontrados dados para o lote {batchId} na data {formatDateForDisplay(selectedDate)}.
    </p>
    <Button type="primary" onClick={onRetry}>
      Tentar Novamente
    </Button>
  </Card>
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
  <Card className="text-center py-12">
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
  </Card>
);

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <Card className="text-center py-12 border-red-200 bg-red-50">
    <div className="text-6xl mb-4">❌</div>
    <h3 className="text-xl font-semibold text-red-600 mb-2">
      Erro ao carregar relatório
    </h3>
    <p className="text-red-500 mb-4 max-w-md mx-auto">
      {error}
    </p>
    <Button type="primary" danger onClick={onRetry}>
      Tentar Novamente
    </Button>
  </Card>
);

interface LoadingStateProps {
  reportType: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ reportType }) => (
  <Card className="text-center py-12">
    <div className="text-6xl mb-4">⏳</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">
      Carregando relatório {reportType.toLowerCase()}...
    </h3>
    <p className="text-gray-500">
      Por favor, aguarde enquanto buscamos os dados.
    </p>
  </Card>
);

