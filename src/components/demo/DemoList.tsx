import { Demo, Company } from '@/lib/types';
import { DemoCard } from './DemoCard';
import { Search, Filter, Plus } from 'lucide-react';

interface DemoListProps {
  demos: Demo[];
  companies: Company[];
  viewMode: 'preparation' | 'review';
}

export function DemoList({ demos, companies, viewMode }: DemoListProps) {
  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={viewMode === 'preparation' ? 
              "Search upcoming demos by company or use case..." :
              "Search past demos by company, outcome, or learnings..."}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
        {viewMode === 'preparation' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            <span>Schedule Demo</span>
          </button>
        )}
      </div>

      {/* Quick Stats */}
      {viewMode === 'preparation' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Upcoming This Week</div>
            <div className="text-2xl font-bold text-blue-700">
              {demos.filter(d => {
                const demoDate = new Date(d.date);
                const today = new Date();
                const weekFromNow = new Date();
                weekFromNow.setDate(today.getDate() + 7);
                return demoDate >= today && demoDate <= weekFromNow;
              }).length}
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">Needs Preparation</div>
            <div className="text-2xl font-bold text-purple-700">
              {demos.filter(d => !d.aiSummary || d.actionItems?.length === 0).length}
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600 font-medium">Ready to Present</div>
            <div className="text-2xl font-bold text-green-700">
              {demos.filter(d => d.aiSummary && d.actionItems?.length > 0).length}
            </div>
          </div>
        </div>
      )}

      {/* Demo Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {demos.map((demo) => {
          const company = companies.find(c => c.id === demo.companyId);
          return (
            <DemoCard
              key={demo.id}
              demo={demo}
              companyName={company?.name || 'Unknown Company'}
              viewMode={viewMode}
            />
          );
        })}
      </div>
    </div>
  );
}
