import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../config/axios';
import { API_URL } from '@/config/api';
import axios from 'axios';


interface LoginCredentials {
    login: string;
    password: string;
}

interface User {
    clientId: number;
    clientName: string;
    login: string;
    userRole: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Configurar interceptor para incluir token em todas as requests
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [token]);

    // Verificar token salvo no localStorage ao inicializar
    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('auth_user');

        if (savedToken && savedUser) {
            try {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Erro ao recuperar dados de autenticação:', error);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        try {
            const response = await api.post(`${API_URL}/auth/login`, credentials);

            const { token: newToken, clientId, clientName, userRole, login } = response.data;

            if (!newToken) {
                throw new Error('Token não retornado pelo servidor');
            }

            const userData: User = {
                clientId,
                clientName,
                login,
                userRole
            };

            setToken(newToken);
            setUser(userData);
            setIsAuthenticated(true);

            localStorage.setItem('auth_token', newToken);
            localStorage.setItem('auth_user', JSON.stringify(userData));

        } catch (error: any) {
            console.error('Erro no login:', error);

            if (error.response?.status === 401) {
                throw new Error('Credenciais inválidas');
            } else if (error.response?.status >= 500) {
                throw new Error('Erro interno do servidor');
            } else if (error.code === 'NETWORK_ERROR' || !error.response) {
                throw new Error('Erro de conexão com o servidor');
            } else {
                throw new Error(error.response?.data?.message || 'Erro ao fazer login');
            }
        }
    };

    const logout = (): void => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
    };

    const value: AuthContextType = {
        isAuthenticated,
        user,
        token,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export default AuthContext;
