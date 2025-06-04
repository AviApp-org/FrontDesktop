export interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  variant?: 'default' | 'highlighted' | 'success' | 'danger' | 'info';
}