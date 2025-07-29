export interface Client {
  id: number;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  status: string;
}

export interface ClientTableProps {
  clients: Client[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
}
