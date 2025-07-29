import { AddressData } from "./AddressData";
import { EmployeeData } from "./EmployeeData";

export interface FarmData {
  id?: number;
  name: string;
  addressId: AddressData;
  clientId: number;
  employeesId: EmployeeData[];
}