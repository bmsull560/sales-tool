'use client';

import dynamic from 'next/dynamic';
import { Stakeholder } from '@/lib/types';

// Skeleton loader component for the map
function StakeholderMapSkeleton() {
  return (
    <div className="h-[500px] w-full rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-sm text-gray-500">Loading stakeholder map...</p>
      </div>
    </div>
  );
}

// Define the props interface for the map component
interface StakeholderMapProps {
  stakeholders: Stakeholder[];
  relationships: Array<{
    source: string;
    target: string;
    type: string;
  }>;
}

// Dynamically import the StakeholderMap component
const DynamicMap = dynamic(
  () => import('./StakeholderMap').then(mod => {
    // Create a wrapper component that converts the relationship format
    const WrappedMap = (props: StakeholderMapProps) => {
      return <mod.StakeholderMap 
        stakeholders={props.stakeholders} 
        relationships={props.relationships.map(rel => ({
          id: `${rel.source}-${rel.target}`,
          sourceStakeholderId: rel.source,
          targetStakeholderId: rel.target,
          type: (rel.type === 'default' ? 'works_with' : rel.type) as "reports_to" | "works_with" | "influences"
        }))} 
      />;
    };
    return WrappedMap;
  }),
  { 
    loading: () => <StakeholderMapSkeleton />,
    ssr: false // Disable SSR for components that rely on browser APIs
  }
);

// Wrapper component that uses the dynamically imported map
export function DynamicStakeholderMap({ stakeholders, relationships }: StakeholderMapProps) {
  return <DynamicMap stakeholders={stakeholders} relationships={relationships} />;
}
