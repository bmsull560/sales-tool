'use client';

import { mockCompanies, mockDemos } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, CheckCircle, Plus, Presentation, Search, SlidersHorizontal } from 'lucide-react';
import { DemoList } from '@/components/demo/DemoList';
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';

export default function DemosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const upcomingDemos = mockDemos.filter(demo => new Date(demo.date) > new Date());
  const inPrepDemos = mockDemos.filter(demo => demo.stage === 'Discovery');
  const completedDemos = mockDemos.filter(demo => new Date(demo.date) < new Date());
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Demo Archives</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Browse, prepare, and review your product demonstrations
            </p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <Input
                type="text"
                placeholder="Search demos..."
                className="pl-9 h-10 w-full md:w-[220px] text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Link href="/demos/preparation">
              <Button className="bg-[#39FF14] hover:bg-[#32E512] text-black">
                <Plus className="h-4 w-4 mr-1" /> New Demo
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 px-4">
              <TabsList className="h-14 bg-transparent border-b-0">
                <TabsTrigger 
                  value="upcoming" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#39FF14] data-[state=active]:text-[#39FF14] rounded-none h-14 px-4"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming
                  {upcomingDemos.length > 0 && (
                    <span className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-[#39FF14]/10 text-[#39FF14] text-xs font-medium">
                      {upcomingDemos.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="preparation" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#39FF14] data-[state=active]:text-[#39FF14] rounded-none h-14 px-4"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  In Preparation
                  {inPrepDemos.length > 0 && (
                    <span className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-[#39FF14]/10 text-[#39FF14] text-xs font-medium">
                      {inPrepDemos.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#39FF14] data-[state=active]:text-[#39FF14] rounded-none h-14 px-4"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                  {completedDemos.length > 0 && (
                    <span className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium">
                      {completedDemos.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <Button variant="ghost" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden md:inline">Filters</span>
              </Button>
            </div>

            <div className="p-6">
              <TabsContent value="upcoming" className="m-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {upcomingDemos.length > 0 ? (
                    <DemoList 
                      demos={upcomingDemos}
                      companies={mockCompanies}
                      viewMode="preparation"
                    />
                  ) : (
                    <EmptyState 
                      title="No upcoming demos" 
                      description="Get started by creating your first demo"
                      icon={<Presentation className="h-12 w-12 text-slate-300 dark:text-slate-600" />}
                      actionHref="/demos/preparation"
                      actionText="New Demo"
                    />
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="preparation" className="m-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {inPrepDemos.length > 0 ? (
                    <DemoList 
                      demos={inPrepDemos}
                      companies={mockCompanies}
                      viewMode="preparation"
                    />
                  ) : (
                    <EmptyState 
                      title="No demos in preparation" 
                      description="Start preparing a new demo from scratch"
                      icon={<Clock className="h-12 w-12 text-slate-300 dark:text-slate-600" />}
                      actionHref="/demos/preparation"
                      actionText="Prepare Demo"
                    />
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="completed" className="m-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {completedDemos.length > 0 ? (
                    <DemoList 
                      demos={completedDemos}
                      companies={mockCompanies}
                      viewMode="review"
                    />
                  ) : (
                    <EmptyState 
                      title="No completed demos" 
                      description="Your completed demos will appear here"
                      icon={<CheckCircle className="h-12 w-12 text-slate-300 dark:text-slate-600" />}
                    />
                  )}
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionHref?: string;
  actionText?: string;
}

function EmptyState({ title, description, icon, actionHref, actionText }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex items-center justify-center w-24 h-24 bg-slate-100 dark:bg-slate-800/50 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">{description}</p>
      
      {actionHref && actionText && (
        <Link href={actionHref}>
          <Button className="bg-[#39FF14] hover:bg-[#32E512] text-black">
            <Plus className="h-4 w-4 mr-1" />
            {actionText}
          </Button>
        </Link>
      )}
    </div>
  );
}
