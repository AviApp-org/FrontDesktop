import { useState } from 'react';
import { AxiosError } from 'axios';
import { handleApiError } from '../utils/errorHandler';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = async (apiCall: Promise<{ data: T }>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiCall;
      setState(prev => ({ ...prev, data: response.data, loading: false }));
      return response.data;
    } catch (err) {
      const error = handleApiError(err as AxiosError);
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      throw error;
    }
  };

  return { ...state, request };
} 