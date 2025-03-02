import React, { useState } from 'react';
import { Egg } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import api from '../services/api';

function Login() {
  const [farmCode, setFarmCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const response = await authService.loginFarm({ farmCode, password });
      
      // Salvar dados da granja e token
      localStorage.setItem('@App:token', response.data.token);
      localStorage.setItem('@App:farm', JSON.stringify(response.data.farm));
      
      // Configurar token no header das requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Redirecionar para o dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Código da granja ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        <div className="hidden md:block w-1/2">
          <img
            src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Galinhas brancas"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Egg className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Bem vindo</h1>
            <p className="text-gray-600 mt-2">Acesse sua granja</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="farmCode" className="block text-sm font-medium text-gray-700">
                Código da Granja <span className="text-red-500">*</span>
              </label>
              <input
                id="farmCode"
                type="text"
                required
                value={farmCode}
                onChange={(e) => setFarmCode(e.target.value)}
                placeholder="Digite o código da granja"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div></div>
              <a href="#" className="text-sm text-green-600 hover:text-green-500">
                Esqueceu sua senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:bg-green-400"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;