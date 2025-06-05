import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useFarmManagement } from '../hooks/useFarmManagement';
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f8fa' }}>
      <FarmHeader onNewFarm={handleOpenDialog} />
      <FarmTableCard farms={farms} isLoading={isLoading} isError={isError} />
      <FarmModal open={open} onClose={handleCloseDialog}  />
    </Box>
  );
};

export default FarmRegister;
