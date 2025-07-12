import axios from 'axios';
import { API_URL } from '@/config/api';
import { AnomalyData } from '@/@types/AnomalyData';
const anomalyHook = {

  createAnomaly: async (anomalyData: AnomalyData) => {
    try {
      const response = await axios.post(`${API_URL}/anomalies`, anomalyData);
      return response.data as AnomalyData;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error message:', e.message);
        console.error('Axios error response:', e.response);
      }
      return null;
    }
  },

};

export default anomalyHook;
