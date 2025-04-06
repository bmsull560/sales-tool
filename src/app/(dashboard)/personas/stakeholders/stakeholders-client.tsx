'use client';

import { useState } from 'react';
import { StakeholderCard } from "@/components/stakeholder/StakeholderCard";
import { StakeholderDetail } from "@/components/stakeholder/StakeholderDetail";
import { StakeholderMap } from "@/components/stakeholder/StakeholderMap"; 
import { Stakeholder, Relationship } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface StakeholdersClientProps {
  initialData: {
    stakeholders: Stakeholder[];
    relationships: Relationship[];
  }
}

export default function StakeholdersClient({ initialData }: StakeholdersClientProps) {
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(initialData.stakeholders[0] || null);
  const [stakeholderData, setStakeholderData] = useState<Stakeholder[]>(initialData.stakeholders);
  const [filteredStakeholders, setFilteredStakeholders] = useState<Stakeholder[]>(initialData.stakeholders);
  const [searchQuery, setSearchQuery] = useState("");

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
              
              <h2 className="text-lg font-semibold mb-4">Key Stakeholders</h2>
              {filteredStakeholders.length > 0 ? (
                <div className="flex flex-col space-y-4">
                  {filteredStakeholders.map((stakeholder) => (
                    <div key={stakeholder.id} className="w-full">
                      <StakeholderCard
                        id={stakeholder.id}
                        name={stakeholder.name}
                        title={stakeholder.title}
                        department={stakeholder.department}
                        influence={stakeholder.influence}
                        interest={stakeholder.interest}
                        disposition={stakeholder.disposition}
                        tags={stakeholder.tags}
                        selected={selectedStakeholder?.id === stakeholder.id}
                        onClick={() => handleSelectStakeholder(stakeholder)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 text-center">
                  <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
                  <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-200">No matching stakeholders</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search terms.</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Stakeholder Details</h2>
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

        <TabsContent value="map">
          <h2 className="text-lg font-semibold mb-4">Stakeholder Relationship Map</h2>
          <StakeholderMap 
            stakeholders={stakeholderData}
            relationships={initialData.relationships}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
