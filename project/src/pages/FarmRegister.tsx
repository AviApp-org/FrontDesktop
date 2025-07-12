import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import FarmModal from '../components/FarmModal';
import FarmHeader from '../components/FarmPageHeader';
import FarmTableCard from '../components/FarmTableCard';

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
    <Box sx={{ minHeight: '100vh',  py: 8 }}>
      
        <FarmHeader onNewFarm={handleOpenDialog} />
        <FarmTableCard farms={farms} isLoading={isLoading} isError={isError} />
        <FarmModal open={open} onClose={handleCloseDialog} />
      
    </Box>
  );
};

export default FarmRegister;
