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
  Avatar,
  IconButton,
  Tooltip,
  Box,
  Typography,
  CircularProgress,
  Chip
} from '@mui/material';
import { blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ClientTableProps } from './types';
import { formatCNPJ, formatPhone } from '../../utils/validators';



export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  isLoading,
  isError,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress sx={{ color: 'primary.main' }} />
            <Typography sx={{ ml: 2 }}>Carregando clientes...</Typography>
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
              Erro ao carregar clientes. Por favor, tente novamente mais tarde.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', width: '100%' }}>
      <CardContent sx={{ p: 0 }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>E-mail</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>CNPJ</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <TableRow key={client.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: blue[100], color: blue[700] }}>
                          {client.name.charAt(0)}
                        </Avatar>
                        {client.name}
                      </Box>
                    </TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{formatCNPJ(client.cnpj)}</TableCell>
                    <TableCell>{formatPhone(client.phone)}</TableCell>
                    <TableCell>
                      <Chip
                        label={client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                        color={client.status === 'ACTIVE' ? 'primary' : 'default'}
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
                          onClick={() => onEdit(client)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton
                          size="small"
                          sx={{ color: blue[700] }}
                          onClick={() => onDelete(client.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum cliente encontrado.
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