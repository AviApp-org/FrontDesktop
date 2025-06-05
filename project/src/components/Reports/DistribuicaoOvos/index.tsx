import React from 'react';
import { Card } from 'antd';
import { translateEggType } from '../../../@types/reportTypes';
import { DistribuicaoOvosProps } from './types';


export const DistribuicaoOvos: React.FC<DistribuicaoOvosProps> = ({ eggTypes }) => {
  if (!eggTypes || eggTypes.length === 0) return null;

  return (
    <Card className="mb-6">
      <h3 className="font-semibold mb-4">🥚 Distribuição de Tipos de Ovos</h3>
      <div className="space-y-2">
        {eggTypes.map((egg) => (
          <div key={egg.type} className="flex items-center">
            <span className="inline-block w-32 font-medium text-sm">
              {translateEggType(egg.type)}:
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-4 mx-2">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(egg.percentage, 100)}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{egg.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
