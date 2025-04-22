import React, { useState } from 'react';
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
  Tooltip
} from '@mui/material';
import { green, blue, orange, grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '../hooks/useEmployees';
import { EmployeeData } from '../@types/EmployeeData';
import { useFarm } from '../contexts/FarmContext';

interface EmployeeFormData {
  name: string;
  cpf: string;
  phone: string;
  role: number;
  farmId: string;
}

const initialFormData: EmployeeFormData = {
  name: '',
  cpf: '',
  phone: '',
  role: 1,
  farmId: ''
};

const EmployeesPage: React.FC = () => {
  const { farmId } = useFarm();
  
  const { data: employees, isLoading, isError } = useEmployees(farmId);
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      setFormData({ ...initialFormData, farmId });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'role' ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateEmployee.mutateAsync({
          id: editingId,
          data: formData,
        });
      } else {
        await createEmployee.mutateAsync(formData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
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

  // Filtrar funcionários com base no termo de pesquisa
  const filteredEmployees = employees?.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cpf.includes(searchTerm) ||
    employee.phone.includes(searchTerm)
  ) || [];

  const roleLabels: Record<number, string> = {
    1: 'Administrador',
    2: 'Gerente',
    3: 'Funcionário',
    4: 'Visitante',
  };

  return (
    <Box>
      {/* Título da página */}
      <Typography 
        variant="h4" 
        component="h1" 
        fontWeight="bold" 
        color="text.primary" 
        mb={3}
      >
        Funcionários
      </Typography>
      
      {/* Box para organizar o conteúdo */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Filtros e ações */}
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

        {/* Estatísticas rápidas */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider', bgcolor: blue[50] }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={blue[700]}>
                {employees?.length || 0}
              </Typography>
              <Typography variant="body2" color={blue[900]}>
                Total de Funcionários
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider', bgcolor: green[50] }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={green[700]}>
                {employees?.filter(e => e.role === 3)?.length || 0}
              </Typography>
              <Typography variant="body2" color={green[900]}>
                Funcionários
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider', bgcolor: orange[50] }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={orange[700]}>
                {employees?.filter(e => e.role === 2)?.length || 0}
              </Typography>
              <Typography variant="body2" color={orange[900]}>
                Gerentes
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider', bgcolor: grey[100] }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={grey[700]}>
                {employees?.filter(e => e.role === 1)?.length || 0}
              </Typography>
              <Typography variant="body2" color={grey[900]}>
                Administradores
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Tabela de funcionários */}
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
                            <TableCell>{employee.cpf}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
                            <TableCell>{roleLabels[employee.role] || 'Desconhecido'}</TableCell>
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

      {/* Confirmar exclusão */}
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

      {/* Dialog de cadastro/edição */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingId ? 'Editar Funcionário' : 'Adicionar Funcionário'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Cargo</InputLabel>
            <Select
              name="role"
              value={String(formData.role)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingId ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeesPage;
