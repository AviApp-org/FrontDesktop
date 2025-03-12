import { useState, useEffect } from 'react';
import { aviaryService } from '../services/aviaryService';
import { AviaryData } from '../types/interfaces/aviary';

export function useAviary() {
  const [data, setData] = useState<AviaryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await aviaryService.getAll();
      setData(response.data);
    } catch (error) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
