import React from 'react';
import { EmployeeData } from '../../@types/EmployeeData';
import { EmployeeRole } from '../../@types/enums/enumEmployeeRole';

interface EmployeeModalProps {
  open: boolean;
  editingId: number | null;
  formData: EmployeeData;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

const roleLabels: Record<EmployeeRole, string> = {
  [EmployeeRole.MANAGER]: 'Gerente',
  [EmployeeRole.WORKER]: 'Colaborador'
};

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  open,
  editingId,
  formData,
  formErrors,
  isSubmitting,
  onClose,
  onSubmit,
  onInputChange
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Editar Funcionário' : 'Adicionar Funcionário'}
        </h2>

        {formErrors.submit && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {formErrors.submit}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              disabled={isSubmitting}
              className={`w-full border rounded px-3 py-2 text-sm ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.name && <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CPF *</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={onInputChange}
              disabled={isSubmitting}
              maxLength={11}
              placeholder="Digite apenas números"
              className={`w-full border rounded px-3 py-2 text-sm ${
                formErrors.cpf ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.cpf && <p className="text-xs text-red-600 mt-1">{formErrors.cpf}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data de Nascimento *</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={onInputChange}
              disabled={isSubmitting}
              className={`w-full border rounded px-3 py-2 text-sm ${
                formErrors.birthDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.birthDate && <p className="text-xs text-red-600 mt-1">{formErrors.birthDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telefone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              disabled={isSubmitting}
              maxLength={11}
              placeholder="Digite apenas números"
              className={`w-full border rounded px-3 py-2 text-sm ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.phone && <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cargo *</label>
            <select
              name="role"
              value={formData.role}
              onChange={onInputChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              {Object.entries(roleLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
          >
            {isSubmitting ? 'Salvando...' : editingId ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
};
