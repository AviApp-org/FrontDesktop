import { useState, useEffect } from 'react';
import { EmployeeData } from '../@types/EmployeeData';
import { EmployeeRole } from '../@types/enums/enumEmployeeRole';
import { formatDateForBackend } from '../utils/formatDate';
import { formatCPF, formatPhone, isValidCPF } from '../utils/validators';
import employeeHook from './useEmployees';

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

  // Estados para gerenciar os dados dos funcionários
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Carregar funcionários
  const fetchEmployees = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const employeesData = await employeeHook.getEmployee();
      setEmployees(employeesData);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar funcionários na inicialização
  useEffect(() => {
    fetchEmployees();
  }, []);

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
      setFormData({
        name: employee.name,
        cpf: employee.cpf,
        birthDate: employee.birthDate, 
        phone: employee.phone,
        role: employee.role,
        createdAt: employee.createdAt,
        farmId: employee.farmId
      });
      
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
      const formattedData = {
        ...formData,
        cpf: formatCPF(formData.cpf),
        phone: formatPhone(formData.phone),
        birthDate: formatDateForBackend(formData.birthDate),
      };

      console.log('📝 Dados formatados para envio:', formattedData);
      console.log('🔄 Modo de edição:', !!editingId);

      if (editingId) {
        await employeeHook.updateEmployee(editingId, formattedData);
        console.log('✅ Funcionário atualizado com sucesso');
      } else {
        await employeeHook.createEmployee(formattedData);
        console.log('✅ Funcionário criado com sucesso');
      }
      
      // Recarregar a lista de funcionários
      await fetchEmployees();
      handleCloseDialog();
    } catch (error) {
      console.error('❌ Erro ao salvar funcionário:', error);
      
      let errorMessage = 'Erro ao salvar funcionário. Tente novamente.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setFormErrors({ 
        submit: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: number | null) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      try {
        await employeeHook.deleteEmployee(confirmDelete);
        console.log('✅ Funcionário excluído com sucesso');
        // Recarregar a lista de funcionários
        await fetchEmployees();
      } catch (error) {
        console.error('❌ Erro ao excluir funcionário:', error);
        
        let errorMessage = 'Erro ao excluir funcionário. Tente novamente.';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        setFormErrors({
          submit: errorMessage
        });
      }
      setConfirmDelete(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Funcionários filtrados
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cpf.includes(searchTerm) ||
    employee.phone.includes(searchTerm)
  );

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
    
    // Função para recarregar dados
    refetch: fetchEmployees,
  };
};
