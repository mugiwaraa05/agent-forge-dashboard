import { NextResponse } from 'next/server';

// Define the type for our Agent data
export type Agent = {
  id: string;
  name: string;
  description: string;
  status: 'online' | 'offline' | 'error';
  tasksCompleted: number;
};

// Mock data 
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Data Analyzer',
    description: 'Processes and finds insights in large datasets.',
    status: 'online',
    tasksCompleted: 142,
  },
  {
    id: '2',
    name: 'Customer Support Bot',
    description: 'Handles common customer inquiries and support tickets.',
    status: 'online',
    tasksCompleted: 287,
  },
  {
    id: '3',
    name: 'Content Summarizer',
    description: 'Generates summaries from long articles and documents.',
    status: 'error',
    tasksCompleted: 89,
  },
];


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Handle GET requests to /api/agents
export async function GET() {
  await delay(500); 
  return NextResponse.json(mockAgents);
}

// Handle POST requests to /api/agents 
export async function POST(request: Request) {
  await delay(500);
  const body = await request.json();

  const newAgent: Agent = {
    id: Math.random().toString(36).substring(7), // Simple random ID
    name: body.name,
    description: body.description,
    status: 'offline',
    tasksCompleted: 0,
  };

  mockAgents.push(newAgent); // Save the new agent to mock DB

  return NextResponse.json(newAgent, { status: 201 });
}

// delete functionality
export async function DELETE(request: Request) {
  await delay(300);
  
  try {
    const { id } = await request.json();
    
    // Find the index of the agent to delete
    const agentIndex = mockAgents.findIndex(agent => agent.id === id);
    
    if (agentIndex === -1) {
      return NextResponse.json(
        { error: 'Agent not found' }, 
        { status: 404 }
      );
    }
    
    // Remove the agent from the array
    const deletedAgent = mockAgents.splice(agentIndex, 1)[0];
    
    return NextResponse.json(
      { message: 'Agent deleted successfully', agent: deletedAgent },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete agent' },
      { status: 500 }
    );
  }
}