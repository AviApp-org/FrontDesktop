import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import { EmployeeFormData } from '../../hooks/useEmployeeManagement';
import { EmployeeRole } from '../../@types/enums/enumEmployeeRole';

interface EmployeeModalProps {
  open: boolean;
  editingId: number | null;
  formData: EmployeeFormData;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
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
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {editingId ? 'Editar Funcionário' : 'Adicionar Funcionário'}
      </DialogTitle>
      <DialogContent>
        {formErrors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formErrors.submit}
          </Alert>
        )}
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            fullWidth
            required
            disabled={isSubmitting}
          />
          
          <TextField
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={onInputChange}
            error={!!formErrors.cpf}
            helperText={formErrors.cpf}
            fullWidth
            required
            disabled={isSubmitting}
            inputProps={{ maxLength: 11 }}
            placeholder="Digite apenas números"
          />
          
          {/* ✅ Campo de Data de Nascimento */}
          <TextField
            label="Data de Nascimento"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={onInputChange}
            error={!!formErrors.birthDate}
            helperText={formErrors.birthDate}
            fullWidth
            required
            disabled={isSubmitting}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <TextField
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
            fullWidth
            required
            disabled={isSubmitting}
            inputProps={{ maxLength: 11 }}
            placeholder="Digite apenas números"
          />
          
          <FormControl fullWidth disabled={isSubmitting}>
            <InputLabel>Cargo</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={onInputChange}
              label="Cargo"
            >
              {Object.entries(roleLabels).map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button 
          onClick={onSubmit} 
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : (editingId ? 'Salvar' : 'Adicionar')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
