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
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import { green, blue, orange, red } from '@mui/material/colors';
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
  email: string;
  address: string;
  birthDate: string;
  department: string;
  status: string;
  hireDate: string;
}

const initialFormData: EmployeeFormData = {
  name: '',
  cpf: '',
  phone: '',
  role: 1,
  farmId: '',
  email: '',
  address: '',
  birthDate: '',
  department: '',
  status: 'active',
  hireDate: ''
};

const EmployeesPage: React.FC = () => {
  const { farmId, setFarmId } = useFarm();
  const { data: employees, isLoading, isError } = useEmployees(farmId);
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayData, setDisplayData] = useState<EmployeeData[]>([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (employees) {
      setDisplayData(employees);
    }
  }, [employees]);

  const filteredEmployees = displayData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cpf.includes(searchTerm) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (employee?: EmployeeData) => {
    if (employee) {
      setFormData({
        name: employee.name,
        cpf: employee.cpf,
        phone: employee.phone,
        role: employee.role,
        farmId: employee.farmId,
        email: employee.email || '',
        address: employee.address || '',
        birthDate: employee.birthDate || '',
        department: employee.department || '',
        status: employee.status || 'active',
        hireDate: employee.hireDate || ''
      });
      setEditingId(employee.id);
    } else {
      setFormData({ ...initialFormData, farmId });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleDeleteClick = (id: number) => {
    setConfirmDelete(id);
  };

  const getStatusLabel = (status: string) => {
    return status === 'active' ? 'Ativo' : 'Inativo';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Buscar funcionário"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Button 
          variant="contained" 
          sx={{ bgcolor: green[600], '&:hover': { bgcolor: green[800] } }}
          onClick={() => handleOpenDialog()}
        >
          Adicionar Funcionário
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress sx={{ color: green[500] }} />
        </Box>
      ) : isError ? (
        <Box display="flex" justifyContent="center" my={4}>
          <Typography color="error">Erro ao carregar funcionários. Tente novamente.</Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>CPF</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contato</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Departamento</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cargo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: blue[100], color: blue[700] }}>
                          {employee.name.charAt(0)}
                        </Avatar>
                        {employee.name}
                      </Box>
                    </TableCell>
                    <TableCell>{employee.cpf}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{employee.phone}</Typography>
                      <Typography variant="caption" color="text.secondary">{employee.email}</Typography>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(employee.status)}
                        size="small"
                        sx={{ 
                          bgcolor: employee.status === 'active' ? green[50] : red[50],
                          color: employee.status === 'active' ? green[700] : red[700],
                          fontWeight: 'medium'
                        }}
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
                          sx={{ color: 'error.main' }}
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
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" py={3} color="text.secondary">
                      Nenhum funcionário encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EmployeesPage;
