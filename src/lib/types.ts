export type DemoType = 'Vision' | 'Value' | 'Technical';
export type DemoStage = 'Initial' | 'Discovery' | 'Technical Review' | 'Proposal' | 'Closing';

export interface Attendee {
  id: string;
  name: string;
  title: string;
  email: string;
}

export interface UseCase {
  id: string;
  name: string;
  description: string;
}

export interface Demo {
  id: string;
  companyId: string;
  title: string;
  date: string;
  type: DemoType;
  stage: DemoStage;
  attendees: Attendee[];
  useCases: UseCase[];
  recordingUrl?: string;
  aiSummary?: string;
  actionItems?: string[];
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  website: string;
  headquarters: string;
  industry: string;
  size: string;
  revenue: string;
  funding: string;
  stage: 'startup' | 'growth' | 'enterprise';
  created_at: string;
  updated_at: string;
  demos?: Demo[];
}

export interface Relationship {
  id: string;
  sourceStakeholderId: string;
  targetStakeholderId: string;
  type: 'reports_to' | 'works_with' | 'influences';
  strength?: 'strong' | 'medium' | 'weak';
}

export interface Stakeholder {
  id: string;
  name: string;
  title: string;
  department: string;
  email?: string;
  phone?: string;
  role: string;
  responsibilities: string[];
  painPoints?: string[];
  objectives?: string[];
  keyQuotes?: string[];
  reportsTo?: string; // ID of manager
  directReports?: string[]; // IDs of direct reports
  influence: number; // 0-100
  interest: number; // 0-100
  disposition?: 'champion' | 'supporter' | 'neutral' | 'critic' | 'blocker'; // Attitude toward the project
  tags: string[];
  notes?: string;
  // Organizational position
  organizationLevel?: 'executive' | 'senior_management' | 'middle_management' | 'operational' | 'external';
  decisionMakingRole?: 'decision_maker' | 'influencer' | 'recommender' | 'implementer' | 'end_user' | 'gatekeeper';
  // Communication strategy
  communicationFrequency?: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'as_needed';
  communicationChannel?: 'email' | 'phone' | 'in_person' | 'video' | 'presentation' | 'formal_report';
  engagementStrategy?: string;
  keyMessages?: string[];
  // Position for the map, optional
  position?: { x: number; y: number }; 
}

// Value Mapping Types
export interface ValueProposition {
  id: string;
  title: string;
  description: string;
  customerPriority: number; // 0-100
  solutionStrength: number; // 0-100
  impact: 'financial' | 'operational' | 'strategic' | 'risk';
  metrics: string[];
  stakeholderIds: string[]; // References to stakeholders who care about this value
  competitiveAdvantage: string;
  timeToValue: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  position?: { // For storing position in the matrix
    x: number;
    y: number;
  };
}

export interface ValueMatrix {
  id: string;
  name: string;
  description: string;
  demoId: string;
  valuePropositions: ValueProposition[];
  createdAt: string;
  updatedAt: string;
}
