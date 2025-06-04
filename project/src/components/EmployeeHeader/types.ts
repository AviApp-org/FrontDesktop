export interface EmployeeHeaderProps {
  searchTerm: string;
  totalEmployees: number;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddEmployee: () => void;
}