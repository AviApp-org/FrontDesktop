import axios from 'axios';
import { API_URL } from './api';

// Configuração base do Axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    // Log da requisição para debug
    console.log(`Requisição ${config.method?.toUpperCase()} para ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    // Log da resposta para debug
    console.log(`Resposta de ${response.config.url}:`, response.status, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      // O servidor respondeu com um status de erro
      console.error('Erro na resposta:', error.response.status, error.response.data);
      
      // Tratamento específico para erros 400
      if (error.response.status === 400) {
        console.error('Erro de validação. Verifique os dados enviados:', error.response.data);
      }
      
      // Tratamento específico para erros 404
      if (error.response.status === 404) {
        console.error('Recurso não encontrado. Verifique se a URL está correta.');
      }
      
      // Tratamento específico para erros 500
      if (error.response.status >= 500) {
        console.error('Erro interno do servidor. Tente novamente mais tarde.');
      }
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.error('Sem resposta do servidor:', error.request);
    } else {
      // Algo aconteceu na configuração da requisição
      console.error('Erro na configuração da requisição:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api; 