import { AviaryData } from '../../@types/AviaryData';
import { BatchData } from '../../@types/BatchData';

export interface AviaryTableProps {
  batch: BatchData;
  aviariesData: AviaryData[] | undefined;
  isLoadingAviaries: boolean;
  onCreateAviary: () => void;
  onEditAviary: (aviary: AviaryData) => void;
  onDeleteAviary: (id: string) => void;
}