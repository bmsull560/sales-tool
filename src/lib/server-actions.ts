'use server';

import { Stakeholder, Company, Demo, ValueProposition } from './types';
import { mockStakeholders, mockCompanies, mockDemos, mockValuePropositions } from './mock-data';

// In a real application, these would be database calls
// For now, we're using the mock data but structuring it as if it were real server actions

export async function getStakeholders(): Promise<Stakeholder[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockStakeholders;
}

export async function getStakeholderById(id: string): Promise<Stakeholder | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockStakeholders.find(stakeholder => stakeholder.id === id);
}

export async function createStakeholder(stakeholder: Omit<Stakeholder, 'id'>): Promise<Stakeholder> {
  await new Promise(resolve => setTimeout(resolve, 700));
  const newStakeholder = {
    ...stakeholder,
    id: `stakeholder-${Date.now()}`
  };
  // In a real app, we would save to a database here
  return newStakeholder;
}

export async function updateStakeholder(id: string, stakeholder: Partial<Stakeholder>): Promise<Stakeholder | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const existingIndex = mockStakeholders.findIndex(s => s.id === id);
  if (existingIndex === -1) return null;
  
  // In a real app, we would update the database
  const updatedStakeholder = {
    ...mockStakeholders[existingIndex],
    ...stakeholder
  };
  return updatedStakeholder;
}

export async function getCompanies(): Promise<Company[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockCompanies;
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCompanies.find(company => company.id === id);
}

export async function createCompany(company: Omit<Company, 'id'>): Promise<Company> {
  await new Promise(resolve => setTimeout(resolve, 600));
  const newCompany = {
    ...company,
    id: `company-${Date.now()}`
  };
  // In a real app, we would save to a database here
  return newCompany;
}

export async function getDemos(): Promise<Demo[]> {
  await new Promise(resolve => setTimeout(resolve, 450));
  return mockDemos;
}

export async function getDemoById(id: string): Promise<Demo | undefined> {
  await new Promise(resolve => setTimeout(resolve, 350));
  return mockDemos.find(demo => demo.id === id);
}

export async function getValuePropositions(): Promise<ValueProposition[]> {
  await new Promise(resolve => setTimeout(resolve, 550));
  // Convert string types to the correct enum types
  return mockValuePropositions.map(vp => ({
    ...vp,
    impact: vp.impact as "operational" | "financial" | "risk" | "strategic",
    timeToValue: vp.timeToValue as "short-term" | "medium-term" | "immediate" | "long-term"
  }));
}

export async function createValueProposition(valueProposition: Omit<ValueProposition, 'id'>): Promise<ValueProposition> {
  await new Promise(resolve => setTimeout(resolve, 650));
  const newValueProposition = {
    ...valueProposition,
    id: `value-${Date.now()}`
  };
  // In a real app, we would save to a database here
  return newValueProposition;
}

export async function updateValueProposition(id: string, valueProposition: Partial<ValueProposition>): Promise<ValueProposition | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const existingIndex = mockValuePropositions.findIndex(vp => vp.id === id);
  if (existingIndex === -1) return null;
  
  // In a real app, we would update the database
  const updatedValueProposition = {
    ...mockValuePropositions[existingIndex],
    ...valueProposition,
    // Ensure impact and timeToValue are the correct types
    impact: (valueProposition.impact || mockValuePropositions[existingIndex].impact) as "operational" | "financial" | "risk" | "strategic",
    timeToValue: (valueProposition.timeToValue || mockValuePropositions[existingIndex].timeToValue) as "short-term" | "medium-term" | "immediate" | "long-term"
  };
  return updatedValueProposition;
}
