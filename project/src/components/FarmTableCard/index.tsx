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
  CircularProgress,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { blue } from '@mui/material/colors';

interface FarmTableCardProps {
  farms: any[];
  isLoading: boolean;
  isError: boolean;
}

const FarmTableCard: React.FC<FarmTableCardProps> = ({ farms, isLoading, isError }) => {
  if (isLoading) {
    return (
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress sx={{ color: 'primary.main' }} />
            <Typography sx={{ ml: 2 }}>Carregando granjas...</Typography>
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
              Erro ao carregar granjas. Por favor, tente novamente mais tarde.
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
                <TableCell sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>CEP</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Rua</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Número</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Bairro</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cidade</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {farms.length > 0 ? (
                farms.map((farm) => (
                  <TableRow key={farm.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* You can add an Avatar here if you want */}
                        {farm.name}
                      </Box>
                    </TableCell>
                    <TableCell>{farm.managerName}</TableCell>
                    <TableCell>{farm.cep}</TableCell>
                    <TableCell>{farm.street}</TableCell>
                    <TableCell>{farm.number}</TableCell>
                    <TableCell>{farm.neighborhood}</TableCell>
                    <TableCell>{farm.city}</TableCell>
                    <TableCell>{farm.state}</TableCell>
                    <TableCell>
                      <Chip
                        label={farm.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                        color={farm.status === 'ACTIVE' ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Nenhuma granja cadastrada.
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

export default FarmTableCard;