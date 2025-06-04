import React from 'react';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { green, blue } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { EmployeeHeaderProps } from './types';

export const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({
  searchTerm,
  totalEmployees,
  onSearch,
  onAddEmployee
}) => {
  return (
    <>
      <Typography 
        variant="h4" 
        component="h1" 
        fontWeight="bold" 
        color="text.primary" 
        mb={3}
      >
        Funcionários
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Barra de busca e botão adicionar */}
        <Card elevation={0} sx={{ bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" sx={{ width: '60%' }}>
                <TextField
                  placeholder="Buscar funcionários..."
                  value={searchTerm}
                  onChange={onSearch}
                  size="small"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                  }}
                />
                <Tooltip title="Filtros avançados">
                  <IconButton sx={{ ml: 1 }}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ 
                  bgcolor: green[600], 
                  '&:hover': { bgcolor: green[800] },
                  px: 3
                }}
                onClick={onAddEmployee}
              >
                Adicionar Funcionário
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Card com total de funcionários */}
        <Card sx={{ border: '1px solid', borderColor: 'divider', bgcolor: blue[50] }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color={blue[700]}>
              {totalEmployees}
            </Typography>
            <Typography variant="body2" color={blue[900]}>
              Total de Funcionários
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
