import { EmployeeData } from './EmployeeData';

export interface FarmData {
  id: number;
  name: string;
  clientId: number;
  employeesId: EmployeeData[];
  street: string;
  number: string;
  cep: string;
  neighborhood: string;
  city: string;
  state: string;
}
