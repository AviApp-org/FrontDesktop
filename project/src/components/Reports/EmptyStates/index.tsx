import React from 'react';
import { Card } from 'antd';
import { EmptyStateNoDateProps } from './types';
import { formatDateForDisplay } from '../../../utils/reportUtils';


export const EmptyStateNoDate: React.FC<EmptyStateNoDateProps> = ({ reportType }) => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
        <h3 style={{ color: '#666', marginBottom: '16px' }}>
          Selecione uma data para buscar o relatório {reportType.toLowerCase()}
        </h3>
        <p style={{ color: '#999' }}>
          {reportType === 'Diário' && 'Os dados do dia aparecerão organizados por aviários'}
          {reportType === 'Semanal' && 'Será calculada a média de 7 dias a partir da data selecionada'}
          {reportType === 'Mensal' && 'Será calculada a média de 30 dias a partir da data selecionada'}
        </p>
      </div>
    </Card>
  );
};

interface EmptyStateWaitingProps {
  selectedDate: string;
}

export const EmptyStateWaiting: React.FC<EmptyStateWaitingProps> = ({ selectedDate }) => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📋</div>
        <h3 style={{ color: '#666', marginBottom: '16px' }}>
          Clique em "Buscar Relatório" para carregar os dados
        </h3>
        <p style={{ color: '#999' }}>
          Data selecionada: {formatDateForDisplay(selectedDate)}
        </p>
      </div>
    </Card>
  );
};
