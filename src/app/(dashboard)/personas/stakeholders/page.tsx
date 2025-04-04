'use client';

import { useState } from 'react';
import { StakeholderCard } from "@/components/stakeholder/StakeholderCard";
import { StakeholderDetail } from "@/components/stakeholder/StakeholderDetail";
import { StakeholderMap } from "@/components/stakeholder/StakeholderMap"; 
import { mockStakeholders, mockRelationships } from "@/lib/mock-data";
import { Stakeholder } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 

export default function StakeholdersPage() {
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(mockStakeholders[0] || null);

  const [stakeholderData, setStakeholderData] = useState<Stakeholder[]>(mockStakeholders);

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Stakeholder Analysis</h1>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List & Details</TabsTrigger>
          <TabsTrigger value="map">Relationship Map</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Key Stakeholders</h2>
              {stakeholderData.map((stakeholder) => (
                <div key={stakeholder.id} onClick={() => handleSelectStakeholder(stakeholder)} className="cursor-pointer">
                  <StakeholderCard
                    id={stakeholder.id}
                    name={stakeholder.name}
                    title={stakeholder.title}
                    department={stakeholder.department}
                    influence={stakeholder.influence}
                    interest={stakeholder.interest}
                    tags={stakeholder.tags}
                  />
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Stakeholder Details</h2>
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

        <TabsContent value="map">
          <h2 className="text-lg font-semibold mb-4">Stakeholder Relationship Map</h2>
          <StakeholderMap 
            stakeholders={stakeholderData} 
            relationships={mockRelationships} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
