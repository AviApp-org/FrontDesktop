import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';

interface FarmHeaderProps {
  onNewFarm: () => void;
}

export const FarmHeader: React.FC<FarmHeaderProps> = ({ onNewFarm }) => (
  <Box
    sx={{
      mb: 3,
      bgcolor: 'background.paper',
      borderRadius: 3,
      boxShadow: 1,
      px: { xs: 2, sm: 4 },
      py: 3,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        gap: 3,
        mb: 1,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        color="text.primary"
        mb={0}
      >
        Lista de Granjas
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onNewFarm}
        sx={{
          bgcolor: green[600],
          '&:hover': { bgcolor: green[800] },
          px: 3,
          height: 40,
        }}
      >
        Cadastrar Granja
      </Button>
    </Box>
    <Typography variant="body2" color="text.secondary">
      Gerencie suas granjas cadastradas de forma eficiente
    </Typography>
  </Box>
);

export default FarmHeader;
