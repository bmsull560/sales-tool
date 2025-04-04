'use client';

import { useState } from 'react';
import { Stakeholder } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface InfluenceInterestStepProps {
  data: Partial<Stakeholder>;
  onChange: (data: Partial<Stakeholder>) => void;
}

export function InfluenceInterestStep({ data, onChange }: InfluenceInterestStepProps) {
  const [newTag, setNewTag] = useState('');
  const [newPainPoint, setNewPainPoint] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newKeyQuote, setNewKeyQuote] = useState('');
  
  const handleInputChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };
  
  // Tags handlers
  const addTag = () => {
    if (newTag.trim()) {
      const updatedTags = [...(data.tags || []), newTag.trim()];
      onChange({ tags: updatedTags });
      setNewTag('');
    }
  };
  
  const removeTag = (index: number) => {
    const updatedTags = [...(data.tags || [])];
    updatedTags.splice(index, 1);
    onChange({ tags: updatedTags });
  };
  
  // Pain points handlers
  const addPainPoint = () => {
    if (newPainPoint.trim()) {
      const updatedPainPoints = [...(data.painPoints || []), newPainPoint.trim()];
      onChange({ painPoints: updatedPainPoints });
      setNewPainPoint('');
    }
  };
  
  const removePainPoint = (index: number) => {
    const updatedPainPoints = [...(data.painPoints || [])];
    updatedPainPoints.splice(index, 1);
    onChange({ painPoints: updatedPainPoints });
  };
  
  // Objectives handlers
  const addObjective = () => {
    if (newObjective.trim()) {
      const updatedObjectives = [...(data.objectives || []), newObjective.trim()];
      onChange({ objectives: updatedObjectives });
      setNewObjective('');
    }
  };
  
  const removeObjective = (index: number) => {
    const updatedObjectives = [...(data.objectives || [])];
    updatedObjectives.splice(index, 1);
    onChange({ objectives: updatedObjectives });
  };
  
  // Key quotes handlers
  const addKeyQuote = () => {
    if (newKeyQuote.trim()) {
      const updatedKeyQuotes = [...(data.keyQuotes || []), newKeyQuote.trim()];
      onChange({ keyQuotes: updatedKeyQuotes });
      setNewKeyQuote('');
    }
  };
  
  const removeKeyQuote = (index: number) => {
    const updatedKeyQuotes = [...(data.keyQuotes || [])];
    updatedKeyQuotes.splice(index, 1);
    onChange({ keyQuotes: updatedKeyQuotes });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, addFunction: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFunction();
    }
  };
  
  // Disposition colors
  const dispositionColors = {
    champion: 'bg-green-100 text-green-800 border-green-200',
    supporter: 'bg-blue-100 text-blue-800 border-blue-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    critic: 'bg-orange-100 text-orange-800 border-orange-200',
    blocker: 'bg-red-100 text-red-800 border-red-200',
  };
  
  return (
    <div className="space-y-6">
      {/* Influence and Interest Matrix */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Influence & Interest Assessment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="influence">Influence Level</Label>
                  <span className="text-sm font-medium">{data.influence || 50}%</span>
                </div>
                <Slider
                  id="influence"
                  defaultValue={[data.influence || 50]}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleInputChange('influence', value[0])}
                />
                <p className="text-xs text-gray-500">
                  How much power does this stakeholder have to influence decisions?
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interest">Interest Level</Label>
                  <span className="text-sm font-medium">{data.interest || 50}%</span>
                </div>
                <Slider
                  id="interest"
                  defaultValue={[data.interest || 50]}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleInputChange('interest', value[0])}
                />
                <p className="text-xs text-gray-500">
                  How interested is this stakeholder in your project/solution?
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disposition">Disposition</Label>
                <Select
                  value={data.disposition || ''}
                  onValueChange={(value: string) => handleInputChange('disposition', value)}
                >
                  <SelectTrigger id="disposition">
                    <SelectValue placeholder="Select disposition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="champion">Champion</SelectItem>
                    <SelectItem value="supporter">Supporter</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="critic">Critic</SelectItem>
                    <SelectItem value="blocker">Blocker</SelectItem>
                  </SelectContent>
                </Select>
                
                {data.disposition && (
                  <Badge className={`${dispositionColors[data.disposition as keyof typeof dispositionColors]} mt-2`}>
                    {data.disposition.charAt(0).toUpperCase() + data.disposition.slice(1)}
                  </Badge>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  What is this stakeholder's attitude toward your project/solution?
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, addTag)}
                    placeholder="Add a tag"
                    className="flex-1"
                  />
                  <button
                    onClick={addTag}
                    className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {(data.tags || []).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => removeTag(index)}
                        className="ml-1 text-gray-500 hover:text-gray-700 rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                  {(data.tags || []).length === 0 && (
                    <p className="text-sm text-gray-500">No tags added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-800">Stakeholder Position</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Based on the influence and interest levels, this stakeholder falls into the{' '}
                  <strong>
                    {data.influence && data.influence >= 50
                      ? data.interest && data.interest >= 50
                        ? 'Key Player'
                        : 'Meet Their Needs'
                      : data.interest && data.interest >= 50
                        ? 'Show Consideration'
                        : 'Least Important'
                    }
                  </strong>{' '}
                  quadrant.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Pain Points & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pain Points */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Pain Points</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newPainPoint}
                  onChange={(e) => setNewPainPoint(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, addPainPoint)}
                  placeholder="Add a pain point"
                  className="flex-1"
                />
                <button
                  onClick={addPainPoint}
                  className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="space-y-2 mt-2">
                {(data.painPoints || []).map((painPoint, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-1 p-2 bg-gray-50 rounded-md">
                      {painPoint}
                    </div>
                    <button
                      onClick={() => removePainPoint(index)}
                      className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {(data.painPoints || []).length === 0 && (
                  <p className="text-sm text-gray-500">No pain points added yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Objectives */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Objectives</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, addObjective)}
                  placeholder="Add an objective"
                  className="flex-1"
                />
                <button
                  onClick={addObjective}
                  className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="space-y-2 mt-2">
                {(data.objectives || []).map((objective, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-1 p-2 bg-gray-50 rounded-md">
                      {objective}
                    </div>
                    <button
                      onClick={() => removeObjective(index)}
                      className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {(data.objectives || []).length === 0 && (
                  <p className="text-sm text-gray-500">No objectives added yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Key Quotes */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Key Quotes</h3>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Textarea
                value={newKeyQuote}
                onChange={(e) => setNewKeyQuote(e.target.value)}
                placeholder="Add a key quote from this stakeholder"
                className="flex-1"
                rows={2}
              />
              <button
                onClick={addKeyQuote}
                className="flex items-center justify-center p-2 h-10 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 self-start"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="space-y-3 mt-2">
              {(data.keyQuotes || []).map((quote, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-1 p-3 bg-gray-50 rounded-md italic border-l-4 border-gray-300">
                    "{quote}"
                  </div>
                  <button
                    onClick={() => removeKeyQuote(index)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(data.keyQuotes || []).length === 0 && (
                <p className="text-sm text-gray-500">No key quotes added yet</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
