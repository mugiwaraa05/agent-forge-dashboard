// src/hooks/useGraphQL.ts - REAL IMPLEMENTATION
'use client';

import { useState, useEffect } from 'react';
import { Agent } from '@/app/api/agents/route';
import { GET_AGENTS_QUERY } from '@/lib/graphql';

export const useGraphQL = () => {
  const [data, setData] = useState<Agent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Send GraphQL query to our endpoint
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_AGENTS_QUERY
        }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed with status ${response.status}`);
      }

      const result = await response.json();
      
      // Check for GraphQL errors
      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL error occurred');
      }
      
      // Set the data from GraphQL response
      setData(result.data.agents);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'GraphQL query failed');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAgents();
  }, []);

  return { 
    data, 
    isLoading, 
    error, 
    refetch: fetchAgents 
  };
};