'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StakeholderWizard } from './StakeholderWizard';
import { Stakeholder } from '@/lib/types';
import { mockStakeholders } from '@/lib/mock-data';

export default function StakeholderWizardClient() {
  const [wizardOpen, setWizardOpen] = useState(false);
  
  const handleAddStakeholder = (stakeholder: Stakeholder) => {
    // In a real app, this would call a server action to save the stakeholder
    console.log('Adding stakeholder:', stakeholder);
    // We would then refresh the stakeholder list or add to local state
  };
  
  return (
    <>
      <Button 
        onClick={() => setWizardOpen(true)}
        className="inline-flex items-center gap-2"
      >
        <PlusIcon className="h-4 w-4" />
        Add Stakeholder
      </Button>
      
      {wizardOpen && (
        <StakeholderWizard 
          open={wizardOpen}
          onOpenChange={setWizardOpen}
          onComplete={handleAddStakeholder}
          initialData={{}}
          allStakeholders={mockStakeholders}
        />
      )}
    </>
  );
}
