import { Suspense } from 'react';
import { getPersonasData } from './components/server-actions';
import PersonasClient from './personas-client';

export default async function PersonasPage() {
  // Fetch data on the server
  const data = await getPersonasData();
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39FF14]"></div>
      </div>
    }>
      <PersonasClient initialData={data} />
    </Suspense>
  );
}
