export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return '';
  
  console.log('📅 formatDateForBackend input:', dateString);
  
  try {
    // Se já está no formato DD-MM-YYYY, retorna como está
    if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
      console.log('📅 formatDateForBackend output (já formatado):', dateString);
      return dateString;
    }
    
    // Converte de YYYY-MM-DD para DD-MM-YYYY
    const [year, month, day] = dateString.split('-');
    const result = `${day}-${month}-${year}`;
    console.log('📅 formatDateForBackend output:', result);
    return result;
  } catch (error) {
    console.error('Erro ao formatar data para backend:', error);
    return dateString;
  }
};


export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  
  // Se está no formato DD-MM-YYYY, converte para DD/MM/YYYY
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
    return dateString.replace(/-/g, '/');
  }
  
  // Se está no formato YYYY-MM-DD, converte para DD/MM/YYYY
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 4) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Se já está no formato DD/MM/YYYY, retorna como está
  if (dateString.includes('/')) {
    return dateString;
  }
  
  return dateString;
};

// Função para formatar data para exibição em tabelas
export const formatDate = (dateString: string): string => {
  return formatDateForDisplay(dateString);
};

// Função para formatar data para o formato DD/MM/YYYY (usado em alguns lugares)
export const formatDateToDDMMYYYY = (dateString: string): string => {
  if (!dateString) return '';
  
  // Se está no formato YYYY-MM-DD
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 4) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Se está no formato DD-MM-YYYY, converte para DD/MM/YYYY
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
    return dateString.replace(/-/g, '/');
  }
  
  return dateString;
};
