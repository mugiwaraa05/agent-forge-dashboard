# AgentForge Dashboard

A modern Next.js dashboard for managing AI agents, demonstrating advanced React patterns, API integration, and accessibility best practices. Built for candidate pre-interview demonstration.

## 🚀 Live Demo

View Live Deployment • GitHub Repository

## ✨ Features

- **Next.js 14** with App Router and TypeScript
- **Dual API Integration**: REST & GraphQL endpoints
- **Advanced State Management**: Custom hooks and React patterns
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **Accessibility Focus**: WCAG-compliant components with focus management
- **Modern UI**: Beautiful gradients, animations, and dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: REST & GraphQL

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── agents/
│   │   │   └── route.ts # REST API endpoints
│   │   └── graphql/
│   │       └── route.ts # GraphQL API endpoint
│   ├── globals.css # Global styles
│   ├── layout.tsx # Root layout
│   └── page.tsx # Main dashboard page
├── components/
│   ├── ui/ # Reusable UI primitives
│   ├── AgentCard.tsx # Agent display component
│   ├── AgentModal.tsx # Accessible modal dialog
│   └── CreateAgentForm.tsx # Form with state management
└── hooks/
    └── useFetch.ts # Reusable data fetching hook
```

## 🎯 Key Demonstrations

### 1. Reusable React Hook: `useFetch`

```typescript
// Generic data fetching hook with TypeScript
const { data, isLoading, error, refetch } = useFetch<Agent[]>('/api/agents');
```

✅ Type-safe generic implementation\
✅ Loading, error, and data states\
✅ Abort controller for cleanup\
✅ Refetch capability

### 2. Complex Accessible Component: `AgentModal`

- **Focus Management**: Trap focus within modal, restore on close
- **Keyboard Navigation**: Tab cycling, Escape to close
- **ARIA Attributes**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Screen Reader Support**: Semantic HTML and proper labels
- **Backdrop Click Detection**: Click outside to close

### 3. API Integrations

**REST API (**`/api/agents`**)**:

- **GET** - Fetch all agents
- **POST** - Create new agent
- **DELETE** - Remove agent

**GraphQL API (**`/api/graphql`**)**:

- **GetAgents query** - Fetch agents
- **CreateAgent mutation** - Add new agent

### 4. State Management

- Local state with `useState` for UI interactions
- Custom hooks for data fetching logic
- Form state management with validation
- Loading and error state handling

### 5. Responsive Design

- Mobile-first Tailwind CSS approach
- Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Adaptive layouts for all screen sizes
- Modern gradients and shadows

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/agent-forge-dashboard.git
cd agent-forge-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📸 Usage

- **View Agent Dashboard**: Main feed displays all AI agents
- **Create New Agent**: Click "+ Create Agent" to add new agents
- **View Details**: Click any agent card to open detailed modal
- **Switch APIs**: Toggle between REST and GraphQL data fetching
- **Manage Agents**: Delete agents from the modal interface

## 🎨 UI/UX Features

- **Modern Dashboard Design**: Clean, professional interface inspired by AI agent platforms
- **Smooth Animations**: Hover effects and transitions
- **Status Indicators**: Color-coded agent status (online/offline/error)
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive**: Works seamlessly on desktop, tablet, and mobile

## 🔧 API Documentation

### REST Endpoints

- **GET** `/api/agents` - Retrieve all agents
- **POST** `/api/agents` - Create new agent
- **DELETE** `/api/agents` - Delete agent

### GraphQL Schema

```graphql
type Agent {
  id: ID!
  name: String!
  description: String!
  status: String!
  tasksCompleted: Int!
}

type Query {
  agents: [Agent!]!
}

type Mutation {
  createAgent(name: String!, description: String!): Agent!
}
```

## 🤝 Contributing

This is a demonstration project for interview purposes. Feel free to:

- Use as a learning reference
- Extend with additional features
- Adapt for your own projects

## 📄 License

MIT License - see LICENSE file for details. Feel free to use this code for learning and development purposes.

## 🏆 Interview Highlights

This project demonstrates:\
✅ **Next.js Expertise**: App Router, API routes, SSR/SSG capabilities\
✅ **React Patterns**: Custom hooks, component composition, state management\
✅ **TypeScript**: Full type safety throughout the application\
✅ **API Design**: REST and GraphQL implementation patterns\
✅ **UI/UX Skills**: Responsive design, accessibility, modern aesthetics\
✅ **Code Quality**: Clean architecture, reusable components, proper documentation

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS