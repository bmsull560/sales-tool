'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DemoNarrativeScales from "@/components/demo-prep/DemoNarrativeScales";
import DemoStoryboard from "@/components/demo-prep/DemoStoryboard";
import SlideDeckBuilder from "@/components/demo-prep/SlideDeckBuilder";
import IntegrationDiagram from "@/components/demo-prep/IntegrationDiagram";
import ScriptGenerator from "@/components/demo-prep/ScriptGenerator";

export default function DemoPreparationPage() {
  const [activeTab, setActiveTab] = useState('storyboard');

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Banner across the top */}
      <DemoNarrativeScales />
      
      {/* Tabs and content underneath */}
      <div className="container mx-auto p-6">
        <Tabs 
          defaultValue="storyboard" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="storyboard" className="text-sm">Demo Storyboard</TabsTrigger>
            <TabsTrigger value="slides" className="text-sm">Slide Deck Builder</TabsTrigger>
            <TabsTrigger value="integration" className="text-sm">Integration Diagram</TabsTrigger>
            <TabsTrigger value="script" className="text-sm">Script Generator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="storyboard">
            <DemoStoryboard />
          </TabsContent>
          
          <TabsContent value="slides">
            <SlideDeckBuilder />
          </TabsContent>
          
          <TabsContent value="integration">
            <IntegrationDiagram />
          </TabsContent>
          
          <TabsContent value="script">
            <ScriptGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
