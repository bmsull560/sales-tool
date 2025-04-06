'use client';

import { Demo } from '@/lib/types';
import { Calendar, Users, PlayCircle, CheckSquare, AlertCircle, Clock, ArrowUpRight, Tag, Zap } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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

  const preparationStatus = getPreparationStatus();
  const daysUntilDemo = getDaysUntilDemo(demo.date);
  const isUrgent = viewMode === 'preparation' && daysUntilDemo <= 3 && daysUntilDemo > 0;

  return (
    <Link href={`/demos/${demo.id}`} className="block">
      <div className={cn(
        "relative border dark:border-slate-800 rounded-lg overflow-hidden transition-all hover:shadow-md",
        {
          "border-l-4 border-l-orange-500 dark:border-l-orange-500": preparationStatus === 'needs-research',
          "border-l-4 border-l-purple-500 dark:border-l-purple-500": preparationStatus === 'needs-planning',
          "border-l-4 border-l-[#39FF14] dark:border-l-[#39FF14]": preparationStatus === 'ready'
        }
      )}>
        {/* Header */}
        <div className="p-5 pb-4 bg-white dark:bg-slate-900">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-base">{demo.title}</h3>
                <Badge 
                  className={cn(
                    "font-medium text-xs",
                    {
                      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400": demo.type === 'Vision',
                      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400": demo.type === 'Value',
                      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400": demo.type !== 'Vision' && demo.type !== 'Value'
                    }
                  )}
                >
                  {demo.type}
                </Badge>
                
                {isUrgent && (
                  <Badge variant="outline" className="border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400 font-medium text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Soon
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{companyName}</p>
            </div>
            
            {/* Status badge */}
            {viewMode === 'preparation' && (
              <div>
                {preparationStatus === 'needs-research' && (
                  <Badge variant="outline" className="border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Needs Research
                  </Badge>
                )}
                {preparationStatus === 'needs-planning' && (
                  <Badge variant="outline" className="border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400">
                    <Clock className="h-3 w-3 mr-1" />
                    Needs Planning
                  </Badge>
                )}
                {preparationStatus === 'ready' && (
                  <Badge variant="outline" className="border-[#39FF14]/30 dark:border-[#39FF14]/20 bg-[#39FF14]/10 text-green-700 dark:text-[#39FF14]">
                    <CheckSquare className="h-3 w-3 mr-1" />
                    Ready
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Info rows */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center text-slate-500 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {formatDate(demo.date)}
              </div>
              {viewMode === 'preparation' && daysUntilDemo > 0 && (
                <span className={cn(
                  "font-medium",
                  daysUntilDemo <= 3 
                    ? "text-red-600 dark:text-red-400" 
                    : daysUntilDemo <= 7 
                      ? "text-amber-600 dark:text-amber-400" 
                      : "text-blue-600 dark:text-blue-400"
                )}>
                  {daysUntilDemo} day{daysUntilDemo !== 1 ? 's' : ''} until demo
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center text-slate-500 dark:text-slate-400">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                {demo.attendees.length} Attendee{demo.attendees.length !== 1 ? 's' : ''}
              </div>
              {demo.recordingUrl && (
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <PlayCircle className="h-3.5 w-3.5 mr-1.5" />
                  Recording Available
                </div>
              )}
            </div>
          </div>

          {/* Use Cases */}
          <div className="mt-3">
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <Tag className="h-3.5 w-3.5 mr-1" />
              Use Cases:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {demo.useCases.map((useCase) => (
                <span
                  key={useCase.id}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full text-xs"
                >
                  {useCase.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Items Preview */}
        {viewMode === 'preparation' && demo.actionItems && demo.actionItems.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
              <span>Preparation Items ({demo.actionItems.length})</span>
              <span className={cn(
                "px-1.5 py-0.5 rounded-full text-xs flex items-center",
                preparationStatus === 'ready' 
                  ? "bg-[#39FF14]/10 text-green-700 dark:text-[#39FF14]" 
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              )}>
                {Math.round((demo.actionItems.filter(i => i.includes("[x]")).length / demo.actionItems.length) * 100)}% Complete
              </span>
            </div>
            <div className="space-y-1.5">
              {demo.actionItems.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-start gap-1.5 text-xs">
                  <CheckSquare className={cn(
                    "h-3.5 w-3.5 mt-0.5",
                    item.includes("[x]") 
                      ? "text-[#39FF14] dark:text-[#39FF14]" 
                      : "text-slate-400 dark:text-slate-500"
                  )} />
                  <span className={cn(
                    "text-slate-600 dark:text-slate-400",
                    item.includes("[x]") && "line-through opacity-70"
                  )}>
                    {item.replace("[x]", "").trim()}
                  </span>
                </div>
              ))}
              {demo.actionItems.length > 2 && (
                <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <span>+{demo.actionItems.length - 2} more items</span>
                  <ArrowUpRight className="h-3 w-3 ml-0.5" />
                </div>
              )}
            </div>
          </div>
        )}
        
        {preparationStatus === 'ready' && (
          <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4 rotate-45 bg-[#39FF14]/10 flex items-center justify-center">
              <Zap className="h-3 w-3 text-[#39FF14] transform -rotate-45" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
