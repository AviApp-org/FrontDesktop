import React from 'react';
import { FarmPageHeaderProps } from './types';

export const FarmPageHeader: React.FC<FarmPageHeaderProps> = ({
  title = "Cadastro de Granja",
  subtitle = "Preencha os dados da granja e endereço para cadastrar uma nova propriedade"
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
