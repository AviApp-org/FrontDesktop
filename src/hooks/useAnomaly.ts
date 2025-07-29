import api from '../config/axios';
import { AnomalyData } from '@/@types/AnomalyData';
const anomalyHook = {

  createAnomaly: async (anomalyData: AnomalyData) => {
    try {
      const response = await api.post('/api/anomalies', anomalyData);
      return response.data as AnomalyData;
    } catch (e) {
      console.error('Error creating anomaly:', e);
      return null;
    }
  },

};

export default anomalyHook;
