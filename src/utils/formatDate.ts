// Função simples para exibir data
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  // Se já está no formato DD/MM/YYYY, retorna como está
  if (typeof dateString === 'string' && dateString.includes('/') && dateString.length === 10) {
    return dateString;
  }

  return '';
};

// Para o backend - converte de YYYY-MM-DD (input) para DD/MM/YYYY (backend Java)
export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return '';

  // Se está no formato YYYY-MM-DD (do input HTML5), converte para DD/MM/YYYY
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 4) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  // Se já está em outro formato, passa direto
  return dateString;
};

// Para o input - converte de DD/MM/YYYY (backend) para YYYY-MM-DD (input HTML5)
export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';

  // Se está no formato DD/MM/YYYY, converte para YYYY-MM-DD
  if (dateString.includes('/') && dateString.length === 10) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      if (day && month && year && year.length === 4) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
  }

  // Se já está no formato YYYY-MM-DD, passa direto
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 4) {
    return dateString;
  }

  return '';
};

export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

// Ou usando Intl.DateTimeFormat para mais controle:
export function formatTimeAlternative(timestamp: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(timestamp));
}
// Aliases para compatibilidade
export const formatDateForDisplay = formatDate;
export const formatDateToDDMMYYYY = formatDate;
