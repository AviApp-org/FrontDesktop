import React from 'react';
import { Alert, Button } from 'antd';
import { ErrorStateProps } from './types';

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Alert
      message="Erro ao carregar relatório"
      description={error}
      type="error"
      showIcon
      className="mb-6"
      action={
        <Button size="small" onClick={onRetry}>
          Tentar Novamente
        </Button>
      }
    />
  );
};
