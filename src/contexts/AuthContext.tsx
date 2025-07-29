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
    const [loading, setLoading] = useState(true);



    // Verificar token salvo no localStorage ao inicializar
    useEffect(() => {
        const savedUser = localStorage.getItem('auth_user');

        if ( savedUser) {
            try {
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
            const response = await axios.post(`${API_URL}/auth/login`, credentials);

            const { token: newToken, refreshToken, clientId, clientName, userRole, login } = response.data;

            if (!newToken) {
                throw new Error('Token não retornado pelo servidor');
            }

            const userData: User = { clientId, clientName, login, userRole };


            sessionStorage.setItem('access_token', newToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('auth_user', JSON.stringify(userData));

            setUser(userData);
            setIsAuthenticated(true);

        } catch (error: any) {
            console.error('Erro no login:', error);

            if (error.response?.status === 401) {
                throw new Error('Credenciais inválidas');
            } else if (error.response?.message === 'Bad credentials') {
                throw new Error('Credenciais inválidas');
            } else if (error.code === 'NETWORK_ERROR' || !error.response) {
                throw new Error('Erro de conexão com o servidor');
            } else {
                throw new Error(error.response?.data?.message || 'Erro ao fazer login');
            }
        }
    };

    const logout = (): void => {
        setUser(null);
        setIsAuthenticated(false);

        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('auth_user');

    };

    const value: AuthContextType = {
        isAuthenticated,
        user,
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
