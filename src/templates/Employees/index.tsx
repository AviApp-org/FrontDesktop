import React from 'react';
import { EmployeeHeader } from '@/components/EmployeeHeader';
import { EmployeeTable } from '@/components/EmployeeTable';
import { EmployeeModal } from '@/components/EmployeeModal';
import { DeleteConfirmDialog } from '@/components/DeleteButton';
import { EmployeeData } from '@/@types/EmployeeData';

interface Props {
    employees: EmployeeData[];
    isLoading: boolean;
    isError: boolean;
    openDialog: boolean;
    editingId: number | null;
    formData: EmployeeData;
    formErrors: Record<string, string>;
    isSubmitting: boolean;
    confirmDelete: number | null;
    searchTerm: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddEmployee: () => void;
    onEditEmployee: (employee: EmployeeData) => void;
    onDeleteEmployee: (id: number) => void;
    onCloseModal: () => void;
    onSubmit: () => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    onCancelDelete: () => void;
    onConfirmDelete: () => void;
}

export const EmployeeTemplate: React.FC<Props> = ({
    employees,
    isLoading,
    isError,
    openDialog,
    editingId,
    formData,
    formErrors,
    isSubmitting,
    confirmDelete,
    searchTerm,
    onSearch,
    onAddEmployee,
    onEditEmployee,
    onDeleteEmployee,
    onCloseModal,
    onSubmit,
    onInputChange,
    onCancelDelete,
    onConfirmDelete
}) => {
    return (
        <div className="mx-auto p-4">
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
                <EmployeeHeader
                    searchTerm={searchTerm}
                    totalEmployees={employees.length}
                    onSearch={onSearch}
                    onAddEmployee={onAddEmployee}
                />

                <div className="mt-6">
                    <EmployeeTable
                        employees={employees}
                        isLoading={isLoading}
                        isError={isError}
                        onEdit={onEditEmployee}
                        onDelete={onDeleteEmployee}
                    />
                </div>

                <EmployeeModal
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
            </div>
        </div>
    );
};