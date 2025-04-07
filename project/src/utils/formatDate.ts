/**
 * Formata uma data para o formato DD/MM/YYYY para exibição
 * @param dateString - Data em formato ISO ou qualquer formato válido
 * @returns Data formatada como DD/MM/YYYY
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR');
}

/**
 * Formata uma data para o formato DD/MM/YYYY para envio ao backend
 * @param dateString - Data em formato ISO ou qualquer formato válido
 * @returns Data formatada como DD/MM/YYYY
 */
export function formatDateToDDMMYYYY(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
} 