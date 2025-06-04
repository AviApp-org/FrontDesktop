import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { EmployeeData } from '../../@types/EmployeeData';
import { EmployeeRole } from '../../@types/enums/enumEmployeeRole';
import { formatCPF, formatPhone } from '../../utils/validators';
import { formatDateForDisplay } from '../../utils/formatDate';

interface EmployeeTableProps {
  employees: EmployeeData[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (employee: EmployeeData) => void;
  onDelete: (id: number) => void;
}

const roleLabels: Record<EmployeeRole, string> = {
  [EmployeeRole.MANAGER]: 'Gerente',
  [EmployeeRole.WORKER]: 'Colaborador'
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  isLoading,
  isError,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return (
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress sx={{ color: 'primary.main' }} />
            <Typography sx={{ ml: 2 }}>Carregando funcionários...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Box display="flex" justifyContent="center" my={4}>
            <Typography color="error">
              Erro ao carregar funcionários. Por favor, tente novamente mais tarde.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>CPF</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Data Nascimento</TableCell> {/* ✅ Coluna da data */}
                <TableCell sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cargo</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length > 0 ? (
                employees.map((employee) => (
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
                    <TableCell>{formatDateForDisplay(employee.birthDate)}</TableCell> {/* ✅ Exibir data formatada */}
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
                          onClick={() => onEdit(employee)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton 
                          size="small" 
                          sx={{ color: blue[700] }}
                          onClick={() => onDelete(employee.id ?? 0)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center"> {/* ✅ Ajustar colSpan para 6 */}
                    Nenhum funcionário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
