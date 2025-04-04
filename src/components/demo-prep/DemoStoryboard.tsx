'use client';

import * as React from 'react';
import { useState } from 'react';
import { 
  Clock, 
  Presentation, 
  Plus, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Move,
  ScreenShare,
  MessageSquare,
  LineChart,
  Zap
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface StoryboardStep {
  id: string;
  title: string;
  type: 'presentation' | 'demo' | 'discussion' | 'data' | 'feature';
  duration: number; // in minutes
  description: string;
  keyPoints: string[];
  expanded: boolean;
}

const getStepIcon = (type: StoryboardStep['type']) => {
  switch (type) {
    case 'presentation': return <Presentation className="h-5 w-5 text-blue-400" />;
    case 'demo': return <ScreenShare className="h-5 w-5 text-green-400" />;
    case 'discussion': return <MessageSquare className="h-5 w-5 text-yellow-400" />;
    case 'data': return <LineChart className="h-5 w-5 text-purple-400" />;
    case 'feature': return <Zap className="h-5 w-5 text-orange-400" />;
    default: return <Presentation className="h-5 w-5" />;
  }
};

const getStepColor = (type: StoryboardStep['type']) => {
  switch (type) {
    case 'presentation': return 'border-l-blue-500';
    case 'demo': return 'border-l-green-500';
    case 'discussion': return 'border-l-yellow-500';
    case 'data': return 'border-l-purple-500';
    case 'feature': return 'border-l-orange-500';
    default: return 'border-l-gray-500';
  }
};

const initialSteps: StoryboardStep[] = [
  {
    id: '1',
    title: 'Introduction & Agenda',
    type: 'presentation',
    duration: 5,
    description: 'Welcome and overview of what will be covered',
    keyPoints: [
      'Company introduction',
      'Agenda overview',
      'Expected outcomes'
    ],
    expanded: false
  },
  {
    id: '2',
    title: 'Problem Statement',
    type: 'discussion',
    duration: 7,
    description: 'Discuss the challenges the prospect is facing',
    keyPoints: [
      'Current pain points',
      'Business impact',
      'Desired outcomes'
    ],
    expanded: false
  },
  {
    id: '3',
    title: 'Platform Overview',
    type: 'demo',
    duration: 10,
    description: 'Live demonstration of core platform capabilities',
    keyPoints: [
      'User interface walkthrough',
      'Core workflows',
      'Admin capabilities'
    ],
    expanded: false
  },
  {
    id: '4',
    title: 'ROI Analysis',
    type: 'data',
    duration: 5,
    description: 'Present expected return on investment',
    keyPoints: [
      'Cost savings calculation',
      'Efficiency improvements',
      'Implementation timeline'
    ],
    expanded: false
  }
];

export default function DemoStoryboard() {
  const [steps, setSteps] = useState<StoryboardStep[]>(initialSteps);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStep, setNewStep] = useState<Partial<StoryboardStep>>({
    title: '',
    type: 'presentation',
    duration: 5,
    description: '',
    keyPoints: [''],
    expanded: true
  });

  const totalDuration = steps.reduce((total, step) => total + step.duration, 0);

  const toggleExpand = (id: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, expanded: !step.expanded } : step
    ));
  };

  const handleAddStep = () => {
    if (!newStep.title) return;
    
    const step: StoryboardStep = {
      id: Date.now().toString(),
      title: newStep.title || 'New Step',
      type: newStep.type || 'presentation',
      duration: newStep.duration || 5,
      description: newStep.description || '',
      keyPoints: newStep.keyPoints?.filter(p => p.trim() !== '') || [],
      expanded: false
    };
    
    setSteps([...steps, step]);
    setIsAddingStep(false);
    setNewStep({
      title: '',
      type: 'presentation',
      duration: 5,
      description: '',
      keyPoints: [''],
      expanded: true
    });
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const addKeyPoint = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, keyPoints: [...step.keyPoints, ''] } : step
    ));
  };

  const updateKeyPoint = (stepId: string, index: number, value: string) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        const newKeyPoints = [...step.keyPoints];
        newKeyPoints[index] = value;
        return { ...step, keyPoints: newKeyPoints };
      }
      return step;
    }));
  };

  const removeKeyPoint = (stepId: string, index: number) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        const newKeyPoints = [...step.keyPoints];
        newKeyPoints.splice(index, 1);
        return { ...step, keyPoints: newKeyPoints };
      }
      return step;
    }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Presentation className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Demo Storyboard</h2>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-slate-400" />
          <span className="text-lg">Total: {totalDuration} minutes</span>
          <Button 
            onClick={() => setIsAddingStep(true)} 
            className="ml-4 bg-[#39FF14] hover:bg-[#32E512] text-black"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Step
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`bg-slate-800 border-l-4 ${getStepColor(step.type)} rounded-lg overflow-hidden`}
          >
            <div 
              className="p-4 flex items-center cursor-pointer"
              onClick={() => toggleExpand(step.id)}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-slate-700 rounded-full mr-3">
                {index + 1}
              </div>
              <div className="flex items-center mr-3">
                {getStepIcon(step.type)}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {step.duration}m
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStep(step.id);
                  }}
                >
                  <X className="h-4 w-4 text-slate-400 hover:text-red-400" />
                </Button>
                {step.expanded ? 
                  <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                }
              </div>
            </div>
            
            {step.expanded && (
              <div className="p-4 pt-0 border-t border-slate-700 mt-2">
                <div className="mb-4">
                  <div className="font-medium mb-2">KEY POINTS</div>
                  <div className="space-y-2">
                    {step.keyPoints.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-[#39FF14] rounded-full mr-2"></div>
                        <div className="flex-grow">
                          <Input 
                            value={point} 
                            onChange={(e) => updateKeyPoint(step.id, pointIndex, e.target.value)}
                            className="bg-slate-700 border-slate-600"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeKeyPoint(step.id, pointIndex)}
                          className="ml-1"
                        >
                          <X className="h-4 w-4 text-slate-400 hover:text-red-400" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addKeyPoint(step.id)}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Point
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isAddingStep && (
          <div className="bg-slate-800 border-l-4 border-l-[#39FF14] rounded-lg p-4">
            <h3 className="font-medium mb-3">Add New Step</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <Input 
                  value={newStep.title} 
                  onChange={(e) => setNewStep({...newStep, title: e.target.value})}
                  placeholder="Step title"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Type</label>
                  <select 
                    value={newStep.type} 
                    onChange={(e) => setNewStep({...newStep, type: e.target.value as StoryboardStep['type']})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                  >
                    <option value="presentation">Presentation</option>
                    <option value="demo">Demo</option>
                    <option value="discussion">Discussion</option>
                    <option value="data">Data/Analysis</option>
                    <option value="feature">Feature Highlight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Duration (minutes)</label>
                  <Input 
                    type="number" 
                    value={newStep.duration} 
                    onChange={(e) => setNewStep({...newStep, duration: parseInt(e.target.value) || 5})}
                    min={1}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <Textarea 
                  value={newStep.description} 
                  onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                  placeholder="Brief description of this step"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingStep(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddStep}
                  className="bg-[#39FF14] hover:bg-[#32E512] text-black"
                >
                  Add Step
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
