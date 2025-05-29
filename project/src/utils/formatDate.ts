/**
 * Formata uma data para o formato DD/MM/YYYY para exibição
 * @param dateString - Data em formato ISO ou qualquer formato válido
 * @returns Data formatada como DD/MM/YYYY
 */
export function formatDate(dateString: string): string {
  // Se a data já estiver no formato DD/MM/YYYY, retorna ela mesma
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return dateString;
  }

  // Se a data estiver no formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  // Para outros formatos, tenta converter para Date
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formata uma data para o formato DD/MM/YYYY para envio ao backend
 * @param dateString - Data em formato ISO ou qualquer formato válido
 * @returns Data formatada como DD/MM/YYYY
 */
export function formatDateToDDMMYYYY(dateString: string): string {
  return formatDate(dateString);
} 

// Converter de YYYY-MM-DD (input date) para DD/MM/YYYY (backend)
export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Erro ao formatar data para backend:', error);
    return dateString;
  }
};

// Converter de DD/MM/YYYY (backend) para YYYY-MM-DD (input date)
export const formatDateForFrontend = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } catch (error) {
    console.error('Erro ao formatar data para frontend:', error);
    return dateString;
  }
};

// Para exibir na tabela (DD/MM/YYYY)
export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  
  // Se já está no formato DD/MM/YYYY, retorna como está
  if (dateString.includes('/')) {
    return dateString;
  }
  
  // Se está no formato YYYY-MM-DD, converte
  return formatDateForBackend(dateString);
};
