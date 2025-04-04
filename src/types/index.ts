// Company and Industry Profile Types
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
}

export interface Industry {
  id: string;
  name: string;
  trends: string[];
  pressures: string[];
  compliance: string[];
  disruption: string[];
}

// Persona and Stakeholder Types
export interface Persona {
  id: string;
  company_id: string;
  name: string;
  title: string;
  role: 'decision_maker' | 'influencer' | 'user' | 'blocker';
  email: string;
  phone: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Relationship {
  id: string;
  company_id: string;
  source_persona_id: string;
  target_persona_id: string;
  relationship_type: 'reports_to' | 'works_with' | 'influences';
  strength: 'strong' | 'medium' | 'weak';
  notes: string;
}

// Value Mapping Types
export interface ProblemStatement {
  id: string;
  company_id: string;
  description: string;
  affected_department: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
}

export interface UseCase {
  id: string;
  company_id: string;
  title: string;
  description: string;
  current_state: string;
  desired_state: string;
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface FeatureMapping {
  id: string;
  use_case_id: string;
  feature_id: string;
  relevance: 'primary' | 'secondary' | 'tertiary';
  notes: string;
}

// ROI and Business Case Types
export interface ROIModel {
  id: string;
  company_id: string;
  name: string;
  timeframe: number; // in months
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface ROIMetric {
  id: string;
  roi_model_id: string;
  name: string;
  category: 'cost_savings' | 'revenue_increase' | 'risk_reduction';
  current_value: number;
  projected_value: number;
  unit: string;
  notes: string;
}

// Demo Types
export interface DemoScript {
  id: string;
  company_id: string;
  title: string;
  objective: string;
  audience: string[];
  duration: number; // in minutes
  created_at: string;
  updated_at: string;
}

export interface DemoStep {
  id: string;
  demo_script_id: string;
  order: number;
  title: string;
  description: string;
  feature_id: string | null;
  use_case_id: string | null;
  duration: number; // in seconds
  notes: string;
}
