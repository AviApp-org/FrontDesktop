import React from 'react';
import { Box } from '@mui/material';
import { useFarm } from '../contexts/FarmContext';
import { useEmployeeManagement } from '../hooks/useEmployeeManagement';
import { EmployeeHeader } from '../components/EmployeeHeader';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeeModal } from '../components/EmployeeModal';
import { DeleteConfirmDialog } from '../components/DeleteButton';
const EmployeesPage: React.FC = () => {
  const { farmId } = useFarm();
  const employeeManagement = useEmployeeManagement(farmId);

  return (
    <Box>
      <EmployeeHeader
        searchTerm={employeeManagement.searchTerm}
        totalEmployees={employeeManagement.employees.length}
        onSearch={employeeManagement.handleSearch}
        onAddEmployee={() => employeeManagement.handleOpenDialog()}
      />

      <Box sx={{ mt: 3 }}>
        <EmployeeTable
          employees={employeeManagement.employees}
          isLoading={employeeManagement.isLoading}
          isError={employeeManagement.isError}
          onEdit={employeeManagement.handleOpenDialog}
          onDelete={employeeManagement.handleDeleteClick}
        />
      </Box>

      <EmployeeModal
        open={employeeManagement.openDialog}
        editingId={employeeManagement.editingId}
        formData={employeeManagement.formData}
        formErrors={employeeManagement.formErrors}
        isSubmitting={employeeManagement.isSubmitting}
        onClose={employeeManagement.handleCloseDialog}
        onSubmit={employeeManagement.handleSubmit}
        onInputChange={employeeManagement.handleInputChange}
      />

      <DeleteConfirmDialog
        open={!!employeeManagement.confirmDelete}
        onClose={() => employeeManagement.handleDeleteClick(null)}
        onConfirm={employeeManagement.handleConfirmDelete}
      />
    </Box>
  );
};

export default EmployeesPage;
