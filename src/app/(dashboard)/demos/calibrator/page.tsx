'use client';

import '@/app/globals.css';
import { useState, useEffect } from "react";
import DemoCalibrator from "@/components/demo-prep/DemoCalibrator";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, ArrowRight, LayoutGrid, LayoutList, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSavedPreferences, savePreferences } from "@/lib/demo-calibrator-utils";
import { type LayoutPreference } from "@/types/demo-calibrator";

export default function DemoCalibratorPage() {
  const [layoutPreferenceState, setLayoutPreferenceState] = useState<LayoutPreference>('expanded');

  // Load saved preferences on mount
  useEffect(() => {
    const savedPrefs = getSavedPreferences();
    if (savedPrefs?.layout) {
      setLayoutPreferenceState(savedPrefs.layout as LayoutPreference);
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    savePreferences({ 
      layout: layoutPreferenceState, 
      lastIndustry: '' // Will be populated by child component
    });
  }, [layoutPreferenceState]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-4">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 shadow-lg"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-6 w-6 text-[#39FF14]" />
                  <h1 className="text-2xl font-bold text-white">Demo Script Calibrator</h1>
                </div>
                
                <div className="flex items-center bg-slate-800/50 rounded-md border border-slate-700 p-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost" 
                          size="icon"
                          className={`h-8 w-8 rounded-sm ${layoutPreferenceState === 'compact' ? 'bg-slate-700' : ''}`}
                          onClick={() => setLayoutPreferenceState('compact')}
                        >
                          <LayoutList className="h-4 w-4 text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Compact View</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost" 
                          size="icon"
                          className={`h-8 w-8 rounded-sm ${layoutPreferenceState === 'expanded' ? 'bg-slate-700' : ''}`}
                          onClick={() => setLayoutPreferenceState('expanded')}
                        >
                          <LayoutGrid className="h-4 w-4 text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Expanded View</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost" 
                          size="icon"
                          className={`h-8 w-8 rounded-sm ${layoutPreferenceState === 'visual' ? 'bg-slate-700' : ''}`}
                          onClick={() => setLayoutPreferenceState('visual')}
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Visual View</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-slate-300 max-w-2xl">
                Fine-tune your demo script parameters to generate a customized presentation
                that perfectly matches your prospect&apos;s technical level, solution maturity, 
                buying stage, and decision authority.
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <Sparkles className="h-4 w-4 text-[#39FF14]" />
                <span>AI-powered script generation based on prospect characteristics</span>
              </div>
            </div>
            
            <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden opacity-[0.07]">
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 rotate-12">
                <BrainCircuit className="h-64 w-64 text-[#39FF14]" />
              </div>
            </div>
          </motion.div>
          
          <DemoCalibrator layoutPreference={layoutPreferenceState} />
          
          <div className="mt-6 rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-start gap-3 text-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Pro Tip: Calibrate for the primary decision maker</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Even when presenting to multiple stakeholders, optimize your script for the highest-level 
                  decision maker in the room. Our AI will automatically include appropriate technical details 
                  based on your industry and technical sophistication settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
