'use client';

import { ArrowUpRight, Building2, Users, PieChart, Presentation, BarChart4, BrainCircuit, Sparkles, Zap, Lightbulb } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-xl"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-7 w-7 text-[#39FF14]" />
            <h1 className="text-3xl font-bold text-white">DemoGenius<span className="text-[#39FF14]">AI</span></h1>
          </div>
          <p className="mt-3 max-w-xl text-lg text-slate-300">
            Your intelligent platform for revolutionizing sales demos through AI-powered preparation and execution
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/demos/calibrator"
              className="inline-flex items-center gap-2 rounded-lg bg-[#39FF14] px-4 py-2 text-sm font-medium text-black transition-all hover:bg-opacity-90 hover:shadow-lg hover:shadow-[#39FF14]/20"
            >
              <Sparkles className="h-4 w-4" /> Create New Demo
            </Link>
            <Link
              href="/personas"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-600"
            >
              <Users className="h-4 w-4" /> Manage Personas
            </Link>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rotate-12 opacity-20">
          <Zap className="h-full w-full text-[#39FF14]" />
        </div>
      </motion.div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Workflow Navigation</h2>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-[#39FF14]"></span>
            <span className="text-sm font-medium">Optimized for your sales process</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Research Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-md font-semibold text-slate-500 dark:text-slate-400">RESEARCH</h3>
                <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              </div>
              
              <div className="space-y-3">
                <DashboardCard 
                  title="Companies" 
                  description="Target company insights and industry context"
                  icon={<Building2 size={20} />}
                  href="/companies"
                  count={8}
                  color="blue"
                />
                <DashboardCard 
                  title="Personas" 
                  description="Stakeholder mapping and influence tracking"
                  icon={<Users size={20} />}
                  href="/personas"
                  count={24}
                  color="blue"
                />
                <DashboardCard 
                  title="Value Mapping" 
                  description="Solution alignment with customer needs"
                  icon={<PieChart size={20} />}
                  href="/value-mapping"
                  count={12}
                  color="blue"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Preparation Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-md font-semibold text-slate-500 dark:text-slate-400">PREPARATION</h3>
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              
              <div className="space-y-3">
                <DashboardCard 
                  title="Demo Calibrator" 
                  description="Tailor demos to prospect sophistication"
                  icon={<Lightbulb size={20} />}
                  href="/demos/calibrator"
                  count={3}
                  color="green"
                  highlight={true}
                />
                <DashboardCard 
                  title="Demo Archives" 
                  description="Repository of successful demo flows"
                  icon={<Presentation size={20} />}
                  href="/demos"
                  count={16}
                  color="green"
                />
                <DashboardCard 
                  title="Demo Storyboard" 
                  description="Visual planning of your demo flow"
                  icon={<Zap size={20} />}
                  href="/demos/preparation"
                  count={7}
                  color="green"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Execution Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-md font-semibold text-slate-500 dark:text-slate-400">EXECUTION</h3>
                <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
              </div>
              
              <div className="space-y-3">
                <DashboardCard 
                  title="ROI & Business Case" 
                  description="Value calculation and financial justification"
                  icon={<BarChart4 size={20} />}
                  href="/roi"
                  count={5}
                  color="purple"
                />
                <DashboardCard 
                  title="Follow-Up Manager" 
                  description="Post-demo engagement and tracking"
                  icon={<ArrowUpRight size={20} />}
                  href="/followup"
                  count={9}
                  color="purple"
                />
                <DashboardCard 
                  title="Demolytics" 
                  description="Performance analytics and insights"
                  icon={<BrainCircuit size={20} />}
                  href="/analytics"
                  count={0}
                  color="purple"
                  soon={true}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <Link 
            href="/activity"
            className="text-sm font-medium text-[#39FF14] hover:underline"
          >
            View all
          </Link>
        </div>
        
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">New stakeholder added to <span className="font-semibold">Enterprise Cloud Migration</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Today at 2:30 PM</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Presentation className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Demo script generated for <span className="font-semibold">Healthcare Data Platform</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Yesterday at 11:15 AM</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <BarChart4 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium">ROI calculator updated for <span className="font-semibold">Financial Services Solution</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  count: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  highlight?: boolean;
  soon?: boolean;
}

function DashboardCard({ 
  title, 
  description, 
  icon, 
  href, 
  count, 
  color = 'blue',
  highlight = false,
  soon = false
}: DashboardCardProps) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-500'
    }
  };
  
  return (
    <Link 
      href={href}
      className={`block rounded-lg border ${highlight ? 'border-[#39FF14]/50 dark:border-[#39FF14]/30 shadow-sm shadow-[#39FF14]/10' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-900 p-4 hover:shadow-md transition-all relative overflow-hidden`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-2 ${colorMap[color].bg} ${colorMap[color].text} rounded-lg`}>
          {icon}
        </div>
        
        {!soon && (
          <span className={`h-5 w-5 flex items-center justify-center rounded-full text-xs font-semibold 
          ${count > 0 ? `${colorMap[color].bg} ${colorMap[color].text}` : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            {count}
          </span>
        )}
        
        {soon && (
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
            Soon
          </span>
        )}
      </div>
      
      <h3 className="text-sm font-semibold mt-3 flex items-center">
        {title}
        {highlight && <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-[#39FF14]"></span>}
      </h3>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{description}</p>
      
      {highlight && (
        <div className="absolute bottom-0 right-0 h-24 w-24 opacity-[0.07]">
          <Zap className="h-full w-full text-[#39FF14]" />
        </div>
      )}
    </Link>
  );
}
