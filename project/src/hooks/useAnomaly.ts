import api from '../config/axios';
import { AnomalyData } from '@/@types/AnomalyData';
import api from '@/config/axios';
const anomalyHook = {

  createAnomaly: async (anomalyData: AnomalyData) => {
    try {
<<<<<<< HEAD
      const response = await api.post(`${API_URL}/anomalies`, anomalyData);
=======
      const response = await api.post('/api/anomalies', anomalyData);
>>>>>>> 8b11812daf843f29a478dec7bbe9fb66daf367e7
      return response.data as AnomalyData;
    } catch (e) {
      console.error('Error creating anomaly:', e);
      return null;
    }
  },

};

export default anomalyHook;
