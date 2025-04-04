'use client';

import { useState } from 'react';
import { StakeholderCard } from "@/components/stakeholder/StakeholderCard";
import { StakeholderDetail } from "@/components/stakeholder/StakeholderDetail";
import { DynamicStakeholderMap } from '@/components/stakeholder/DynamicStakeholderMap'; 
import StakeholderWizardClient from '@/components/stakeholder/StakeholderWizardClient';
import { mockStakeholders, mockRelationships } from "@/lib/mock-data";
import { Stakeholder } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

async function getStakeholders() {
  // Replace with actual API call
  return mockStakeholders;
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <h2 className="text-lg font-medium text-red-800">Something went wrong</h2>
      <p className="text-sm text-red-700">{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
      >
        Try again
      </button>
    </div>
  );
}

async function StakeholderList() {
  const stakeholders = await getStakeholders();
  
  if (stakeholders.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6 text-center">
        <Search className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No stakeholders</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding a stakeholder.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stakeholders.map((stakeholder) => (
        <StakeholderCard key={stakeholder.id} stakeholder={stakeholder} />
      ))}
    </div>
  );
}

// Convert the relationships to the format expected by DynamicStakeholderMap
const formattedRelationships = mockRelationships.map(rel => ({
  source: rel.sourceStakeholderId,
  target: rel.targetStakeholderId,
  type: rel.type || 'default'
}));

async function StakeholderRelationships() {
  const stakeholders = await getStakeholders();
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="bg-white p-4 rounded-lg shadow h-[500px]">
        <DynamicStakeholderMap 
          stakeholders={stakeholders} 
          relationships={formattedRelationships} 
        />
      </div>
    </ErrorBoundary>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function PersonasPage() {
  // State for the currently selected stakeholder in the detail view
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);

  // State for influence/interest (ideally this would trigger backend updates)
  const [stakeholderData, setStakeholderData] = useState<Stakeholder[]>([]);
  
  // State for the add stakeholder wizard
  const [wizardOpen, setWizardOpen] = useState(false);

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
    setSelectedStakeholder(newStakeholder);
    console.log('New stakeholder added:', newStakeholder);
    // TODO: Add API call to persist this change
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Personas & Stakeholders</h1>
        <p className="text-slate-500 mt-1">
          Map key stakeholders and their relationships
        </p>
        <StakeholderWizardClient />
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
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <Suspense fallback={<LoadingFallback />}>
                <StakeholderList />
              </Suspense>
            </div>

            {/* Right column - Stakeholder Detail */}
            <div className="lg:col-span-2">
              {selectedStakeholder ? (
                <StakeholderDetail
                  stakeholder={selectedStakeholder}
                  relationships={mockRelationships}
                  allStakeholders={stakeholderData}
                  onInfluenceChange={(value) => handleInfluenceChange(selectedStakeholder.id, value)}
                  onInterestChange={(value) => handleInterestChange(selectedStakeholder.id, value)}
                />
              ) : (
                <div className="bg-white rounded-lg border p-6 text-center text-gray-500">
                  Select a stakeholder from the list to view details.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Relationship Map View */}
        <TabsContent value="map">
          <Suspense fallback={<LoadingFallback />}>
            <StakeholderRelationships />
          </Suspense>
        </TabsContent>
      </Tabs>
      
      {/* Stakeholder Wizard */}
      <StakeholderWizardClient
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        onComplete={handleAddStakeholder}
        allStakeholders={stakeholderData}
      />
    </div>
  );
}
