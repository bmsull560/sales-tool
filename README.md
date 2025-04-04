# Sales Engineer Software

A comprehensive platform for Sales Engineers to automate research, streamline content creation, map needs to solutions, and provide contextual insights.

## Project Overview

This application is designed to empower Sales Engineers with intelligent tools for deal preparation and execution, following a workflow-centric design approach.

### Core Capabilities

- **Company & Industry Profile**: Manage company information and industry research
- **Persona & Stakeholder Mapping**: Track key stakeholders and their relationships
- **Value Mapping & Demo Storyboarding**: Map customer needs to solutions and create compelling demos
- **ROI & Business Case**: Build ROI models and business justification

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Visualization**: react-flow
- **Backend**: Supabase (PostgreSQL, Auth, Storage)

## Getting Started

First, set up your Supabase project and update the environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── (auth)/ - Authentication related pages
│   │   └── (dashboard)/ - Main application pages
│   ├── components/
│   │   ├── company/ - Company profile components
│   │   ├── persona/ - Stakeholder mapping components
│   │   ├── value-mapping/ - Value mapping components
│   │   ├── roi/ - ROI and business case components
│   │   └── ui/ - Shared UI components
│   ├── hooks/ - Custom React hooks
│   ├── lib/ - Utility functions and libraries
│   └── types/ - TypeScript type definitions
└── public/ - Static assets
```

## Features

### Phase 1: Company and Industry Profile
- Company profile management
- Industry context visualization
- Competitive landscape analysis

### Phase 2: Persona and Stakeholder Mapping
- Stakeholder profile management
- Relationship visualization
- Buying process tracking

### Phase 3: Value Mapping and Demo Storyboarding
- Problem-solution mapping
- Use case prioritization
- Demo script creation
- Visual storyboarding

### Phase 4: ROI and Business Case Development
- ROI calculator
- Business case builder
- Value visualization
