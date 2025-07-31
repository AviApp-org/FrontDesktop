import React, { useEffect, useState } from 'react';
import { ClientRegisterTemplate } from '@/templates/ClientRegister';
import { ClientData } from '@/@types/ClientData';
import { ClientFormData } from '@/hooks/useClient';
import clientHook from '@/hooks/useClient';

const ClientRegister: React.FC = () => {
  // Estados
  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<ClientFormData>(clientHook.getInitialFormData());
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carregar clientes
  const loadClients = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await clientHook.listClients();
      setClients(data);
    } catch (e) {
      console.error('Erro ao buscar clientes:', e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddClient = () => {
    setFormData(clientHook.getInitialFormData());
    setFormErrors({});
    setEditingId(null);
    setOpenDialog(true);
  };

  const handleEditClient = (client: ClientData) => {
    setFormData({
      name: client.name,
      email: client.email,
      cnpj: client.cnpj,
      phone: client.phone,
      status: client.status
    });
    setFormErrors({});
    setEditingId(client.id ?? null);
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
    setFormData(clientHook.getInitialFormData());
    setEditingId(null);
    setFormErrors({});
    setIsSubmitting(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    
    if (name === 'cnpj') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 14) {
        setFormData({ ...formData, [name]: cleaned });
      }
    } else if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Limpar erro do campo quando usuário começar a digitar
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleSubmit = async () => {
    if (!clientHook.validateClientForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const sanitizedData = clientHook.sanitizeClientData(formData);
      
      if (editingId) {
        await clientHook.updateClientWithToast(editingId, sanitizedData);
      } else {
        await clientHook.createClientWithToast(sanitizedData);
      }
      
      await loadClients();
      handleCloseModal();
    } catch (error) {
      setFormErrors({ submit: 'Erro ao salvar cliente' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: number | null) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    
    try {
      await clientHook.deleteClientWithToast(confirmDelete);
      await loadClients();
    } catch (error) {
      setFormErrors({ submit: 'Erro ao excluir cliente' });
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <ClientRegisterTemplate
      // Estados
      isLoading={isLoading}
      isError={isError}
      openDialog={openDialog}
      editingId={editingId}
      confirmDelete={confirmDelete}
      searchTerm={searchTerm}
      formData={formData}
      formErrors={formErrors}
      isSubmitting={isSubmitting}

      // Dados
      clients={clients}

      // Callbacks
      onSearch={handleSearch}
      onAddClient={handleAddClient}
      onEditClient={handleEditClient}
      onDeleteClient={handleDeleteClick}
      onCloseModal={handleCloseModal}
      onSubmit={handleSubmit}
      onInputChange={handleInputChange}
      onCancelDelete={handleCancelDelete}
      onConfirmDelete={handleConfirmDelete}
    />
  );
};

export default ClientRegister;
