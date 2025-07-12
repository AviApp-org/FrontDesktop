export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return '';
  
  // Se está no formato YYYY-MM-DD (input HTML5), converte para DD/MM/YYYY
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 4) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Senão, retorna como está
  return dateString;
};

// Função simples para exibir data
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  // Se já está no formato DD/MM/YYYY, retorna como está
  if (dateString.includes('/') && dateString.length === 10) {
    return dateString;
  }
  
  // Se não conseguir formatar, retorna vazio
  return '';
};

// Função para converter data para input HTML5 (YYYY-MM-DD)
export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';
  
  // Se está no formato DD/MM/YYYY, converte para YYYY-MM-DD
  if (dateString.includes('/') && dateString.length === 10) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  return '';
};

// Aliases para compatibilidade
export const formatDateForDisplay = formatDate;
export const formatDateToDDMMYYYY = formatDate;
