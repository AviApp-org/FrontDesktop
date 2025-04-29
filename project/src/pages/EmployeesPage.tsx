import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import { green, blue, orange, grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '../hooks/useEmployees';
import { EmployeeData, EmployeeRole } from '../@types/EmployeeData';
import { useFarm } from '../contexts/FarmContext';

interface EmployeeFormData {
  name: string;
  cpf: string;
  phone: string;
  role: EmployeeRole;
  farmId: number;
}

const initialFormData: EmployeeFormData = {
  name: '',
  cpf: '',
  phone: '',
  role: EmployeeRole.WORKER,
  farmId: 0
};

// Função para validar CPF
const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};

// Função para formatar CPF
const formatCPF = (cpf: string): string => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Função para formatar telefone
const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

const EmployeesPage: React.FC = () => {
  const { farmId } = useFarm();
  
  const { data: employees, isLoading, isError, refetch } = useEmployees(farmId);
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Forçar atualização da lista após operações
  useEffect(() => {
    if (createEmployee.isSuccess || updateEmployee.isSuccess || deleteEmployee.isSuccess) {
      refetch();
    }
  }, [createEmployee.isSuccess, updateEmployee.isSuccess, deleteEmployee.isSuccess, refetch]);

  const handleOpenDialog = (employee?: EmployeeData) => {
    if (employee) {
      setFormData({
        name: employee.name,
        cpf: employee.cpf,
        phone: employee.phone,
        role: employee.role,
        farmId: employee.farmId
      });
      setEditingId(employee.id);
    } else {
      setFormData({ ...initialFormData, farmId: Number(farmId) });
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
  };

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
    
    if (!formData.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Telefone inválido';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 11) {
        setFormData({
          ...formData,
          [name]: cleaned,
        });
      }
    } else if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 11) {
        setFormData({
          ...formData,
          [name]: cleaned,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formattedData = {
        ...formData,
        cpf: formatCPF(formData.cpf),
        phone: formatPhone(formData.phone)
      };

      if (editingId) {
        await updateEmployee.mutateAsync({
          id: editingId,
          data: formattedData,
        });
      } else {
        await createEmployee.mutateAsync(formattedData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
      setFormErrors({ submit: 'Erro ao salvar funcionário. Tente novamente.' });
    }
  };

  const handleDeleteClick = (id: number) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      try {
        await deleteEmployee.mutateAsync(confirmDelete);
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
      }
      setConfirmDelete(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees?.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cpf.includes(searchTerm) ||
    employee.phone.includes(searchTerm)
  ) || [];

  const roleLabels: Record<EmployeeRole, string> = {
    [EmployeeRole.MANAGER]: 'Gerente',
    [EmployeeRole.WORKER]: 'Colaborador'
  };

  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        fontWeight="bold" 
        color="text.primary" 
        mb={3}
      >
        Funcionários
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Card elevation={0} sx={{ bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" sx={{ width: '60%' }}>
                  <TextField
                    placeholder="Buscar funcionários..."
                    value={searchTerm}
                    onChange={handleSearch}
                    size="small"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                    }}
                  />
                  <Tooltip title="Filtros avançados">
                    <IconButton sx={{ ml: 1 }}>
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  sx={{ 
                    bgcolor: green[600], 
                    '&:hover': { bgcolor: green[800] },
                    px: 3
                  }}
                  onClick={() => handleOpenDialog()}
                >
                  Adicionar Funcionário
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card sx={{ border: '1px solid', borderColor: 'divider', bgcolor: blue[50] }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={blue[700]}>
                {employees?.length || 0}
              </Typography>
              <Typography variant="body2" color={blue[900]}>
                Total de Funcionários
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 0 }}>
              {isLoading ? (
                <Box display="flex" justifyContent="center" my={4}>
                  <CircularProgress sx={{ color: green[500] }} />
                </Box>
              ) : isError ? (
                <Box display="flex" justifyContent="center" my={4}>
                  <Typography color="error">Erro ao carregar funcionários. Por favor, tente novamente mais tarde.</Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>CPF</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Cargo</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                          <TableRow key={employee.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ mr: 2, bgcolor: blue[100], color: blue[700] }}>
                                  {employee.name.charAt(0)}
                                </Avatar>
                                {employee.name}
                              </Box>
                            </TableCell>
                            <TableCell>{formatCPF(employee.cpf)}</TableCell>
                            <TableCell>{formatPhone(employee.phone)}</TableCell>
                            <TableCell>
                              <Chip 
                                label={roleLabels[employee.role]} 
                                color={employee.role === EmployeeRole.MANAGER ? 'primary' : 'default'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="Visualizar detalhes">
                                <IconButton size="small" sx={{ color: blue[700] }}>
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Editar">
                                <IconButton 
                                  size="small" 
                                  sx={{ color: blue[700] }}
                                  onClick={() => handleOpenDialog(employee)}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Excluir">
                                <IconButton 
                                  size="small" 
                                  sx={{ color: blue[700] }}
                                  onClick={() => handleDeleteClick(employee.id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            Nenhum funcionário encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Dialog 
        open={!!confirmDelete} 
        onClose={() => setConfirmDelete(null)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza de que deseja excluir este funcionário?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
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
              onChange={handleInputChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
              required
            />
            <TextField
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              error={!!formErrors.cpf}
              helperText={formErrors.cpf}
              fullWidth
              required
              inputProps={{ maxLength: 11 }}
            />
            <TextField
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              fullWidth
              required
              inputProps={{ maxLength: 11 }}
            />
            <FormControl fullWidth>
              <InputLabel>Cargo</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary"
            variant="contained"
          >
            {editingId ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeesPage;
