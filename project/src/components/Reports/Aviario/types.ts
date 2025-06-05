import { AviaryReport } from '../../../@types/reportTypes';

export interface AviarioProps {
  aviary: AviaryReport;
  open: boolean;
  toggle: () => void;
}
