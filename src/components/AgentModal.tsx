// src/components/AgentModal.tsx
'use client';

import { Agent } from '@/app/api/agents/route';
import { useEffect, useRef } from 'react';

// Define the props interface for TypeScript
interface AgentModalProps {
  agent: Agent;
  onClose: () => void;
}

const AgentModal = ({ agent, onClose }: AgentModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 1. Focus Trap: Lock keyboard focus inside the modal
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, []);

  // 2. Close modal on Escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  // 3. Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 4. Delete agent function
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this agent? This action cannot be undone.')) return;
    
    try {
      const response = await fetch('/api/agents', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: agent.id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete agent');
      }

      onClose(); // Close the modal
      // Refresh the page to show updated agent list
      window.location.reload();
      
    } catch (error) {
      alert('Failed to delete agent. Please try again.');
      console.error('Delete error:', error);
    }
  };

  // 5. Determine status color (same as AgentCard)
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      // Clicking on backdrop closes modal
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 id="modal-title" className="text-2xl font-bold text-slate-800">
            {agent.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-semibold transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status Badge */}
          <div className="mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(agent.status)}`}>
              Status: {agent.status.toUpperCase()}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Description</h3>
            <p className="text-slate-600">{agent.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Tasks Completed</p>
              <p className="text-2xl font-bold text-slate-800">{agent.tasksCompleted}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Agent ID</p>
              <p className="text-sm font-mono text-slate-600 bg-slate-100 p-1 rounded">{agent.id}</p>
            </div>
          </div>

          {/* Action Buttons - Updated with delete button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Delete Agent
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
              Run Agent
            </button>
            <button className="flex-1 bg-slate-200 text-slate-800 py-2 px-4 rounded-md hover:bg-slate-300 transition-colors font-medium">
              Configure
            </button>
          </div>

          {/* Warning message for delete */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">
              ⚠️ Deleting an agent will permanently remove it from the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;