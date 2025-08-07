export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  if (typeof dateString === 'string' && dateString.includes('/') && dateString.length === 10) {
    return dateString;
  }

  return '';
};

export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return '';

  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 4) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  return dateString;
};

export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';

  if (dateString.includes('/') && dateString.length === 10) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      if (day && month && year && year.length === 4) {
        return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
      }
    }
  }

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

export function formatTimeAlternative(timestamp: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(timestamp));
}
export const formatDateForDisplay = formatDate;
export const formatDateToDDMMYYYY = formatDate;
