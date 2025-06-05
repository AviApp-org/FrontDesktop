import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFarmManagement } from '../hooks/useFarmManagement';
// Update the path below to the correct location of your FarmModal component
import FarmModal from '../components/FarmModal';

const FarmRegister: React.FC = () => {
  const {
    farms,
    isLoading,
    isError,
    loadFarms,
  } = useFarmManagement();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadFarms();
  }, []);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Lista de Granjas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Cadastrar Granja
        </Button>
      </Box>

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'background.default' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Localização</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
                  {/* Add more columns as needed */}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Box display="flex" alignItems="center" justifyContent="center">
                        <CircularProgress size={24} sx={{ mr: 2 }} />
                        Carregando granjas...
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ color: 'error.main' }}>
                      Erro ao carregar granjas.
                    </TableCell>
                  </TableRow>
                ) : farms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Nenhuma granja cadastrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  farms.map((farm) => (
                    <TableRow key={farm.id}>
                      <TableCell>{farm.name}</TableCell>
                      <TableCell>{farm.location}</TableCell>
                      <TableCell>{farm.managerName}</TableCell>
                      {/* Add more cells as needed */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Modal for registering a new farm */}
      <FarmModal open={open} onClose={handleCloseDialog} /* other props */ />
    </Box>
  );
};

export default FarmRegister;
