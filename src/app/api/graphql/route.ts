// src/app/api/graphql/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Define the type for our Agent data
type Agent = {
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
    name: 'GraphQL Data Analyzer',
    description: 'Processes and finds insights in large datasets using GraphQL.',
    status: 'online',
    tasksCompleted: 242,
  },
  {
    id: '2',
    name: 'GraphQL Support Bot',
    description: 'Handles customer inquiries through GraphQL queries.',
    status: 'online', 
    tasksCompleted: 187,
  },
  {
    id: '3',
    name: 'API Gateway Agent',
    description: 'Manages both REST and GraphQL API connections.',
    status: 'error',
    tasksCompleted: 95,
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  await delay(800); // Simulate GraphQL processing time
  
  try {
    const { query, variables } = await request.json();

    // Handle agents query
    if (query.includes('query GetAgents')) {
      return NextResponse.json({
        data: {
          agents: mockAgents
        }
      });
    }

    // Handle createAgent mutation  
    if (query.includes('mutation CreateAgent')) {
      const { name, description } = variables;
      
      const newAgent: Agent = {
        id: Math.random().toString(36).substring(7),
        name,
        description,
        status: 'offline',
        tasksCompleted: 0,
      };
      
      mockAgents.push(newAgent);
      
      return NextResponse.json({
        data: {
          createAgent: newAgent
        }
      });
    }

    return NextResponse.json({ 
      errors: [{ message: 'Invalid GraphQL query' }] 
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ 
      errors: [{ message: 'GraphQL execution failed' }] 
    }, { status: 500 });
  }
}