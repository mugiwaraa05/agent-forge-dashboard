// src/hooks/useFetch.ts - UPDATED ROBUST VERSION
'use client';

import { useState, useCallback, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetch = <T,>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0); // Add trigger for manual refetch

  const fetchData = useCallback(async () => {
    const abortController = new AbortController();
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { signal: abortController.signal });
      
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const jsonData: T = await response.json();
      
      if (!abortController.signal.aborted) {
        setData(jsonData);
        setError(null);
      }
    } catch (err) {
      if (!abortController.signal.aborted && err instanceof Error) {
        setError(err.message);
        setData(null);
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }

    return () => abortController.abort();
  }, [url]);

  // useEffect for initial fetch and when URL or trigger changes
  useEffect(() => {
    fetchData();
  }, [fetchData, trigger]);

  // Refetch function that increments the trigger
  const refetch = useCallback(() => {
    setTrigger(prev => prev + 1);
  }, []);

  return { 
    data, 
    isLoading, 
    error, 
    refetch
  };
};