export interface ClientHeaderProps {
  searchTerm: string;
  totalClients: number;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddClient: () => void;
}