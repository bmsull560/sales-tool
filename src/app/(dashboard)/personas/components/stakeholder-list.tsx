import { StakeholderCard } from "@/components/stakeholder/StakeholderCard";
import { mockStakeholders } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { Stakeholder } from "@/lib/types";

async function getStakeholders() {
  // Replace with actual API call - this is server-side code
  return mockStakeholders;
}

export async function StakeholderListServer() {
  const stakeholders = await getStakeholders();
  
  if (stakeholders.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 text-center">
        <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-200">No stakeholders</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Get started by adding a stakeholder.</p>
      </div>
    );
  }
  
  return <StakeholderCardList stakeholders={stakeholders} />;
}

// This is a client-compatible component that receives pre-fetched data
export function StakeholderCardList({ 
  stakeholders, 
  selectedId, 
  onSelect 
}: { 
  stakeholders: Stakeholder[],
  selectedId?: string,
  onSelect?: (stakeholder: Stakeholder) => void 
}) {
  return (
    <div className="flex flex-col space-y-4">
      {stakeholders.map((stakeholder) => (
        <div key={stakeholder.id} className="w-full">
          <StakeholderCard 
            id={stakeholder.id}
            name={stakeholder.name}
            title={stakeholder.title}
            department={stakeholder.department}
            influence={stakeholder.influence}
            interest={stakeholder.interest}
            disposition={stakeholder.disposition}
            tags={stakeholder.tags}
            selected={selectedId === stakeholder.id}
            onClick={() => onSelect?.(stakeholder)}
          />
        </div>
      ))}
    </div>
  );
}
