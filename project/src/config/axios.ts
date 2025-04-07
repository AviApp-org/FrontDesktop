import axios from 'axios';
import { API_URL } from './api';

// Criar uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se necessário
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
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
    // Tratamento global de erros
    if (error.response) {
      // O servidor respondeu com um status de erro
      console.error('Erro na resposta:', error.response.status, error.response.data);
      
      // Tratamento específico para erros 400
      if (error.response.status === 400) {
        console.error('Erro de validação. Verifique os dados enviados:', error.response.data);
      }
      
      // Tratamento específico para erros 405
      if (error.response.status === 405) {
        console.error('Método não permitido. Verifique se o servidor está configurado corretamente.');
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