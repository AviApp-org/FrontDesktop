export enum ClientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface ClientData {
  id?: number;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  status: ClientStatus;
}