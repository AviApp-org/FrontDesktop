import { API_URL } from '../config/api';
import axios from 'axios';
import { AddressData } from '@/@types/AddressData';


const addressHook = {

  getEmployee: async () => {
    try {
      const response = await axios.get(`${API_URL}/addresses`);
      return response.data as AddressData[];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return [];
    }
  },

    getAddressByID: async (addressId: number) => {
        try {
        const response = await axios.get(`${API_URL}/addresses/${addressId}`);
        return response.data as AddressData;
        } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error('Axios error message:', e.message);
            console.error('Axios error response:', e.response);
        }
        return null;
        }
    },

    createAddress: async (address: AddressData) => {
        try {
            const response = await axios.post(`${API_URL}/addresses`, address);
            return response.data as AddressData;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error message:', e.message);
                console.error('Axios error response:', e.response);
            }
            throw new Error('Erro ao criar endereço');
        }
    },

    updateAddress: async (addressId: number, address: AddressData) => {
        try {
            const response = await axios.put(`${API_URL}/addresses/${addressId}`, address);
            return response.data as AddressData;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error message:', e.message);
                console.error('Axios error response:', e.response);
            }
            throw new Error('Erro ao atualizar endereço');
        }
    },

    deleteAddress: async (addressId: number) => {
        try {
            const response = await axios.delete(`${API_URL}/addresses/${addressId}`);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error message:', e.message);
                console.error('Axios error response:', e.response);
            }
            throw new Error('Erro ao deletar endereço');
        }
    },

    getAddressByCep: async (cep: string) => {
        try {
            const response = await axios.get(`${API_URL}/addresses/cep/${cep}`);
            return response.data as AddressData;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error message:', e.message);
                console.error('Axios error response:', e.response);
            }
            throw new Error('Erro ao buscar endereço pelo CEP');
        }
    }
};
export default addressHook;
