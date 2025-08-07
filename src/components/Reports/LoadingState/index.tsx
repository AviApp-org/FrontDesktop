import React from 'react';
import { LoadingStateProps } from './types';
import { Loader2 } from 'lucide-react'; // Using Lucide spinner icon

export const LoadingState: React.FC<LoadingStateProps> = ({ reportType }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="text-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
        <p className="mt-4 text-gray-600">
          Carregando relatório {reportType.toLowerCase()}...
          {reportType !== 'Diário' && (
            <>
              <br />
              <span className="text-sm text-gray-500">Buscando dados de múltiplos dias...</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};