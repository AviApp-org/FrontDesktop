export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

// Define quais roles têm acesso a cada rota
export const RoutePermissions = {
  '/farms/register': [UserRole.ADMIN, UserRole.MANAGER],
  '/clients/register': [UserRole.ADMIN, UserRole.MANAGER],
  '/employees': [UserRole.ADMIN, UserRole.MANAGER],
  // Adicione outras rotas conforme necessário
} as const; 