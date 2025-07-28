import api from '../config/axios';
import { AddressData } from '@/@types/AddressData';


const addressHook = {

  getEmployee: async () => {
    try {
      const response = await api.get('/api/addresses');
      return response.data as AddressData[];
    } catch (e) {
      console.error('Error fetching addresses:', e);
      return [];
    }
  },

    getAddressByID: async (addressId: number) => {
        try {
            const response = await api.get(`/api/addresses/${addressId}`);
            return response.data as AddressData;
        } catch (e) {
            console.error('Error fetching address:', e);
            return null;
        }
    },

    createAddress: async (address: AddressData) => {
        try {
            const response = await api.post('/api/addresses', address);
            return response.data as AddressData;
        } catch (e) {
            console.error('Error creating address:', e);
            throw new Error('Erro ao criar endereço');
        }
    },

    updateAddress: async (addressId: number, address: AddressData) => {
        try {
            const response = await api.put(`/api/addresses/${addressId}`, address);
            return response.data as AddressData;
        } catch (e) {
            console.error('Error updating address:', e);
            throw new Error('Erro ao atualizar endereço');
        }
    },

    deleteAddress: async (addressId: number) => {
        try {
            const response = await api.delete(`/api/addresses/${addressId}`);
            return response.data;
        } catch (e) {
            console.error('Error deleting address:', e);
            throw new Error('Erro ao deletar endereço');
        }
    },

    getAddressByCep: async (cep: string) => {
        try {
            const response = await api.get(`/api/addresses/cep/${cep}`);
            return response.data as AddressData;
        } catch (e) {
            console.error('Error fetching address by CEP:', e);
            throw new Error('Erro ao buscar endereço pelo CEP');
        }
    }
};
export default addressHook;
