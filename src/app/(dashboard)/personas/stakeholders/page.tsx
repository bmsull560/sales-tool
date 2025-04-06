import { Suspense } from 'react';
import { getStakeholdersData } from './components/server-components';
import StakeholdersClient from './stakeholders-client';

export default async function StakeholdersPage() {
  // Fetch data on the server
  const data = await getStakeholdersData();
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39FF14]"></div>
      </div>
    }>
      <StakeholdersClient initialData={data} />
    </Suspense>
  );
}
