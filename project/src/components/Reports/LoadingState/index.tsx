import React from 'react';
import { Card, Spin } from 'antd';
import { LoadingStateProps } from './types';


export const LoadingState: React.FC<LoadingStateProps> = ({ reportType }) => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
        <p style={{ marginTop: '16px' }}>
          Carregando relatório {reportType.toLowerCase()}...
          {reportType !== 'Diário' && <><br/><small>Buscando dados de múltiplos dias...</small></>}
        </p>
      </div>
    </Card>
  );
};
