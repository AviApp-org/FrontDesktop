import { useState, useEffect } from 'react';
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from './useEmployees';
import { EmployeeData } from '../@types/EmployeeData';
import { EmployeeRole } from '../@types/enums/enumEmployeeRole';
import { formatDateForBackend } from '../utils/formatDate'; // ✅ Importar funções de data
import { formatCPF, formatPhone, isValidCPF } from '../utils/validators';


const initialFormData: EmployeeData = {
  name: '',
  cpf: '',
  birthDate: '',
  phone: '',
  role: EmployeeRole.WORKER,
  createdAt: '',
  farmId: 0
};

export const useEmployeeManagement = (farmId: number) => {
  // Estados
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<EmployeeData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks de API
  const { data: employees, isLoading, isError, refetch } = useEmployees(farmId);
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();

  // Forçar atualização da lista após operações
  useEffect(() => {
    if (createEmployee.isSuccess || updateEmployee.isSuccess || deleteEmployee.isSuccess) {
      refetch();
    }
  }, [createEmployee.isSuccess, updateEmployee.isSuccess, deleteEmployee.isSuccess, refetch]);

  // Validação do formulário
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }
    
    if (!formData.cpf.trim()) {
      errors.cpf = 'CPF é obrigatório';
    } else if (!isValidCPF(formData.cpf)) {
      errors.cpf = 'CPF inválido';
    }

    if (!formData.birthDate.trim()) {
      errors.birthDate = 'Data de nascimento é obrigatória';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Telefone inválido';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handlers
  const handleOpenDialog = (employee?: EmployeeData) => {
    if (employee) {
      console.log('🔍 Data original do funcionário:', employee.birthDate); // ✅ Debug
      
      setFormData({
        name: employee.name,
        cpf: employee.cpf,
        birthDate: (employee.birthDate), // ✅ Converter DD/MM/YYYY → YYYY-MM-DD
        phone: employee.phone,
        role: employee.role,
        createdAt: employee.createdAt,
        farmId: employee.farmId
      });
      
      console.log('🔍 Data formatada para o form:', (employee.birthDate)); // ✅ Debug
      setEditingId(employee.id ?? 0);
    } else {
      setFormData({ ...initialFormData, farmId });
      setEditingId(null);
    }
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormData);
    setEditingId(null);
    setFormErrors({});
    setIsSubmitting(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 11) {
        setFormData({ ...formData, [name]: cleaned });
      }
    } else if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 11) {
        setFormData({ ...formData, [name]: cleaned });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormErrors({});

    try {
      console.log('🔍 Data do form antes da formatação:', formData.birthDate); // ✅ Debug
      
      const formattedData = {
        ...formData,
        cpf: formatCPF(formData.cpf),
        phone: formatPhone(formData.phone),
        birthDate: formatDateForBackend(formData.birthDate), // ✅ Converter YYYY-MM-DD → DD/MM/YYYY
      };

      console.log('🔍 Dados sendo enviados:', formattedData); // ✅ Debug

      if (editingId) {
        await updateEmployee.mutateAsync({
          id: editingId,
          data: formattedData,
        });
      } else {
        await createEmployee.mutateAsync(formattedData);
      }
      
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
      setFormErrors({ 
        submit: error instanceof Error ? error.message : 'Erro ao salvar funcionário. Tente novamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: number | null) => { // ✅ Aceitar null
    setConfirmDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      try {
        await deleteEmployee.mutateAsync(confirmDelete);
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
      }
      setConfirmDelete(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Funcionários filtrados
  const filteredEmployees = employees?.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cpf.includes(searchTerm) ||
    employee.phone.includes(searchTerm)
  ) || [];

  return {
    // Estados
    openDialog,
    formData,
    editingId,
    confirmDelete,
    searchTerm,
    formErrors,
    isSubmitting,
    
    // Dados
    employees: filteredEmployees,
    isLoading,
    isError,
    
    // Handlers
    handleOpenDialog,
    handleCloseDialog,
    handleInputChange,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleSearch,
  };
};
