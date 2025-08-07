export interface ClientFormData {
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  status: string;
}

export interface ClientModalProps {
  open: boolean;
  editingId: number | null;
  formData: ClientFormData;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}