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
      const data = await employeeHook.getEmployee();
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
  }, []);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
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

    if (!formData.name.trim()) errors.name = 'Nome é obrigatório';
    if (!formData.cpf.trim()) {
      errors.cpf = 'CPF é obrigatório';
    } else if (!isValidCPF(formData.cpf)) {
      errors.cpf = 'CPF inválido';
    }
    if (!formData.birthDate.trim()) errors.birthDate = 'Data de nascimento é obrigatória';
    if (!formData.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Telefone inválido';
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
      } else {
        await employeeHook.createEmployee(formattedData);
      }
      await fetchEmployees();
      handleCloseDialog();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro ao salvar funcionário';
      setFormErrors({ submit: message });
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
      await fetchEmployees();
    } catch (e) {
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
