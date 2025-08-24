// src/components/AgentCard.tsx
'use client';

import { Agent } from '@/app/api/agents/route';
import { useState } from 'react';
import AgentModal from './AgentModal';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* The Clickable Card */}
      <div
        onClick={openModal}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-6 border border-slate-200 hover:border-blue-300"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-slate-800">{agent.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agent.status)}`}>
            {agent.status.toUpperCase()}
          </span>
        </div>
        <p className="text-slate-600 mb-4 line-clamp-3">{agent.description}</p>
        <div className="flex justify-between items-center text-sm text-slate-500">
          <span>Tasks Completed</span>
          <span className="font-semibold text-slate-800">{agent.tasksCompleted}</span>
        </div>
      </div>

      {/* The Modal */}
      {isModalOpen && (
        <AgentModal agent={agent} onClose={closeModal} />
      )}
    </>
  );
};

export default AgentCard;