import { BatchData as Batch } from '../../@types/BatchData';

export interface BatchModalProps {
  isOpen: boolean;
  batch?: Batch | null;
  isSubmitting: boolean;
  formErrors: Record<string, string>;
  onClose: () => void;
  onSubmit: (data: any) => void;
}
