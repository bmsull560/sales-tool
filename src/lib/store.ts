import { create } from 'zustand';
import { Company, Persona } from '@/types';

interface AppState {
  // Active selections
  selectedCompanyId: string | null;
  selectedPersonaId: string | null;
  
  // Cache
  companies: Company[];
  personas: Record<string, Persona[]>; // Keyed by company_id
  
  // Actions
  setSelectedCompanyId: (id: string | null) => void;
  setSelectedPersonaId: (id: string | null) => void;
  setCompanies: (companies: Company[]) => void;
  addCompany: (company: Company) => void;
  updateCompany: (company: Company) => void;
  removeCompany: (id: string) => void;
  setPersonas: (companyId: string, personas: Persona[]) => void;
  addPersona: (persona: Persona) => void;
  updatePersona: (persona: Persona) => void;
  removePersona: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  selectedCompanyId: null,
  selectedPersonaId: null,
  companies: [],
  personas: {},
  
  // Actions
  setSelectedCompanyId: (id) => set({ selectedCompanyId: id }),
  setSelectedPersonaId: (id) => set({ selectedPersonaId: id }),
  
  setCompanies: (companies) => set({ companies }),
  
  addCompany: (company) => set((state) => ({
    companies: [...state.companies, company]
  })),
  
  updateCompany: (company) => set((state) => ({
    companies: state.companies.map(c => 
      c.id === company.id ? company : c
    )
  })),
  
  removeCompany: (id) => set((state) => ({
    companies: state.companies.filter(c => c.id !== id)
  })),
  
  setPersonas: (companyId, personas) => set((state) => ({
    personas: {
      ...state.personas,
      [companyId]: personas
    }
  })),
  
  addPersona: (persona) => set((state) => {
    const companyId = persona.company_id;
    const companyPersonas = state.personas[companyId] || [];
    
    return {
      personas: {
        ...state.personas,
        [companyId]: [...companyPersonas, persona]
      }
    };
  }),
  
  updatePersona: (persona) => set((state) => {
    const companyId = persona.company_id;
    const companyPersonas = state.personas[companyId] || [];
    
    return {
      personas: {
        ...state.personas,
        [companyId]: companyPersonas.map(p => 
          p.id === persona.id ? persona : p
        )
      }
    };
  }),
  
  removePersona: (id) => set((state) => {
    const newPersonas = { ...state.personas };
    
    // Find and remove the persona from the appropriate company array
    Object.keys(newPersonas).forEach(companyId => {
      newPersonas[companyId] = newPersonas[companyId].filter(p => p.id !== id);
    });
    
    return { personas: newPersonas };
  })
}));
