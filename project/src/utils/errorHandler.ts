import { AxiosError } from 'axios';
import { TOKEN_KEY } from '../constants';

interface ApiError {
  message: string;
  status: number;
  type: 'error' | 'warning' | 'info';
}

export function handleApiError(error: AxiosError): ApiError {
  // Erro padrão
  const defaultError: ApiError = {
    message: 'Ocorreu um erro inesperado. Tente novamente.',
    status: 500,
    type: 'error'
  };

  // Se não houver resposta da API
  if (!error.response) {
    return {
      message: 'Erro de conexão. Verifique sua internet.',
      status: 0,
      type: 'warning'
    };
  }

  // Tratamento baseado no status code
  switch (error.response.status) {
    case 400:
      return {
        message: error.response.data?.message || 'Dados inválidos. Verifique os campos.',
        status: 400,
        type: 'warning'
      };

    case 401:
      // Limpar token e redirecionar para login
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
      return {
        message: 'Sessão expirada. Por favor, faça login novamente.',
        status: 401,
        type: 'warning'
      };

    case 403:
      return {
        message: 'Você não tem permissão para realizar esta ação.',
        status: 403,
        type: 'error'
      };

    case 404:
      return {
        message: 'Recurso não encontrado.',
        status: 404,
        type: 'warning'
      };

    case 422:
      return {
        message: error.response.data?.message || 'Dados inválidos para processamento.',
        status: 422,
        type: 'warning'
      };

    case 500:
      return {
        message: 'Erro interno do servidor. Tente novamente mais tarde.',
        status: 500,
        type: 'error'
      };

    default:
      return defaultError;
  }
}

// Função auxiliar para exibir mensagens de erro
export function showErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'Ocorreu um erro inesperado';
}

// Exemplo de uso em componentes:
/*
try {
  await api.post('/endpoint', data);
} catch (error) {
  const { message, type } = handleApiError(error as AxiosError);
  // Usar com um componente de toast/notification
  toast[type](message);
}
*/ 