import React from "react";
import { BatchHeaderProps } from "./types";
import { AlertCircle } from "lucide-react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";

export const BatchHeader: React.FC<BatchHeaderProps> = ({ onNewBatch, error }) => (
  <Box
    sx={{
      mb: 3,
      bgcolor: 'background.paper',
      borderRadius: 3,
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
        Gerenciamento de Lotes e Aviários
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onNewBatch}
        sx={{
          bgcolor: green[600],
          '&:hover': { bgcolor: green[800] },
          px: 3,
        }}
      >
        Cadastrar Lote
      </Button>
    </Box>
    <Typography variant="body2" color="text.secondary" mb={error ? 2 : 0}>
      Gerencie seus lotes e aviários de forma eficiente
    </Typography>
    {error && (
      <Box
        sx={{
          bgcolor: 'red.50',
          borderLeft: '4px solid',
          borderColor: 'error.main',
          p: 2,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          mt: 2,
          gap: 1,
        }}
      >
        <AlertCircle style={{ color: '#f44336', marginRight: 8 }} size={20} />
        <Typography color="error.main">{error}</Typography>
      </Box>
    )}
  </Box>
);