import { BatchData as Batch } from '../../@types/BatchData';

export interface BatchTableProps {
  batches: Batch[];
  expandedBatches: string[];
  isActivating: boolean;
  isDeactivating: boolean;
  isSubmitting: boolean;
  onToggleExpansion: (id: string) => void;
  onEdit: (batch: Batch) => void;
  onAction: (action: 'activate' | 'deactivate', id: string) => void;
  children?: (batch: Batch) => React.ReactNode;
}