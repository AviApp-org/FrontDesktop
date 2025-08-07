import React, { useEffect, useState } from 'react';
import { FarmData } from '../@types/FarmData';
import farmHook from '../hooks/useFarm';
import FarmModal from '../components/FarmModal';
import FarmHeader from '../components/FarmPageHeader';
import FarmTableCard from '../components/FarmTableCard';

const initialFormData: FarmData = {
  id: 0,
  name: '',
  clientId: 0,
  employeesId: [],
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: ''
};

const FarmRegister: React.FC = () => {
  const [farms, setFarms] = useState<FarmData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FarmData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const loadFarms = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const farmsData = await farmHook.getFarms();
      setFarms(farmsData);
    } catch (error) {
      console.error('❌ Erro ao carregar fazendas:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const createFarm = async (farmData: FarmData) => {
    try {
      setIsSubmitting(true);
      const newFarm = await farmHook.createFarm(farmData);
      await loadFarms();
      return newFarm;
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteFarm = async (farmId: string) => {
    try {
      await farmHook.deleteFarm(farmId);
      await loadFarms();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Nome da fazenda é obrigatório';
    if (!formData.cep.trim()) errors.cep = 'CEP é obrigatório';
    if (!formData.street.trim()) errors.street = 'Rua é obrigatória';
    if (!formData.number.trim()) errors.number = 'Número é obrigatório';
    if (!formData.neighborhood.trim()) errors.neighborhood = 'Bairro é obrigatório';
    if (!formData.city.trim()) errors.city = 'Cidade é obrigatória';
    if (!formData.state.trim()) errors.state = 'Estado é obrigatório';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenDialog = (farm?: FarmData) => {
    if (farm) {
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
        console.log('Atualização ainda não implementada');
      } else {
        await createFarm(formData);
      }
      handleCloseDialog();
    } catch (error) {
      setFormErrors({
        submit: error instanceof Error ? error.message : 'Erro ao salvar fazenda. Tente novamente.',
      });
    }
  };

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredFarms = farms.filter((farm) =>
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 bg-gray-50">
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

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 space-y-4 w-full max-w-md">
            <p className="text-gray-800 font-semibold">Tem certeza que deseja deletar esta fazenda?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleConfirmDelete}
              >
                Confirmar Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmRegister;
