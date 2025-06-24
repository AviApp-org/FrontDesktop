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
} from '@mui/material';

interface FarmTableCardProps {
  farms: any[];
  isLoading: boolean;
  isError: boolean;
}

const FarmTableCard: React.FC<FarmTableCardProps> = ({ farms, isLoading, isError }) => (
  <Card
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      boxShadow: 0,
      width: '100%', // Make card full width
      mb: 3,
      bgcolor: 'background.paper',
      // Remove mx: 3
    }}
  >
    <CardContent sx={{ p: 0 }}>
      <TableContainer sx={{ width: '100%' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>Responsável</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>CEP</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>Rua</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>Número</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>Bairro</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>Cidade</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '12.5%' }}>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size={24} sx={{ mr: 2 }} />
                    Carregando granjas...
                  </Box>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>
                  Erro ao carregar granjas.
                </TableCell>
              </TableRow>
            ) : farms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Nenhuma granja cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              farms.map((farm) => (
                <TableRow key={farm.id}>
                  <TableCell sx={{ width: '12.5%' }}>{farm.name}</TableCell>
                  <TableCell sx={{ width: '12.5%' }}>{farm.managerName}</TableCell>
                  <TableCell sx={{ width: '12.5%' }}>{farm.cep}</TableCell>
                  <TableCell sx={{ width: '12.5%' }}>{farm.street}</TableCell>
                  <TableCell sx={{ width: '12.5%' }}>{farm.number}</TableCell>
                  <TableCell sx={{ width: '12.5%' }}>{farm.neighborhood}</TableCell>
                  <TableCell sx={{ width: '12.5%' }}>{farm.city}</TableCell>
                  <TableCell sx={{ width: '12.5%' }}>{farm.state}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

export default FarmTableCard;