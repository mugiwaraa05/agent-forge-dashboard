// src/lib/graphql.ts
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('/api/graphql');

// GraphQL Query
export const GET_AGENTS_QUERY = `
  query GetAgents {
    agents {
      id
      name
      description
      status
      tasksCompleted
    }
  }
`;

// GraphQL Mutation
export const CREATE_AGENT_MUTATION = `
  mutation CreateAgent($name: String!, $description: String!) {
    createAgent(name: $name, description: $description) {
      id
      name
      description
      status
      tasksCompleted
    }
  }
`;

export const graphqlClient = client;