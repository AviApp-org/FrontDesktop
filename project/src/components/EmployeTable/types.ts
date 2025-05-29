import { EmployeeData } from '../../@types/EmployeeData';


export interface EmployeeTableProps {
  employees: EmployeeData[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (employee: EmployeeData) => void;
  onDelete: (id: number) => void;
}