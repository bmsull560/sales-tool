'use client';

import { useState } from 'react';
import { StakeholderDetail } from "@/components/stakeholder/StakeholderDetail";
import StakeholderWizardClient from '@/components/stakeholder/StakeholderWizardClient';
import { Stakeholder, Relationship } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { StakeholderCardList } from './components/stakeholder-list';
import { StakeholderMap } from "@/components/stakeholder/StakeholderMap";

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39FF14]"></div>
    </div>
  );
}

interface PersonasClientProps {
  initialData: {
    stakeholders: Stakeholder[];
    relationships: Relationship[];
  }
}

export default function PersonasClient({ initialData }: PersonasClientProps) {
  // State for the currently selected stakeholder in the detail view
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);

  // State for influence/interest (ideally this would trigger backend updates)
  const [stakeholderData, setStakeholderData] = useState<Stakeholder[]>(initialData.stakeholders);
  
  // State for the add stakeholder wizard
  const [wizardOpen, setWizardOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStakeholders, setFilteredStakeholders] = useState<Stakeholder[]>(initialData.stakeholders);

  const handleSelectStakeholder = (stakeholder: Stakeholder) => {
    setSelectedStakeholder(stakeholder);
  };

  const handleInfluenceChange = (id: string, value: number) => {
    setStakeholderData(prev => 
      prev.map(s => s.id === id ? { ...s, influence: value } : s)
    );
    if (selectedStakeholder?.id === id) {
      setSelectedStakeholder(prev => prev ? { ...prev, influence: value } : null);
    }
    console.log(`Stakeholder ${id} influence updated to: ${value}`);
    // TODO: Add API call to persist this change
  };

  const handleInterestChange = (id: string, value: number) => {
    setStakeholderData(prev =>
      prev.map(s => s.id === id ? { ...s, interest: value } : s)
    );
    if (selectedStakeholder?.id === id) {
      setSelectedStakeholder(prev => prev ? { ...prev, interest: value } : null);
    }
    console.log(`Stakeholder ${id} interest updated to: ${value}`);
    // TODO: Add API call to persist this change
  };
  
  const handleAddStakeholder = (newStakeholder: Stakeholder) => {
    setStakeholderData(prev => [...prev, newStakeholder]);
    setFilteredStakeholders(prev => [...prev, newStakeholder]);
    setSelectedStakeholder(newStakeholder);
    console.log('New stakeholder added:', newStakeholder);
    // TODO: Add API call to persist this change
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredStakeholders(stakeholderData);
      return;
    }
    
    const filtered = stakeholderData.filter(
      stakeholder => 
        stakeholder.name.toLowerCase().includes(query) || 
        stakeholder.title.toLowerCase().includes(query) ||
        (stakeholder.department && stakeholder.department.toLowerCase().includes(query))
    );
    
    setFilteredStakeholders(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Personas & Stakeholders</h1>
        <p className="text-slate-500 mt-1">
          Map key stakeholders and their relationships
        </p>
        <Button 
          onClick={() => setWizardOpen(true)}
          className="inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Stakeholder
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List & Details</TabsTrigger>
          <TabsTrigger value="map">Relationship Map</TabsTrigger>
        </TabsList>

        {/* Tab 1: List and Details View */}
        <TabsContent value="list">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Stakeholder Cards */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center w-full mb-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search stakeholders..."
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              
              {filteredStakeholders.length > 0 ? (
                <div className="space-y-4 flex flex-col">
                  <h2 className="text-lg font-semibold">Key Stakeholders</h2>
                  <StakeholderCardList 
                    stakeholders={filteredStakeholders} 
                    selectedId={selectedStakeholder?.id} 
                    onSelect={handleSelectStakeholder}
                  />
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 text-center">
                  <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
                  <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-200">No matching stakeholders</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search terms.</p>
                </div>
              )}
            </div>

            {/* Right column - Stakeholder Detail */}
            <div className="lg:col-span-2">
              {selectedStakeholder ? (
                <StakeholderDetail
                  stakeholder={selectedStakeholder}
                  relationships={initialData.relationships}
                  allStakeholders={stakeholderData}
                  onInfluenceChange={(value) => handleInfluenceChange(selectedStakeholder.id, value)}
                  onInterestChange={(value) => handleInterestChange(selectedStakeholder.id, value)}
                />
              ) : (
                <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 text-center text-slate-500 dark:text-slate-400">
                  Select a stakeholder from the list to view details.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Relationship Map View */}
        <TabsContent value="map">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm h-[500px]">
            <Suspense fallback={<LoadingFallback />}>
              {/* No async component here */}
              {/* We now use client-side StakeholderMap with pre-fetched data */}
              {initialData.stakeholders.length > 0 && (
                <StakeholderMap 
                  stakeholders={stakeholderData} 
                  relationships={initialData.relationships} 
                />
              )}
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Stakeholder Wizard */}
      {wizardOpen && (
        <StakeholderWizardClient />
      )}
    </div>
  );
}
