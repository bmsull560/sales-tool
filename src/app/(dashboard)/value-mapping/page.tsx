'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ValuePropositionCard } from '@/components/value-mapping/ValuePropositionCard';
import { ValueMatrix } from '@/components/value-mapping/ValueMatrix';
import { ValuePropositionDetail } from '@/components/value-mapping/ValuePropositionDetail';
import { mockValuePropositions, mockStakeholders } from '@/lib/mock-data';
import { ValueProposition } from '@/lib/types';

export default function ValueMappingPage() {
  // State for value propositions
  const [valuePropositions, setValuePropositions] = useState<ValueProposition[]>(mockValuePropositions);
  
  // State for selected value proposition
  const [selectedValueProposition, setSelectedValueProposition] = useState<ValueProposition | null>(
    valuePropositions[0] || null
  );

  // Handle value proposition selection
  const handleSelectValueProposition = (valueProposition: ValueProposition) => {
    setSelectedValueProposition(valueProposition);
  };

  // Handle value proposition updates
  const handleValuePropositionChange = (updatedValueProposition: ValueProposition) => {
    setValuePropositions((prev) =>
      prev.map((vp) => (vp.id === updatedValueProposition.id ? updatedValueProposition : vp))
    );
    
    if (selectedValueProposition?.id === updatedValueProposition.id) {
      setSelectedValueProposition(updatedValueProposition);
    }
  };

  // Handle customer priority change
  const handleCustomerPriorityChange = (value: number) => {
    if (!selectedValueProposition) return;
    
    const updatedVP = {
      ...selectedValueProposition,
      customerPriority: value,
    };
    
    handleValuePropositionChange(updatedVP);
  };

  // Handle solution strength change
  const handleSolutionStrengthChange = (value: number) => {
    if (!selectedValueProposition) return;
    
    const updatedVP = {
      ...selectedValueProposition,
      solutionStrength: value,
    };
    
    handleValuePropositionChange(updatedVP);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Value Mapping</h1>
          <p className="text-slate-500 mt-1">
            Map and prioritize value propositions based on customer priorities and solution strengths
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          <span>Add Value Proposition</span>
        </button>
      </div>

      <Tabs defaultValue="matrix" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="matrix">Value Matrix</TabsTrigger>
          <TabsTrigger value="list">Value List</TabsTrigger>
        </TabsList>

        {/* Matrix View */}
        <TabsContent value="matrix" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ValueMatrix
                valuePropositions={valuePropositions}
                onValuePropositionChange={handleValuePropositionChange}
                onValuePropositionSelect={handleSelectValueProposition}
              />
            </div>
            
            <div>
              {selectedValueProposition ? (
                <ValuePropositionDetail
                  valueProposition={selectedValueProposition}
                  allStakeholders={mockStakeholders}
                  onCustomerPriorityChange={handleCustomerPriorityChange}
                  onSolutionStrengthChange={handleSolutionStrengthChange}
                />
              ) : (
                <div className="bg-white rounded-lg border p-6 text-center text-gray-500">
                  Select a value proposition from the matrix to view details
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-6">
          <div className="flex items-center w-full max-w-md mb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search value propositions..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {valuePropositions.map((vp) => (
                <ValuePropositionCard
                  key={vp.id}
                  valueProposition={vp}
                  onClick={() => handleSelectValueProposition(vp)}
                  selected={selectedValueProposition?.id === vp.id}
                />
              ))}
            </div>
            
            <div className="lg:col-span-2">
              {selectedValueProposition ? (
                <ValuePropositionDetail
                  valueProposition={selectedValueProposition}
                  allStakeholders={mockStakeholders}
                  onCustomerPriorityChange={handleCustomerPriorityChange}
                  onSolutionStrengthChange={handleSolutionStrengthChange}
                />
              ) : (
                <div className="bg-white rounded-lg border p-6 text-center text-gray-500">
                  Select a value proposition from the list to view details
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
