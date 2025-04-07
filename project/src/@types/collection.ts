import { Key } from "react";
import { ReactNode } from "react";

export interface Aviary {
  id: Key | null | undefined;
  name: ReactNode;
  currentBirds: any;
  initialBrids: any;
  isActive: boolean;

}

export interface CollectionEntry {
  time: string;
  collector: string;
  status: string;
  units?: number;
  cages?: string;
  notes?: string;
}

export interface DeadBirds {
  male: number;
  female: number;
}

export interface Category {
  name: string;
  total: number;
  cages: string;
  quantity: number;
}
