'use client';

import DemoCalibrator from "@/components/demo-prep/DemoCalibrator";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, ArrowRight } from "lucide-react";

export default function DemoCalibratorClientWrapper() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 shadow-lg"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit className="h-6 w-6 text-[#39FF14]" />
            <h1 className="text-2xl font-bold text-white">Demo Script Calibrator</h1>
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
      
      <DemoCalibrator />
      
      <div className="mt-6 rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-start gap-3 text-sm">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full">
            <ArrowRight className="h-4 w-4" />
          </div>
          <div>
            <span className="font-medium text-slate-700 dark:text-slate-300">Next Steps:</span> 
            Use the generated script outline in the Demo Preparation Studio to build your full presentation flow.
          </div>
        </div>
      </div>
    </div>
  );
}
