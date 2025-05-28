import { ClientData } from '../@types/ClientData';

const API_BASE_URL = 'http://localhost:8080/api';

interface CreateClientData extends Omit<ClientData, 'id'> {}

class ClientService {
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw this.handleApiError(data);
    }

    return data;
  }

  private handleApiError(data: any): Error {
    if (data.errors && data.errors.length > 0) {
      const errorMessage = data.errors[0].defaultMessage || 
                          data.errors[0].message || 
                          'Erro de validação';
      return new Error(errorMessage);
    }
    
    return new Error(data.message || 'Erro ao processar solicitação');
  }

  async create(clientData: CreateClientData): Promise<ClientData> {
    console.log('Dados sendo enviados:', JSON.stringify(clientData, null, 2));
    
    const result = await this.makeRequest<ClientData>('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });

    console.log('Resposta da API:', JSON.stringify(result, null, 2));
    return result;
  }

  async getAll(): Promise<ClientData[]> {
    return this.makeRequest<ClientData[]>('/clients');
  }

  async getById(id: number): Promise<ClientData> {
    return this.makeRequest<ClientData>(`/clients/${id}`);
  }

  async update(id: number, clientData: Partial<CreateClientData>): Promise<ClientData> {
    return this.makeRequest<ClientData>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });
  }

  async delete(id: number): Promise<void> {
    await this.makeRequest<void>(`/clients/${id}`, {
      method: 'DELETE',
    });
  }
}

export const clientService = new ClientService();
