import React from 'react';
import { ClientPageHeaderProps } from './types';

export const ClientPageHeader: React.FC<ClientPageHeaderProps> = ({
  title = "Cadastro de Cliente",
  subtitle = "Preencha os dados abaixo para cadastrar um novo cliente"
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};
