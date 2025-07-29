export interface Column<T> {
  key: string;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (record: T) => void;
}