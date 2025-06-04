import { EmployeeFormData } from '../../hooks/useEmployeeManagement';
import { SelectChangeEvent } from '@mui/material';

export interface EmployeeModalProps {
  open: boolean;
  editingId: number | null;
  formData: EmployeeFormData;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}