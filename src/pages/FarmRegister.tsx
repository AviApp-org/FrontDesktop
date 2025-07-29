import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { FarmData } from '../@types/FarmData';
import farmHook from '../hooks/useFarm';
import FarmModal from '../components/FarmModal';
import FarmHeader from '../components/FarmPageHeader';
import FarmTableCard from '../components/FarmTableCard';

const initialFormData: FarmData = {
  name: '',
  managerName: '',
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: ''
};

const FarmRegister: React.FC = () => {
  // Estados principais
  const [farms, setFarms] = useState<FarmData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Estados do modal
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FarmData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Estados para busca e delete
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // 🔄 Carregar todas as fazendas
  const loadFarms = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const farmsData = await farmHook.getFarms();
      console.log('✅ Fazendas carregadas:', farmsData);
      setFarms(farmsData);
    } catch (error) {
      console.error('❌ Erro ao carregar fazendas:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔍 Buscar fazenda por ID
  const loadFarmById = async (farmId: number) => {
    try {
      const farmData = await farmHook.getFarmByID(farmId);
      console.log('✅ Fazenda encontrada:', farmData);
      return farmData;
    } catch (error) {
      console.error('❌ Erro ao buscar fazenda:', error);
      return null;
    }
  };

  // ➕ Criar nova fazenda
  const createFarm = async (farmData: FarmData) => {
    try {
      setIsSubmitting(true);
      const newFarm = await farmHook.createFarm(farmData);
      console.log('✅ Fazenda criada:', newFarm);
      await loadFarms(); // Recarregar lista
      return newFarm;
    } catch (error) {
      console.error('❌ Erro ao criar fazenda:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🗑️ Deletar fazenda
  const deleteFarm = async (farmId: string) => {
    try {
      await farmHook.deleteFarm(farmId);
      console.log('✅ Fazenda deletada');
      await loadFarms(); // Recarregar lista
    } catch (error) {
      console.error('❌ Erro ao deletar fazenda:', error);
      throw error;
    }
  };

  // Carregar fazendas na inicialização
  useEffect(() => {
    loadFarms();
  }, []);

  // Validação do formulário
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome da fazenda é obrigatório';
    }
    
    if (!formData.managerName.trim()) {
      errors.managerName = 'Nome do responsável é obrigatório';
    }

    if (!formData.cep.trim()) {
      errors.cep = 'CEP é obrigatório';
    }

    if (!formData.street.trim()) {
      errors.street = 'Rua é obrigatória';
    }

    if (!formData.number.trim()) {
      errors.number = 'Número é obrigatório';
    }

    if (!formData.neighborhood.trim()) {
      errors.neighborhood = 'Bairro é obrigatório';
    }

    if (!formData.city.trim()) {
      errors.city = 'Cidade é obrigatória';
    }

    if (!formData.state.trim()) {
      errors.state = 'Estado é obrigatório';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handlers do modal
  const handleOpenDialog = (farm?: FarmData) => {
    if (farm) {
      console.log('📝 Editando fazenda:', farm);
      setFormData(farm);
      setEditingId(farm.id ?? null);
    } else {
      setFormData(initialFormData);
      setEditingId(null);
    }
    setFormErrors({});
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setFormData(initialFormData);
    setEditingId(null);
    setFormErrors({});
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (editingId) {
        // TODO: Implementar update quando necessário
        console.log('Atualização ainda não implementada');
      } else {
        await createFarm(formData);
      }
      handleCloseDialog();
    } catch (error) {
      let errorMessage = 'Erro ao salvar fazenda. Tente novamente.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setFormErrors({ submit: errorMessage });
    }
  };

  // Handlers de delete
  const handleDeleteClick = (farmId: string) => {
    setConfirmDelete(farmId);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      try {
        await deleteFarm(confirmDelete);
        setConfirmDelete(null);
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    }
  };

  // Handler de busca
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fazendas filtradas
  const filteredFarms = farms.filter(farm => 
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.managerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <FarmHeader 
        onNewFarm={() => handleOpenDialog()}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        totalFarms={filteredFarms.length}
      />
      
      <FarmTableCard 
        farms={filteredFarms} 
        isLoading={isLoading} 
        isError={isError}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteClick}
      />
      
      <FarmModal 
        open={open} 
        onClose={handleCloseDialog}
        formData={formData}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        editingId={editingId}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      {/* Dialog de confirmação de delete */}
      {confirmDelete && (
        <div>
          {/* Aqui você pode adicionar um Dialog de confirmação */}
          <button onClick={handleConfirmDelete}>Confirmar Delete</button>
          <button onClick={() => setConfirmDelete(null)}>Cancelar</button>
        </div>
      )}
    </Box>
  );
};

export default FarmRegister;
