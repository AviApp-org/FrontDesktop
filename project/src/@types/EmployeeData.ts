export enum EmployeeRole {
  MANAGER = 'MANAGER',
  WORKER = 'WORKER'
}

export interface EmployeeData {
    id: number;
    name: string;
    cpf: string;
    birthDate: string;
    phone: string;
    role: EmployeeRole;
    createdAt: string;
    farmId: number;
}