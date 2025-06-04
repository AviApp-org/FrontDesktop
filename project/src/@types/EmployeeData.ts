import { EmployeeRole } from './enums/enumEmployeeRole';

export interface EmployeeData {
    id?: number;
    name: string;
    cpf: string;
    birthDate: string;
    phone: string;
    role: EmployeeRole;
    createdAt: string;
    farmId: number;
}