import { ClientStatus } from '../Enums';

export interface ClientData {
  id?: number;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  status: ClientStatus;
}