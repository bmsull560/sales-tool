'use client';

import * as React from 'react';
import { useState } from 'react';
import { Info, ChevronDown, ChevronUp, Plus, X, Save, FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ScaleDefinition {
  id: string;
  name: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  description: string;
}

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  scales: {
    [scaleId: string]: number;
  };
}

const defaultScales: ScaleDefinition[] = [
  {
    id: 'technical',
    name: 'Technical Depth',
    leftLabel: 'Business Focus',
    rightLabel: 'Technical Detail',
    value: 60,
    description: 'Balance between business outcomes and technical implementation details'
  },
  {
    id: 'pace',
    name: 'Presentation Pace',
    leftLabel: 'Deliberate',
    rightLabel: 'Efficient',
    value: 50,
    description: 'Speed and depth of content delivery'
  },
  {
    id: 'interactivity',
    name: 'Interactivity',
    leftLabel: 'Presenter-led',
    rightLabel: 'Interactive',
    value: 70,
    description: 'Level of audience participation and engagement'
  },
  {
    id: 'complexity',
    name: 'Solution Complexity',
    leftLabel: 'Simplified',
    rightLabel: 'Comprehensive',
    value: 65,
    description: 'How much complexity and nuance to include'
  }
];

const defaultStakeholders: Stakeholder[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CTO',
    scales: {
      technical: 90,
      pace: 80,
      interactivity: 60,
      complexity: 85
    }
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'VP of Operations',
    scales: {
      technical: 40,
      pace: 60,
      interactivity: 70,
      complexity: 50
    }
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'IT Director',
    scales: {
      technical: 75,
      pace: 65,
      interactivity: 50,
      complexity: 70
    }
  }
];

export default function DemoNarrativeScales() {
  const [scales, setScales] = useState<ScaleDefinition[]>(defaultScales);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(defaultStakeholders);
  const [activeStakeholder, setActiveStakeholder] = useState<string | null>(null);
  const [isAddingScale, setIsAddingScale] = useState(false);
  const [newScale, setNewScale] = useState<Partial<ScaleDefinition>>({
    name: '',
    leftLabel: '',
    rightLabel: '',
    value: 50,
    description: ''
  });

  const handleScaleChange = (scaleId: string, newValue: number[]) => {
    setScales(scales.map(scale => 
      scale.id === scaleId ? { ...scale, value: newValue[0] } : scale
    ));
  };

  const handleStakeholderSelect = (stakeholderId: string) => {
    if (activeStakeholder === stakeholderId) {
      setActiveStakeholder(null);
    } else {
      setActiveStakeholder(stakeholderId);
      const stakeholder = stakeholders.find(s => s.id === stakeholderId);
      if (stakeholder) {
        setScales(scales.map(scale => ({
          ...scale,
          value: stakeholder.scales[scale.id] || scale.value
        })));
      }
    }
  };

  const getScaleColor = (value: number) => {
    if (value < 33) return 'bg-blue-500';
    if (value < 66) return 'bg-purple-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Demo Narrative Calibration</h2>
            <p className="text-slate-400 text-sm">Adjust these scales to calibrate your demo narrative for the audience</p>
          </div>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
              <Save className="h-4 w-4 mr-1" />
              Save Preset
            </Button>
            <Button size="sm" className="bg-[#39FF14] hover:bg-[#32E512] text-black">
              <FileText className="h-4 w-4 mr-1" />
              Generate Script
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scales.map(scale => (
            <div key={scale.id} className="bg-slate-800 rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-white">{scale.name}</span>
                <Info className="h-4 w-4 text-slate-400 cursor-help" />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>{scale.leftLabel}</span>
                <span>{scale.rightLabel}</span>
              </div>
              <Slider
                value={[scale.value]}
                min={0}
                max={100}
                step={5}
                onValueChange={(val) => handleScaleChange(scale.id, val)}
                className="mb-1"
              />
              <div className="flex justify-center">
                <Badge variant="outline" className={`${getScaleColor(scale.value)} text-white border-0 mt-1`}>
                  {scale.value}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap mt-4 gap-2">
          {stakeholders.map(stakeholder => (
            <Button
              key={stakeholder.id}
              variant={activeStakeholder === stakeholder.id ? "default" : "outline"}
              size="sm"
              className={activeStakeholder === stakeholder.id ? 
                "bg-[#39FF14] hover:bg-[#32E512] text-black" : 
                "text-slate-300 border-slate-700"}
              onClick={() => handleStakeholderSelect(stakeholder.id)}
            >
              {stakeholder.name} ({stakeholder.role})
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
