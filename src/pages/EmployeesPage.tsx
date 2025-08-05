import React, { useEffect, useState } from 'react';
import { EmployeeTemplate } from '@/templates/Employees';
import { useFarm } from '@/contexts/FarmContext';
import { EmployeeData } from '@/@types/EmployeeData';
import { EmployeeRole } from '@/@types/enums/enumEmployeeRole';
import {
  formatCPF,
  formatPhone,
  isValidCPF
} from '@/utils/validators';
import {
  formatDateForBackend,
  formatDateForInput
} from '@/utils/formatDate';
import employeeHook from '@/hooks/useEmployees';
import { SelectChangeEvent } from '@mui/material';
import { toast } from 'react-toastify';

const initialFormData: EmployeeData = {
  name: '',
  cpf: '',
  birthDate: '',
  phone: '',
  role: EmployeeRole.WORKER,
  createdAt: '',
  farmId: 0
};

const EmployeesPage: React.FC = () => {
  const { farmId } = useFarm();
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [formData, setFormData] = useState<EmployeeData>({ ...initialFormData, farmId });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await employeeHook.getEmployeeByFarmID(farmId);
      setEmployees(data);
    } catch (e) {
      console.error('Erro ao buscar funcionários:', e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchEmployees();
  }, [farmId]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenDialog = (employee?: EmployeeData) => {
    if (employee) {
      setFormData({
        ...employee,
        cpf: employee.cpf.replace(/\D/g, ''),
        phone: employee.phone.replace(/\D/g, ''),
        birthDate: formatDateForInput(employee.birthDate)
      });
      setEditingId(employee.id ?? null);
    } else {
      setFormData({ ...initialFormData, farmId });
      setEditingId(null);
    }

    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ ...initialFormData, farmId });
    setEditingId(null);
    setFormErrors({});
    setIsSubmitting(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (['cpf', 'phone'].includes(name)) {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 11) {
        setFormData(prev => ({ ...prev, [name]: cleaned }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };


  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim())
      toast.error('Nome é obrigatório');
    if (!formData.cpf.trim()) {
      toast.error('CPF é obrigatório');
    } else if (!isValidCPF(formData.cpf)) {
      toast.error('CPF inválido');

    }
    if (!formData.birthDate.trim())
      toast.error('Data de nascimento é obrigatória');
    if (!formData.phone.trim()) {
      toast.error('Telefone é obrigatório');

    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      toast.error('Telefone inválido');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormErrors({});

    const formattedData = {
      ...formData,
      cpf: formatCPF(formData.cpf),
      phone: formatPhone(formData.phone),
      birthDate: formatDateForBackend(formData.birthDate)
    };

    try {
      if (editingId) {
        await employeeHook.updateEmployee(editingId, formattedData);
        toast.success('Funcionário atualizado com sucesso!');
      } else {
        await employeeHook.createEmployee(formattedData);
        toast.success('Funcionário criado com sucesso!');
      }
      await fetchEmployees();
      handleCloseDialog();
    } catch (e) {
      toast.error('Erro ao salvar funcionário');
      setFormErrors({ submit: 'Erro ao salvar funcionário' });
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
      await employeeHook.deleteEmployee(confirmDelete);
      toast.success('Funcionário excluído com sucesso!');
      await fetchEmployees();
    } catch (e) {
      toast.error('Erro ao excluir funcionário');
      setFormErrors({
        submit: e instanceof Error ? e.message : 'Erro ao excluir funcionário'
      });
    } finally {
      setConfirmDelete(null);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.cpf.includes(searchTerm) ||
    emp.phone.includes(searchTerm)
  );

  return (
    <EmployeeTemplate
      employees={filteredEmployees}
      isLoading={isLoading}
      isError={isError}
      openDialog={openDialog}
      editingId={editingId}
      formData={formData}
      formErrors={formErrors}
      isSubmitting={isSubmitting}
      confirmDelete={confirmDelete}
      searchTerm={searchTerm}
      onSearch={handleSearch}
      onAddEmployee={() => handleOpenDialog()}
      onEditEmployee={handleOpenDialog}
      onDeleteEmployee={handleDeleteClick}
      onCloseModal={handleCloseDialog}
      onSubmit={handleSubmit}
      onInputChange={handleInputChange}
      onCancelDelete={() => handleDeleteClick(null)}
      onConfirmDelete={handleConfirmDelete}
    />
  );
};

export default EmployeesPage;
