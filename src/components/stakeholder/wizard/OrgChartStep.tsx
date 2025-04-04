'use client';

import { useState } from 'react';
import { Stakeholder } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface OrgChartStepProps {
  data: Partial<Stakeholder>;
  onChange: (data: Partial<Stakeholder>) => void;
  allStakeholders: Stakeholder[];
}

export function OrgChartStep({ data, onChange, allStakeholders }: OrgChartStepProps) {
  const [newResponsibility, setNewResponsibility] = useState('');
  
  const handleInputChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };
  
  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      const updatedResponsibilities = [...(data.responsibilities || []), newResponsibility.trim()];
      onChange({ responsibilities: updatedResponsibilities });
      setNewResponsibility('');
    }
  };
  
  const removeResponsibility = (index: number) => {
    const updatedResponsibilities = [...(data.responsibilities || [])];
    updatedResponsibilities.splice(index, 1);
    onChange({ responsibilities: updatedResponsibilities });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addResponsibility();
    }
  };

  // Filter out the current stakeholder from potential managers
  const potentialManagers = allStakeholders.filter(
    stakeholder => stakeholder.id !== data.id
  );
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={data.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={data.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Job title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={data.department || ''}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Department"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={data.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Organizational Position */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Organizational Position</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={data.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="Role in the organization"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organizationLevel">Organization Level</Label>
                <Select
                  value={data.organizationLevel || ''}
                  onValueChange={(value: string) => handleInputChange('organizationLevel', value)}
                >
                  <SelectTrigger id="organizationLevel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive</SelectItem>
                    <SelectItem value="senior_management">Senior Management</SelectItem>
                    <SelectItem value="middle_management">Middle Management</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="decisionMakingRole">Decision Making Role</Label>
                <Select
                  value={data.decisionMakingRole || ''}
                  onValueChange={(value: string) => handleInputChange('decisionMakingRole', value)}
                >
                  <SelectTrigger id="decisionMakingRole">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="decision_maker">Decision Maker</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                    <SelectItem value="recommender">Recommender</SelectItem>
                    <SelectItem value="implementer">Implementer</SelectItem>
                    <SelectItem value="end_user">End User</SelectItem>
                    <SelectItem value="gatekeeper">Gatekeeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reportsTo">Reports To</Label>
                <Select
                  value={data.reportsTo || 'none'}
                  onValueChange={(value: string) => handleInputChange('reportsTo', value === 'none' ? '' : value)}
                >
                  <SelectTrigger id="reportsTo">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None / Unknown</SelectItem>
                    {potentialManagers.map((stakeholder) => (
                      <SelectItem key={stakeholder.id} value={stakeholder.id}>
                        {stakeholder.name} ({stakeholder.title})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Responsibilities */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Responsibilities</h3>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a responsibility"
                className="flex-1"
              />
              <button
                onClick={addResponsibility}
                className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {(data.responsibilities || []).map((responsibility, index) => (
                <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {responsibility}
                  <button
                    onClick={() => removeResponsibility(index)}
                    className="ml-1 text-gray-500 hover:text-gray-700 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
              {(data.responsibilities || []).length === 0 && (
                <p className="text-sm text-gray-500">No responsibilities added yet</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Notes */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={data.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any additional notes about this stakeholder's position in the organization"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
