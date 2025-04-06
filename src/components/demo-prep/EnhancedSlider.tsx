import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getSliderPositionIndicator } from "@/lib/demo-calibrator-utils";
import { Sparkles } from "lucide-react";

interface EnhancedSliderProps {
  value: number;
  onChange: (value: number[]) => void;
  optimalRange: [number, number];
  color: string;
  className?: string;
}

export function EnhancedSlider({ 
  value, 
  onChange, 
  optimalRange, 
  color,
  className
}: EnhancedSliderProps) {
  const [isInOptimalRange, setIsInOptimalRange] = useState<boolean>(
    value >= optimalRange[0] && value <= optimalRange[1]
  );
  const [showOptimalIndicator, setShowOptimalIndicator] = useState<boolean>(false);
  const [previousValue, setPreviousValue] = useState<number>(value);
  
  // Position indicator
  const positionIndicator = getSliderPositionIndicator(value, optimalRange);
  
  // Update whenever value changes
  useEffect(() => {
    // Check if value entered optimal range
    const wasInOptimalRange = previousValue >= optimalRange[0] && previousValue <= optimalRange[1];
    const isNowInOptimalRange = value >= optimalRange[0] && value <= optimalRange[1];
    
    // If transitioning into optimal range, show the indicator
    if (!wasInOptimalRange && isNowInOptimalRange) {
      setShowOptimalIndicator(true);
      setTimeout(() => setShowOptimalIndicator(false), 2000);
    }
    
    setIsInOptimalRange(isNowInOptimalRange);
    setPreviousValue(value);
  }, [value, optimalRange, previousValue]);
  
  // Generate color classes based on color prop
  const getSliderTrackClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-200 dark:bg-blue-900/40",
      green: "bg-green-200 dark:bg-green-900/40",
      purple: "bg-purple-200 dark:bg-purple-900/40",
      orange: "bg-orange-200 dark:bg-orange-900/40",
    };
    
    return colorMap[color] || "bg-slate-200 dark:bg-slate-700";
  };
  
  const getSliderThumbClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500 dark:bg-blue-600",
      green: "bg-green-500 dark:bg-green-600",
      purple: "bg-purple-500 dark:bg-purple-600",
      orange: "bg-orange-500 dark:bg-orange-600",
    };
    
    return colorMap[color] || "bg-slate-500";
  };
  
  // Get opacity class based on whether value is in optimal range
  const getOpacityClass = () => {
    return isInOptimalRange ? "opacity-100" : "opacity-70";
  };
  
  return (
    <div className={cn("relative", className)}>
      {/* Optimal range indicator */}
      <div 
        className="absolute h-2 rounded-full z-0 opacity-30" 
        style={{
          left: `${optimalRange[0]}%`,
          width: `${optimalRange[1] - optimalRange[0]}%`,
          backgroundColor: isInOptimalRange ? '#39FF14' : '#94a3b8',
        }}
      />
      
      {/* Main slider component */}
      <Slider
        defaultValue={[value]}
        value={[value]}
        max={100}
        step={5}
        onValueChange={onChange}
        className={cn([
          "w-full [&>span]:h-2 [&>span]:rounded-full z-10",
          `[&>span]:${getSliderTrackClass(color)}`,
          `[&>span>span]:${getSliderThumbClass(color)}`,
          getOpacityClass(),
        ])}
      />
      
      {/* Optimal range notification */}
      <AnimatePresence>
        {showOptimalIndicator && (
          <motion.div 
            className="absolute -top-9 left-1/2 transform -translate-x-1/2 z-20 bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-lg whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#39FF14]" />
            <span>Optimal setting</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-slate-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Labels */}
      <div className="w-full flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-2">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
}
