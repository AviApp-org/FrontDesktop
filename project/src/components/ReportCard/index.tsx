import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { ReportStatistics } from '@/@types/report';
import Button from '../Button';
import StatCard from '../StatCard';
import { ReportCardProps } from './types';

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  reportType,
  onView,
  onDownload
}) => {
  if (!report.eggs) return null;

  const calculateRatio = (male: number, female: number) => {
    return `${(male / female).toFixed(2)}:1`;
  };



  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
       
        <StatCard
          label="Taxa de Mortalidade"
          value={`${report.mortality}%`}
          variant="danger"
        />
        <StatCard
          label="Razão Macho/Fêmea"
          value={calculateRatio(
            report.liveBirds.male,
            report.liveBirds.female
          )}
          variant="info"
        />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={() => onView(report)} variant='primary'>
          Visualizar
        </Button>
        {onDownload && (
          <Button variant='ghost' className="btn-icon" onClick={() => onDownload(report)}>
            <Download className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
