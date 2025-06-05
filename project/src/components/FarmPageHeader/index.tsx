import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';

interface FarmHeaderProps {
  onNewFarm: () => void;
}

export const FarmHeader: React.FC<FarmHeaderProps> = ({ onNewFarm }) => (
  <>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      mb={3}
      mt={6} // Increased top margin to lower the header section
    >
      <Box>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          color="text.primary"
          mb={1}
        >
          Lista de Granjas
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Gerencie suas granjas cadastradas de forma eficiente
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onNewFarm}
        sx={{
          bgcolor: green[600],
          '&:hover': { bgcolor: green[800] },
          px: 3,
          height: 40,
          mt: 2,
        }}
      >
        Cadastrar Granja
      </Button>
    </Box>
  </>
);

export default FarmHeader;
