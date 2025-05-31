import { ClientFormData } from '../../hooks/useClientManagement';

export interface ClientFormProps {
  formData: ClientFormData;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  onInputChange: (e: any) => void;
  onSubmit: () => Promise<void>;
}