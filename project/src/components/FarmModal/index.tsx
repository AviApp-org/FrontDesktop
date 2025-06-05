import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { FarmModalProps } from './types';


const FarmModal: React.FC<FarmModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    managerName: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call your API or parent handler here
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cadastrar Granja</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Nome"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Responsável"
              name="managerName"
              value={form.managerName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="CEP"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ maxLength: 8 }}
            />
            <TextField
              label="Rua"
              name="street"
              value={form.street}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Número"
              name="number"
              value={form.number}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Bairro"
              name="neighborhood"
              value={form.neighborhood}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Cidade"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Estado"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FarmModal;