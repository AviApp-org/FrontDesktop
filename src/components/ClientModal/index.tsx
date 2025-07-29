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
  
} from '@mui/material';
import { ClientModalProps } from './types';



export const ClientModal: React.FC<ClientModalProps> = ({
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
        {editingId ? 'Editar Cliente' : 'Adicionar Cliente'}
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
            label="E-mail"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            fullWidth
            required
            disabled={isSubmitting}
          />
          <TextField
            label="CNPJ"
            name="cnpj"
            value={formData.cnpj}
            onChange={onInputChange}
            error={!!formErrors.cnpj}
            helperText={formErrors.cnpj}
            fullWidth
            required
            disabled={isSubmitting}
            inputProps={{ maxLength: 14 }}
            placeholder="Digite apenas números"
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
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={onInputChange}
              label="Status"
            >
              <MenuItem value="ACTIVE">Ativo</MenuItem>
              <MenuItem value="INACTIVE">Inativo</MenuItem>
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