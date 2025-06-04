import { AviaryData, } from '../../@types/AviaryData';
import { CreateAviaryData } from '../../@types/CreateAviaryData';

export interface AviaryModalProps {
  isOpen: boolean;
  aviary?: AviaryData | null;
  selectedBatch?: { id: string | number } | null; // ✅ Adicionar selectedBatch
  onClose: () => void;
  onSubmit: (data: CreateAviaryData) => void; // ✅ Tipo específico
}
