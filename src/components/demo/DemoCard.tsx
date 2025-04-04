import { Demo } from '@/lib/types';
import { Calendar, Users, PlayCircle, CheckSquare, AlertCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface DemoCardProps {
  demo: Demo;
  companyName: string;
  viewMode: 'preparation' | 'review';
}

export function DemoCard({ demo, companyName, viewMode }: DemoCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getDaysUntilDemo = (date: string) => {
    const today = new Date();
    const demoDate = new Date(date);
    const diffTime = demoDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPreparationStatus = () => {
    if (!demo.aiSummary) return 'needs-research';
    if (!demo.actionItems?.length) return 'needs-planning';
    return 'ready';
  };

  return (
    <Link href={`/demos/${demo.id}`}>
      <div className={`
        border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer
        ${viewMode === 'preparation' && getPreparationStatus() === 'needs-research' ? 'border-orange-200 bg-orange-50' : ''}
        ${viewMode === 'preparation' && getPreparationStatus() === 'needs-planning' ? 'border-purple-200 bg-purple-50' : ''}
        ${viewMode === 'preparation' && getPreparationStatus() === 'ready' ? 'border-green-200 bg-green-50' : ''}
      `}>
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{demo.title}</h3>
              <span className={`
                px-2 py-1 rounded text-sm font-medium
                ${demo.type === 'Vision' ? 'bg-purple-100 text-purple-700' :
                  demo.type === 'Value' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'}
              `}>
                {demo.type}
              </span>
            </div>
            <p className="text-sm text-gray-600">{companyName}</p>
          </div>
          
          {viewMode === 'preparation' && (
            <div className="flex items-center gap-2">
              {getPreparationStatus() === 'needs-research' && (
                <div className="flex items-center gap-1 text-orange-700 bg-orange-100 px-2 py-1 rounded text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Needs Research
                </div>
              )}
              {getPreparationStatus() === 'needs-planning' && (
                <div className="flex items-center gap-1 text-purple-700 bg-purple-100 px-2 py-1 rounded text-sm">
                  <Clock className="h-4 w-4" />
                  Needs Planning
                </div>
              )}
              {getPreparationStatus() === 'ready' && (
                <div className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded text-sm">
                  <CheckSquare className="h-4 w-4" />
                  Ready
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(demo.date)}
            </div>
            {viewMode === 'preparation' && getDaysUntilDemo(demo.date) > 0 && (
              <span className="text-blue-600 font-medium">
                {getDaysUntilDemo(demo.date)} days until demo
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              {demo.attendees.length} Attendees
            </div>
            {demo.recordingUrl && (
              <div className="flex items-center text-blue-600">
                <PlayCircle className="h-4 w-4 mr-2" />
                Recording Available
              </div>
            )}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {demo.useCases.map((useCase) => (
              <span
                key={useCase.id}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {useCase.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Items Preview */}
        {viewMode === 'preparation' && demo.actionItems && demo.actionItems.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Preparation Status ({demo.actionItems.length} items)
            </div>
            <div className="space-y-2">
              {demo.actionItems.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckSquare className="h-4 w-4 mt-0.5 text-gray-400" />
                  <span>{item}</span>
                </div>
              ))}
              {demo.actionItems.length > 2 && (
                <div className="text-sm text-blue-600">
                  +{demo.actionItems.length - 2} more items
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
