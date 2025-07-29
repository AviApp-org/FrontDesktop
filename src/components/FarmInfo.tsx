import React from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useFarm } from '../contexts/FarmContext';

export const FarmInfo: React.FC = () => {
  const { farmData, loadingFarm } = useFarm();

  if (loadingFarm) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress size={20} />
        <Typography variant="body2" ml={1}>
          Carregando dados da fazenda...
        </Typography>
      </Box>
    );
  }

  if (!farmData) {
    return (
      <Typography variant="body2" color="text.secondary">
        Nenhuma fazenda encontrada
      </Typography>
    );
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {farmData.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ID: {farmData.id}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Cliente ID: {farmData.clientId}
      </Typography>
    </Paper>
  );
};

export default FarmInfo;
