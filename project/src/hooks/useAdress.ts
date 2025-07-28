import api from '../config/axios';
import { AddressData } from '@/@types/AddressData';
import api from '@/config/axios';



const addressHook = {

  getEmployee: async () => {
    try {
<<<<<<< HEAD
      const response = await api.get(`${API_URL}/addresses`);
=======
      const response = await api.get('/api/addresses');
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as AddressData[];
    } catch (e) {
      console.error('Error fetching addresses:', e);
      return [];
    }
  },

    getAddressByID: async (addressId: number) => {
        try {
<<<<<<< HEAD
        const response = await api.get(`${API_URL}/addresses/${addressId}`);
        return response.data as AddressData;
=======
            const response = await api.get(`/api/addresses/${addressId}`);
            return response.data as AddressData;
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
        } catch (e) {
            console.error('Error fetching address:', e);
            return null;
        }
    },

    createAddress: async (address: AddressData) => {
        try {
<<<<<<< HEAD
            const response = await api.post(`${API_URL}/addresses`, address);
=======
            const response = await api.post('/api/addresses', address);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
            return response.data as AddressData;
        } catch (e) {
            console.error('Error creating address:', e);
            throw new Error('Erro ao criar endereço');
        }
    },

    updateAddress: async (addressId: number, address: AddressData) => {
        try {
<<<<<<< HEAD
            const response = await api.put(`${API_URL}/addresses/${addressId}`, address);
=======
            const response = await api.put(`/api/addresses/${addressId}`, address);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
            return response.data as AddressData;
        } catch (e) {
            console.error('Error updating address:', e);
            throw new Error('Erro ao atualizar endereço');
        }
    },

    deleteAddress: async (addressId: number) => {
        try {
<<<<<<< HEAD
            const response = await api.delete(`${API_URL}/addresses/${addressId}`);
=======
            const response = await api.delete(`/api/addresses/${addressId}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
            return response.data;
        } catch (e) {
            console.error('Error deleting address:', e);
            throw new Error('Erro ao deletar endereço');
        }
    },

    getAddressByCep: async (cep: string) => {
        try {
<<<<<<< HEAD
            const response = await api.get(`${API_URL}/addresses/cep/${cep}`);
=======
            const response = await api.get(`/api/addresses/cep/${cep}`);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
            return response.data as AddressData;
        } catch (e) {
            console.error('Error fetching address by CEP:', e);
            throw new Error('Erro ao buscar endereço pelo CEP');
        }
    }
};
export default addressHook;
