'use client';

import { useState } from 'react';
import { Stakeholder } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/ui/step-indicator';
import { OrgChartStep } from './wizard/OrgChartStep';
import { InfluenceInterestStep } from './wizard/InfluenceInterestStep';
import { StrategyStep } from './wizard/StrategyStep';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface StakeholderWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (stakeholder: Stakeholder) => void;
  initialData?: Partial<Stakeholder>;
  allStakeholders: Stakeholder[];
}

export function StakeholderWizard({ 
  open, 
  onOpenChange,
  onComplete, 
  initialData,
  allStakeholders
}: StakeholderWizardProps) {
  const [step, setStep] = useState(1);
  const [stakeholderData, setStakeholderData] = useState<Partial<Stakeholder>>(
    initialData || {
      id: `stakeholder-${Date.now()}`,
      name: '',
      title: '',
      department: '',
      role: '',
      responsibilities: [],
      influence: 50,
      interest: 50,
      tags: [],
    }
  );
  
  const updateData = (data: Partial<Stakeholder>) => {
    setStakeholderData(prev => ({ ...prev, ...data }));
  };
  
  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const handleComplete = () => {
    onComplete(stakeholderData as Stakeholder);
    onOpenChange(false);
    // Reset wizard state
    setStep(1);
    setStakeholderData({
      id: `stakeholder-${Date.now()}`,
      name: '',
      title: '',
      department: '',
      role: '',
      responsibilities: [],
      influence: 50,
      interest: 50,
      tags: [],
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset wizard state
    setStep(1);
  };
  
  const stepTitles = [
    "Organization Chart",
    "Influence & Interest",
    "Communication Strategy"
  ];
  
  const stepDescriptions = [
    "Define the stakeholder's position in the organization",
    "Assess the stakeholder's influence and interest levels",
    "Plan your communication and engagement strategy"
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id ? 'Edit Stakeholder' : 'Add New Stakeholder'}
          </DialogTitle>
          <DialogDescription>
            {stepDescriptions[step - 1]}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <StepIndicator 
            steps={[
              { label: "Organization", completed: step > 1 },
              { label: "Influence & Interest", completed: step > 2 },
              { label: "Strategy", completed: false }
            ]} 
            currentStep={step} 
          />
        </div>
        
        <div className="mt-6">
          {step === 1 && (
            <OrgChartStep 
              data={stakeholderData} 
              onChange={updateData}
              allStakeholders={allStakeholders}
            />
          )}
          
          {step === 2 && (
            <InfluenceInterestStep 
              data={stakeholderData} 
              onChange={updateData}
            />
          )}
          
          {step === 3 && (
            <StrategyStep 
              data={stakeholderData} 
              onChange={updateData}
            />
          )}
        </div>
        
        <div className="flex justify-between pt-4 mt-6 border-t">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}
          
          {step < 3 ? (
            <Button onClick={nextStep}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              {initialData?.id ? 'Save Changes' : 'Add Stakeholder'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
