import { BatchData } from '@/@types/BatchData';
import { AviaryData, } from '../../@types/AviaryData';
import { CreateAviaryData } from '../../@types/CreateAviaryData';

export interface AviaryModalProps {
  isOpen: boolean;
  aviary?: AviaryData | null;
  selectedBatch?: BatchData | null; // ✅ Adicionar selectedBatch
  onClose: () => void;
  onSubmit: (data: CreateAviaryData) => void; // ✅ Tipo específico
}
