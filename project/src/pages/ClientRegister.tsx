import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useFarm } from '../contexts/FarmContext';
import { useClientManagement } from '../hooks/useClientManagement';
import { ClientHeader } from '../components/ClientHeader';
import { ClientTable } from '../components/ClientTable';
import { ClientModal } from '../components/ClientModal';
import { DeleteConfirmDialog } from '../components/DeleteButton';

const ClientRegister: React.FC = () => {
  const { farmId } = useFarm();
  const clientManagement = useClientManagement(farmId);

  useEffect(() => {
    clientManagement.loadClients();
  }, [farmId]);

  return (
    <Box>
      <ClientHeader
        searchTerm={clientManagement.searchTerm}
        totalClients={clientManagement.clients.length}
        onSearch={(e) => clientManagement.handleSearch(e.target.value)}
        onAddClient={() => clientManagement.handleOpenDialog()}
      />

      <Box sx={{ mt: 3 }}>
        <ClientTable
          clients={clientManagement.clients.filter((c) => typeof c.id === 'number') as any}
          isLoading={clientManagement.isLoading}
          isError={clientManagement.isError}
          onEdit={(client) => clientManagement.handleOpenDialog(client.id)}
          onDelete={clientManagement.handleDeleteClick}
        />
      </Box>

      <ClientModal
        open={clientManagement.openDialog}
        editingId={clientManagement.editingId}
        formData={clientManagement.formData}
        formErrors={clientManagement.formErrors}
        isSubmitting={clientManagement.isSubmitting}
        onClose={clientManagement.handleCloseDialog}
        onSubmit={clientManagement.handleSubmit}
        onInputChange={clientManagement.handleInputChange}
      />

      <DeleteConfirmDialog
        open={!!clientManagement.confirmDelete}
        onClose={() => clientManagement.handleDeleteClick(null)}
        onConfirm={clientManagement.handleConfirmDelete}
      />
    </Box>
  );
};

export default ClientRegister;
