import { DynamicStakeholderMap } from '@/components/stakeholder/DynamicStakeholderMap';
import { mockStakeholders, mockRelationships } from "@/lib/mock-data";
import { ErrorBoundary } from 'react-error-boundary';

async function getStakeholders() {
  // Replace with actual API call - this is server-side code
  return mockStakeholders;
}

// Convert the relationships to the format expected by DynamicStakeholderMap
const formattedRelationships = mockRelationships.map(rel => ({
  source: rel.sourceStakeholderId,
  target: rel.targetStakeholderId,
  type: rel.type || 'default'
}));

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
      <h2 className="text-lg font-medium text-red-800 dark:text-red-300">Something went wrong</h2>
      <p className="text-sm text-red-700 dark:text-red-400">{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 bg-red-100 dark:bg-red-800/40 text-red-800 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-800/60 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

export async function StakeholderRelationshipsServer() {
  const stakeholders = await getStakeholders();
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm h-[500px]">
        <DynamicStakeholderMap 
          stakeholders={stakeholders} 
          relationships={formattedRelationships} 
        />
      </div>
    </ErrorBoundary>
  );
}
