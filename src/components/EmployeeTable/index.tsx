import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { EmployeeData } from '../../@types/EmployeeData';
import { EmployeeRole } from '../../@types/enums/enumEmployeeRole';
import { formatDate } from '../../utils/formatDate'; // ✅ Usar a função correta

interface EmployeeTableProps {
  employees: EmployeeData[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (employee: EmployeeData) => void;
  onDelete: (id: number | null) => void;
}

const getRoleLabel = (role: EmployeeRole): string => {
  const roleLabels = {
    [EmployeeRole.MANAGER]: 'Gerente',
    [EmployeeRole.WORKER]: 'Trabalhador',
  };
  return roleLabels[role] || role;
};

const getRoleColor = (role: EmployeeRole) => {
  const roleColors = {
    [EmployeeRole.MANAGER]: 'error',
    [EmployeeRole.WORKER]: 'primary',
  };
  return roleColors[role] || 'default';
};

// ✅ REMOVIDA a função formatDate local - agora usa a importada

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
                <TableCell sx={{ fontWeight: 'bold' }}>Data Nascimento</TableCell>
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
                      <Typography variant="body2" fontWeight="medium">
                        {employee.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {employee.cpf}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(employee.birthDate) || '-'} {/* ✅ Usa a função importada */}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {employee.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getRoleLabel(employee.role)}
                        color={getRoleColor(employee.role) as any}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" gap={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(employee)}
                          sx={{ color: 'primary.main' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => onDelete(employee.id ?? null)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Nenhum funcionário encontrado
                    </Typography>
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
