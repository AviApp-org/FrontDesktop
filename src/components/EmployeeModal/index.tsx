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
    <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4">
        <h2 className="text-xl font-semibold text-white">
          {editingId ? 'Editar Funcionário' : 'Adicionar Funcionário'}
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo Nome */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite o nome completo"
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          {/* Campo CPF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={onInputChange}
              disabled={isSubmitting}
              maxLength={11}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                formErrors.cpf ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="000.000.000-00"
            />
            {formErrors.cpf && (
              <p className="mt-1 text-sm text-red-600">{formErrors.cpf}</p>
            )}
          </div>

          {/* Campo Data Nascimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={onInputChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                formErrors.birthDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{formErrors.birthDate}</p>
            )}
          </div>

          {/* Campo Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              disabled={isSubmitting}
              maxLength={11}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="(00) 00000-0000"
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>

          {/* Campo Cargo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cargo *</label>
            <select
              name="role"
              value={formData.role}
              onChange={onInputChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            >
              {Object.entries(roleLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting || Object.keys(formErrors).length > 0}
            className={`px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-teal-700 transition ${
              isSubmitting || Object.keys(formErrors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </span>
            ) : editingId ? 'Salvar Alterações' : 'Adicionar Funcionário'}
          </button>
        </div>
      </div>
    </div>
  </div>
);
};