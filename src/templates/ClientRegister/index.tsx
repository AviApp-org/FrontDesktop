import React from 'react';
import { Box } from '@mui/material';
import { ClientHeader } from '@/components/ClientHeader';
import { ClientTable } from '@/components/ClientTable';
import { ClientModal } from '@/components/ClientModal';
import { DeleteConfirmDialog } from '@/components/DeleteButton';
import { ClientData } from '@/@types/ClientData';

interface Props {
  // Estados
  isLoading: boolean;
  isError: boolean;
  openDialog: boolean;
  editingId: number | null;
  confirmDelete: number | null;
  searchTerm: string;
  formData: any;
  formErrors: Record<string, string>;
  isSubmitting: boolean;

  // Dados
  clients: ClientData[];

  // Callbacks
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddClient: () => void;
  onEditClient: (client: ClientData) => void;
  onDeleteClient: (id: number | null) => void;
  onCloseModal: () => void;
  onSubmit: () => void;
  onInputChange: (e: any) => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}

export const ClientRegisterTemplate: React.FC<Props> = ({
  // Estados
  isLoading,
  isError,
  openDialog,
  editingId,
  confirmDelete,
  searchTerm,
  formData,
  formErrors,
  isSubmitting,

  // Dados
  clients,

  // Callbacks
  onSearch,
  onAddClient,
  onEditClient,
  onDeleteClient,
  onCloseModal,
  onSubmit,
  onInputChange,
  onCancelDelete,
  onConfirmDelete
}) => {
  return (
    <Box>
      <ClientHeader
        searchTerm={searchTerm}
        totalClients={clients.length}
        onSearch={onSearch}
        onAddClient={onAddClient}
      />

      <Box sx={{ mt: 3 }}>
        <ClientTable
          clients={clients.filter((c) => typeof c.id === 'number') as any}
          isLoading={isLoading}
          isError={isError}
          onEdit={onEditClient}
          onDelete={onDeleteClient}
        />
      </Box>

      <ClientModal
        open={openDialog}
        editingId={editingId}
        formData={formData}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        onClose={onCloseModal}
        onSubmit={onSubmit}
        onInputChange={onInputChange}
      />

      <DeleteConfirmDialog
        open={!!confirmDelete}
        onClose={onCancelDelete}
        onConfirm={onConfirmDelete}
      />
    </Box>
  );
}; 