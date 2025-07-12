import { FarmFormData  } from '../../hooks/useFarm';

export interface FarmFormProps {
  formData: FarmFormData;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  clients: Array<{ id: number; name: string }>;
  onInputChange: (e: any) => void;
  onSubmit: () => Promise<void>;
}