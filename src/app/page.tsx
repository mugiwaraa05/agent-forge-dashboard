// src/app/page.tsx (updated with API toggle)
'use client';

import AgentCard from '@/components/AgentCard';
import CreateAgentForm from '@/components/CreateAgentForm';
import { useFetch } from '@/hooks/useFetch';
import { useGraphQL } from '@/hooks/useGraphQL';
import { Agent } from '@/app/api/agents/route';
import { useState } from 'react';

type ApiType = 'rest' | 'graphql';

export default function Home() {
  const [apiType, setApiType] = useState<ApiType>('rest');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // REST API hook
  const { data: restData, isLoading: restLoading, error: restError, refetch: restRefetch } = 
    useFetch<Agent[]>('/api/agents');
  
  // GraphQL hook
  const { data: graphqlData, isLoading: graphqlLoading, error: graphqlError, refetch: graphqlRefetch } = 
    useGraphQL();

  // Choose which data to use based on API type
  const agents = apiType === 'rest' ? restData : graphqlData;
  const isLoading = apiType === 'rest' ? restLoading : graphqlLoading;
  const error = apiType === 'rest' ? restError : graphqlError;
  const refetch = apiType === 'rest' ? restRefetch : graphqlRefetch;

  const handleAgentCreated = () => {
    setShowCreateForm(false);
    refetch();
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading agents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-start flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              AgentForge Dashboard
            </h1>
            <p className="text-slate-600 mb-4">
              Monitor and manage your AI workforce
            </p>
            
            {/* API Type Toggle */}
            <div className="flex gap-4">
              <button
                onClick={() => setApiType('rest')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  apiType === 'rest' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                REST API
              </button>
              <button
                onClick={() => setApiType('graphql')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  apiType === 'graphql' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                GraphQL API
              </button>
            </div>
            
            {/* API Status Indicator */}
            <div className="mt-3 text-sm text-slate-500">
              Current API: <span className="font-medium text-slate-700">{apiType.toUpperCase()}</span>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md self-start md:self-auto"
          >
            + Create Agent
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {showCreateForm && (
          <div className="mb-8">
            <CreateAgentForm 
              onAgentCreated={handleAgentCreated}
              onCancel={handleCancelCreate}
            />
          </div>
        )}

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents && agents.length > 0 ? (
            agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-400 text-lg">No agents found</div>
              <p className="text-slate-500 mt-2">Create your first agent to get started</p>
            </div>
          )}
        </div>

        {/* Data Source Info */}
        <div className="mt-8 p-4 bg-slate-100 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Data Source Information</h3>
          <p className="text-xs text-slate-500">
            Currently using: <strong>{apiType.toUpperCase()}</strong> API | 
            Agents loaded: <strong>{agents?.length || 0}</strong> | 
            Endpoint: <strong>{apiType === 'rest' ? '/api/agents' : '/api/graphql'}</strong>
          </p>
        </div>
      </div>
    </main>
  );
}