import { BatchData } from '@/@types/BatchData';
import { AviaryData, } from '../../@types/AviaryData';

export interface AviaryModalProps {
  isOpen: boolean;
  aviary?: AviaryData | null;
  selectedBatch?: BatchData | null; // ✅ Adicionar selectedBatch
  onClose: () => void;
  onSubmit: (data: AviaryData) => void; // ✅ Tipo específico
}
