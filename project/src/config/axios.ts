import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // ✅ SEM /api/ aqui, pois já está no controller
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para log das requisições
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Requisição ${config.method?.toUpperCase()} para ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para log das respostas
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta de ${response.config.url}: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 404) {
      console.error('🔍 Recurso não encontrado. Verifique se a URL está correta.');
    } else if (error.response?.status === 500) {
      console.error('💥 Erro interno do servidor.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
