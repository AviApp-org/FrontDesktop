export const formatDateForAPI = (dateString: string): string => {
  if (!dateString) return '';
  
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
    return dateString;
  }
  
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  
  if (dateString.includes('/')) {
    return dateString;
  }
  
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 4) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
    const [day, month, year] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  return dateString;
};

export const generateDateRange = (startDate: string, days: number): string[] => {
  const dates: string[] = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    dates.push(`${year}-${month}-${day}`);
  }
  
  return dates;
};
