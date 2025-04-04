'use client';

import { useState } from 'react';
import { Stakeholder } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';

interface StrategyStepProps {
  data: Partial<Stakeholder>;
  onChange: (data: Partial<Stakeholder>) => void;
}

export function StrategyStep({ data, onChange }: StrategyStepProps) {
  const [newKeyMessage, setNewKeyMessage] = useState('');
  
  const handleInputChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };
  
  // Key messages handlers
  const addKeyMessage = () => {
    if (newKeyMessage.trim()) {
      const updatedKeyMessages = [...(data.keyMessages || []), newKeyMessage.trim()];
      onChange({ keyMessages: updatedKeyMessages });
      setNewKeyMessage('');
    }
  };
  
  const removeKeyMessage = (index: number) => {
    const updatedKeyMessages = [...(data.keyMessages || [])];
    updatedKeyMessages.splice(index, 1);
    onChange({ keyMessages: updatedKeyMessages });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyMessage();
    }
  };
  
  // Get suggested engagement strategy based on influence and interest
  const getSuggestedStrategy = () => {
    const influence = data.influence || 50;
    const interest = data.interest || 50;
    
    if (influence >= 70 && interest >= 70) {
      return "Key Player: Manage closely with frequent communication. Involve in governance and decision-making. Seek their input on key decisions and keep them fully engaged.";
    } else if (influence >= 70 && interest < 70) {
      return "Meet Their Needs: Keep satisfied with regular updates. Focus on addressing their specific concerns and requirements. Try to increase their level of interest.";
    } else if (influence < 70 && interest >= 70) {
      return "Show Consideration: Keep informed and consult on areas of interest. Leverage their enthusiasm and involve them in low-risk areas. They can be potential supporters or ambassadors.";
    } else {
      return "Least Important: Monitor with minimal effort. Use general communication channels like newsletters or website updates. Consider moving them to a higher quadrant if appropriate.";
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Communication Preferences */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Communication Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="communicationFrequency">Communication Frequency</Label>
                <Select
                  value={data.communicationFrequency || ''}
                  onValueChange={(value: string) => handleInputChange('communicationFrequency', value)}
                >
                  <SelectTrigger id="communicationFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="as_needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="communicationChannel">Preferred Channel</Label>
                <Select
                  value={data.communicationChannel || ''}
                  onValueChange={(value: string) => handleInputChange('communicationChannel', value)}
                >
                  <SelectTrigger id="communicationChannel">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="in_person">In-Person Meeting</SelectItem>
                    <SelectItem value="video">Video Conference</SelectItem>
                    <SelectItem value="presentation">Formal Presentation</SelectItem>
                    <SelectItem value="formal_report">Written Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Engagement Strategy */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Engagement Strategy</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-md mb-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Suggested Strategy</h4>
              <p className="text-sm text-blue-700">{getSuggestedStrategy()}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="engagementStrategy">Custom Engagement Strategy</Label>
              <Textarea
                id="engagementStrategy"
                value={data.engagementStrategy || ''}
                onChange={(e) => handleInputChange('engagementStrategy', e.target.value)}
                placeholder="Describe your strategy for engaging with this stakeholder"
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Key Messages */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Key Messages</h3>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newKeyMessage}
                onChange={(e) => setNewKeyMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a key message for this stakeholder"
                className="flex-1"
              />
              <button
                onClick={addKeyMessage}
                className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="space-y-2 mt-2">
              {(data.keyMessages || []).map((message, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-1 p-2 bg-gray-50 rounded-md">
                    {message}
                  </div>
                  <button
                    onClick={() => removeKeyMessage(index)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(data.keyMessages || []).length === 0 && (
                <p className="text-sm text-gray-500">No key messages added yet</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stakeholder Matrix Reference */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Stakeholder Matrix Reference</h3>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-red-50 p-3 rounded-md">
              <h4 className="font-medium text-red-800 mb-1">Key Player</h4>
              <p className="text-red-700 text-xs">High Influence, High Interest</p>
              <ul className="mt-2 text-xs space-y-1 list-disc pl-4 text-red-800">
                <li>Manage closely</li>
                <li>Involve in governance</li>
                <li>Regular engagement</li>
              </ul>
            </div>
            
            <div className="bg-pink-50 p-3 rounded-md">
              <h4 className="font-medium text-pink-800 mb-1">Meet Their Needs</h4>
              <p className="text-pink-700 text-xs">High Influence, Low Interest</p>
              <ul className="mt-2 text-xs space-y-1 list-disc pl-4 text-pink-800">
                <li>Keep satisfied</li>
                <li>Address specific concerns</li>
                <li>Increase interest level</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-md">
              <h4 className="font-medium text-purple-800 mb-1">Show Consideration</h4>
              <p className="text-purple-700 text-xs">Low Influence, High Interest</p>
              <ul className="mt-2 text-xs space-y-1 list-disc pl-4 text-purple-800">
                <li>Keep informed</li>
                <li>Leverage enthusiasm</li>
                <li>Potential supporter</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium text-gray-800 mb-1">Least Important</h4>
              <p className="text-gray-700 text-xs">Low Influence, Low Interest</p>
              <ul className="mt-2 text-xs space-y-1 list-disc pl-4 text-gray-800">
                <li>Monitor with minimal effort</li>
                <li>General communications</li>
                <li>Consider repositioning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
