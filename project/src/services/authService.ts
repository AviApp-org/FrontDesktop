import api from './api';

interface FarmLoginCredentials {
  farmCode: string;
  password: string;
}

interface FarmLoginResponse {
  token: string;
  farm: {
    id: string;
    name: string;
    code: string;
  };
}

export const authService = {
  loginFarm: (credentials: FarmLoginCredentials) =>
    api.post<FarmLoginResponse>('/auth/farm/login', credentials),
};
