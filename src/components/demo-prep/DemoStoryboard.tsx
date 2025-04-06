'use client';

import * as React from 'react';
import { useState, useRef, useMemo, useEffect } from 'react';
import { 
  Clock, 
  Presentation, 
  Plus, 
  X, 
  ArrowRight,
  Image as ImageIcon,
  Edit,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heading, Text, Label, KeyPoint } from "@/components/ui/typography";
import { FormField } from "@/components/ui/form-field";
import { IconButton, ActionButton } from "@/components/ui/icon-button";
import { DemoSection, DemoEmptyState } from "@/components/ui/demo-section";
import { DemoCard } from "@/components/ui/demo-card";

// Types and constants
interface StoryboardStep {
  id: string;
  title: string;
  type: StepType;
  duration: number; // in minutes
  description: string;
  keyPoints: string[];
  imageUrl?: string; // URL for the step thumbnail
  expanded: boolean;
}

type StepType = 'presentation' | 'demo' | 'discussion' | 'data' | 'feature';

const getStepTypeLabel = (type: StepType) => {
  switch (type) {
    case 'presentation': return 'Slide Deck';
    case 'demo': return 'Live Demo';
    case 'discussion': return 'Interactive Discussion';
    case 'data': return 'Data Visualization';
    case 'feature': return 'Feature Highlight';
    default: return 'Presentation';
  }
};

// Get the accent color for each step type
const getStepAccentColor = (type: StepType) => {
  switch (type) {
    case 'presentation': return '#60a5fa'; // blue-400
    case 'demo': return '#4ade80'; // green-400
    case 'discussion': return '#facc15'; // yellow-400
    case 'data': return '#c084fc'; // purple-400
    case 'feature': return '#fb923c'; // orange-400
    default: return '#60a5fa';
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
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=500&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?auto=format&fit=crop&w=500&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=500&q=80',
    expanded: false
  }
];

export default function DemoStoryboard() {
  const [steps, setSteps] = useState<StoryboardStep[]>(initialSteps);
  const [selectedStep, setSelectedStep] = useState<StoryboardStep | null>(null);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStep, setNewStep] = useState<Partial<StoryboardStep>>({
    title: '',
    type: 'presentation',
    duration: 5,
    description: '',
    keyPoints: [],
    expanded: false
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const totalDuration = useMemo(() => 
    steps.reduce((total, step) => total + step.duration, 0),
    [steps]
  );

  useEffect(() => {
    if (!isAddingStep) {
      setNewStep({
        id: '',
        title: '',
        type: 'presentation',
        duration: 5,
        description: '',
        keyPoints: [],
        expanded: false
      });
    }
  }, [isAddingStep]);

  const handleAddStep = () => {
    if (!newStep.title) return;

    const newStepId = `step-${Date.now()}`;
    const finalizedStep: StoryboardStep = {
      id: newStepId,
      title: newStep.title,
      type: newStep.type || 'presentation',
      duration: newStep.duration || 5,
      description: newStep.description || '',
      keyPoints: newStep.keyPoints || [],
      expanded: false,
      imageUrl: newStep.imageUrl || undefined
    };

    setSteps([...steps, finalizedStep]);
    setIsAddingStep(false);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const addKeyPoint = () => {
    if (!selectedStep) return;
    
    setSteps(steps.map(step => 
      step.id === selectedStep.id ? { 
        ...step, 
        keyPoints: [...step.keyPoints, ''] 
      } : step
    ));
    
    setSelectedStep({
      ...selectedStep,
      keyPoints: [...selectedStep.keyPoints, '']
    });
  };

  const updateKeyPoint = (index: number, value: string) => {
    if (!selectedStep) return;
    
    const updatedKeyPoints = [...selectedStep.keyPoints];
    updatedKeyPoints[index] = value;
    
    setSteps(steps.map(step => 
      step.id === selectedStep.id ? { 
        ...step, 
        keyPoints: updatedKeyPoints 
      } : step
    ));
    
    setSelectedStep({
      ...selectedStep,
      keyPoints: updatedKeyPoints
    });
  };

  const removeKeyPoint = (index: number) => {
    if (!selectedStep) return;
    
    const updatedKeyPoints = [...selectedStep.keyPoints];
    updatedKeyPoints.splice(index, 1);
    
    setSteps(steps.map(step => 
      step.id === selectedStep.id ? { 
        ...step, 
        keyPoints: updatedKeyPoints 
      } : step
    ));
    
    setSelectedStep({
      ...selectedStep,
      keyPoints: updatedKeyPoints
    });
  };

  const updateSelectedStep = (field: keyof StoryboardStep, value: string | number | string[] | boolean) => {
    if (!selectedStep) return;
    
    setSteps(steps.map(step => 
      step.id === selectedStep.id ? { 
        ...step, 
        [field]: value 
      } : step
    ));
    
    setSelectedStep({
      ...selectedStep,
      [field]: value
    });
  };

  const handleSaveStep = () => {
    setSelectedStep(null);
  };

  return (
    <DemoSection
      title="Demo Storyboard"
      subtitle="Create and arrange your demo flow sequence"
      contentClassName="w-full max-w-full overflow-hidden"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 mb-8 shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Heading as="h3" size="lg" color="primary" className="mb-1">Visual Demo Flow</Heading>
            <Text color="secondary" size="sm">
              Create a step-by-step sequence to guide your product demonstration.
            </Text>
          </div>
          
          <div className="flex flex-row items-center gap-2">
            <div className="bg-black/30 px-3 py-1.5 rounded-md flex items-center gap-2">
              <Clock className="text-[#39FF14] h-4 w-4" />
              <Text size="sm" color="primary">
                Total: <strong>{totalDuration} min</strong>
              </Text>
            </div>
            
            <ActionButton 
              icon={<Plus size={16} />}
              variant="accent"
              onClick={() => setIsAddingStep(true)}
            >
              Add Step
            </ActionButton>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute right-0 bottom-0 w-64 h-64 transform translate-x-1/4 translate-y-1/4">
            <div className="w-full h-full rounded-full bg-[#39FF14] filter blur-3xl"></div>
          </div>
        </div>
      </div>
      
      {/* Storyboard Header */}
      <div className="flex items-center pl-3 mb-3 text-sm font-medium text-slate-500 dark:text-slate-400">
        <div className="flex-1">Storyboard Sequence</div>
        <div className="w-24 text-center">Duration</div>
        <div className="w-24 text-center">Type</div>
        <div className="w-20"></div>
      </div>
      
      {/* Storyboard Horizontal Flow */}
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto pb-6 hide-scrollbar rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
      >
        <div className="flex p-6 min-w-max">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              <DemoCard
                accentColor={getStepAccentColor(step.type)}
                animateEntry
                index={index}
                className="w-[260px]"
              >
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10 bg-white dark:bg-slate-800 shadow-sm rounded-md py-1 px-2">
                    <span className="font-bold text-lg">{index + 1}.</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">{step.title}</span>
                  </div>
                  
                  {step.imageUrl ? (
                    <div className="h-[150px] w-full overflow-hidden relative">
                      <Image 
                        src={step.imageUrl} 
                        alt={step.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ) : (
                    <div className="h-[150px] w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                </div>
                
                <CardContent className="p-3">
                  <div className="mb-2">
                    <Label>{getStepTypeLabel(step.type)}</Label>
                    <Text color="secondary" size="sm" className="line-clamp-2 mt-1">
                      {step.description}
                    </Text>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    {step.keyPoints.slice(0, 2).map((point, idx) => (
                      <KeyPoint key={idx}>
                        {point}
                      </KeyPoint>
                    ))}
                    
                    {step.keyPoints.length > 2 && (
                      <Text size="xs" color="muted" className="mt-1 pl-2.5">
                        +{step.keyPoints.length - 2} more
                      </Text>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1 text-slate-400" />
                      <span>{step.duration} min</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <IconButton
                        icon={<Edit className="h-3.5 w-3.5" />}
                        variant="ghost"
                        size="sm"
                        rounded
                        onClick={() => setSelectedStep(step)}
                        label="Edit step"
                      />
                      <IconButton
                        icon={<X className="h-3.5 w-3.5" />}
                        variant="ghost"
                        size="sm"
                        rounded
                        onClick={() => removeStep(step.id)}
                        label="Remove step"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      />
                    </div>
                  </div>
                </CardContent>
              </DemoCard>
              
              {index < steps.length - 1 && (
                <div className="mx-3 flex items-center h-[150px]">
                  <div className="w-12 flex items-center justify-center">
                    <div className="w-10 h-[2px] bg-slate-200 dark:bg-slate-700 relative">
                      <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-700 absolute -right-2 -top-[7px]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {steps.length === 0 && (
        <DemoEmptyState 
          title="No Demo Steps Yet"
          description="Create your first demo step to build a visual sequence for your presentation."
          icon={<Presentation size={48} />}
          action={
            <ActionButton 
              icon={<Plus size={16} />} 
              variant="accent"
              onClick={() => setIsAddingStep(true)}
            >
              Add First Step
            </ActionButton>
          }
        />
      )}
      
      {/* Step Detail Dialog */}
      {selectedStep && (
        <Dialog open={!!selectedStep} onOpenChange={(open) => !open && setSelectedStep(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span>Edit Demo Step</span>
                <span className="text-sm text-slate-500 font-normal">({selectedStep.id})</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {/* Left Column - Main Details */}
              <div className="md:col-span-2 space-y-4">
                <FormField label="Step Title" htmlFor="title">
                  <Input
                    id="title"
                    value={selectedStep.title}
                    onChange={(e) => updateSelectedStep('title', e.target.value)}
                    placeholder="Enter step title"
                    className="w-full"
                  />
                </FormField>
                
                <FormField 
                  label="Description" 
                  htmlFor="description"
                  description="Describe what happens in this step of the demo"
                >
                  <Textarea
                    id="description"
                    value={selectedStep.description}
                    onChange={(e) => updateSelectedStep('description', e.target.value)}
                    placeholder="Describe what happens in this step"
                    rows={3}
                    className="w-full resize-none"
                  />
                </FormField>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Key Points
                    </label>
                    <IconButton 
                      icon={<Plus className="h-3.5 w-3.5" />}
                      size="sm"
                      variant="outline"
                      onClick={addKeyPoint}
                      label="Add key point"
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                    {selectedStep.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={point}
                          onChange={(e) => updateKeyPoint(index, e.target.value)}
                          placeholder="Enter key point"
                          className="flex-1"
                        />
                        <IconButton
                          icon={<X className="h-3.5 w-3.5" />}
                          variant="ghost"
                          size="sm"
                          rounded
                          onClick={() => removeKeyPoint(index)}
                          label="Remove key point"
                        />
                      </div>
                    ))}
                    
                    {selectedStep.keyPoints.length === 0 && (
                      <div className="text-center py-4 text-sm text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-md">
                        No key points added yet. Add some to highlight important details.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Settings */}
              <div className="space-y-4">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Step Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField label="Step Type" htmlFor="stepType">
                      <Select value={selectedStep.type} onValueChange={(value) => updateSelectedStep('type', value as StepType)}>
                        <SelectTrigger id="stepType" className="w-full">
                          <SelectValue placeholder="Select step type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="presentation">Slide Deck</SelectItem>
                          <SelectItem value="demo">Live Demo</SelectItem>
                          <SelectItem value="discussion">Interactive Discussion</SelectItem>
                          <SelectItem value="data">Data Visualization</SelectItem>
                          <SelectItem value="feature">Feature Highlight</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    
                    <FormField 
                      label="Duration (minutes)" 
                      htmlFor="duration"
                      description="Estimated time for this step in minutes"
                    >
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        max="60"
                        value={selectedStep.duration}
                        onChange={(e) => updateSelectedStep('duration', parseInt(e.target.value) || 1)}
                        className="w-full"
                      />
                    </FormField>
                    
                    <FormField 
                      label="Image URL" 
                      htmlFor="imageUrl"
                      description="Add an image URL or leave blank to use a default image"
                    >
                      <Input
                        id="imageUrl"
                        value={selectedStep.imageUrl || ''}
                        onChange={(e) => updateSelectedStep('imageUrl', e.target.value)}
                        placeholder="Enter image URL"
                        className="w-full"
                      />
                    </FormField>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col gap-2">
                  <ActionButton
                    icon={<Save className="h-4 w-4" />}
                    variant="accent"
                    onClick={handleSaveStep}
                    className="w-full"
                  >
                    Save Changes
                  </ActionButton>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedStep(null)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Add Step Dialog */}
      <Dialog open={isAddingStep} onOpenChange={setIsAddingStep}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Demo Step</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {/* Left Column - Main Details */}
            <div className="md:col-span-2 space-y-4">
              <FormField 
                label="Step Title" 
                htmlFor="newTitle"
                required
              >
                <Input
                  id="newTitle"
                  value={newStep.title || ''}
                  onChange={(e) => setNewStep({...newStep, title: e.target.value})}
                  placeholder="Enter step title"
                  className="w-full"
                />
              </FormField>
              
              <FormField 
                label="Description" 
                htmlFor="newDescription"
                description="Describe what happens in this step of the demo"
              >
                <Textarea
                  id="newDescription"
                  value={newStep.description || ''}
                  onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                  placeholder="Describe what happens in this step"
                  rows={3}
                  className="w-full resize-none"
                />
              </FormField>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Key Points
                </label>
                <div className="space-y-2">
                  {(newStep.keyPoints || []).map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={point}
                        onChange={(e) => {
                          const updatedPoints = [...(newStep.keyPoints || [])];
                          updatedPoints[index] = e.target.value;
                          setNewStep({...newStep, keyPoints: updatedPoints});
                        }}
                        placeholder="Enter key point"
                        className="flex-1"
                      />
                      <IconButton
                        icon={<X className="h-3.5 w-3.5" />}
                        variant="ghost"
                        size="sm"
                        rounded
                        onClick={() => {
                          const updatedPoints = [...(newStep.keyPoints || [])];
                          updatedPoints.splice(index, 1);
                          setNewStep({...newStep, keyPoints: updatedPoints});
                        }}
                        label="Remove key point"
                      />
                    </div>
                  ))}
                  
                  <ActionButton
                    icon={<Plus className="h-3.5 w-3.5" />}
                    variant="outline"
                    size="sm"
                    onClick={() => setNewStep({
                      ...newStep, 
                      keyPoints: [...(newStep.keyPoints || []), '']
                    })}
                    className="w-full"
                  >
                    Add Key Point
                  </ActionButton>
                </div>
              </div>
            </div>
            
            {/* Right Column - Settings */}
            <div className="space-y-4">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Step Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField label="Step Type" htmlFor="newStepType">
                    <Select value={newStep.type || 'presentation'} onValueChange={(value) => setNewStep({...newStep, type: value as StepType})}>
                      <SelectTrigger id="newStepType" className="w-full">
                        <SelectValue placeholder="Select step type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presentation">Slide Deck</SelectItem>
                        <SelectItem value="demo">Live Demo</SelectItem>
                        <SelectItem value="discussion">Interactive Discussion</SelectItem>
                        <SelectItem value="data">Data Visualization</SelectItem>
                        <SelectItem value="feature">Feature Highlight</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  
                  <FormField 
                    label="Duration (minutes)" 
                    htmlFor="newDuration"
                    description="Estimated time for this step in minutes"
                  >
                    <Input
                      id="newDuration"
                      type="number"
                      min="1"
                      max="60"
                      value={newStep.duration || 5}
                      onChange={(e) => setNewStep({...newStep, duration: parseInt(e.target.value) || 5})}
                      className="w-full"
                    />
                  </FormField>
                </CardContent>
              </Card>
              
              <DialogFooter className="flex flex-col gap-2 mt-6 sm:mt-0">
                <ActionButton
                  icon={<Plus className="h-4 w-4" />}
                  variant="accent"
                  onClick={handleAddStep}
                  disabled={!newStep.title}
                  className="w-full"
                >
                  Add Step
                </ActionButton>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingStep(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DemoSection>
  );
}
