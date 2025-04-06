'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { LightbulbIcon, BrainCircuit, Sparkles, Zap, Building2, Cpu, LineChart, Users, Presentation, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EnhancedSlider } from "./EnhancedSlider";
import { ScriptVisualizer } from "./ScriptVisualizer";
import { getOptimalRanges, savePreferences } from "@/lib/demo-calibrator-utils";
import { 
  CalibratorOption, 
  IndustryInfo, 
  CalibratorValues, 
  CalibratorStage,
  LayoutPreference 
} from "@/types/demo-calibrator";

interface DemoCalibratorProps {
  layoutPreference: LayoutPreference;
}

const calibratorOptions: CalibratorOption[] = [
  {
    key: "technical",
    label: "Technical Sophistication",
    icon: <Cpu className="h-5 w-5" />,
    color: "blue",
    tips: [
      "Focus on ease of use and visual UX.",
      "Balance user outcomes with light technical validation.",
      "Lead with performance benchmarks and integration options."
    ]
  },
  {
    key: "maturity",
    label: "Solution Maturity",
    icon: <LineChart className="h-5 w-5" />,
    color: "green",
    tips: [
      "Educate on the problem and show first-mover advantage.",
      "Highlight differentiation and migration ease.",
      "Focus on competitive advantages and platform stability."
    ]
  },
  {
    key: "stage",
    label: "Buying Process Position",
    icon: <LightbulbIcon className="h-5 w-5" />,
    color: "purple",
    tips: [
      "Validate pain and build vision.",
      "Focus on ROI, implementation timeline, and friction reduction.",
      "Emphasize competitive differentiation and governance."
    ]
  },
  {
    key: "authority",
    label: "Decision Authority",
    icon: <Users className="h-5 w-5" />,
    color: "orange",
    tips: [
      "Create shareable internal content for influencers.",
      "Balance technical and business benefits for middle management.",
      "Frame your pitch as a strategic business investment."
    ]
  }
];

const industries: Record<string, IndustryInfo> = {
  Healthcare: {
    name: "Healthcare",
    description: "Healthcare and Life Sciences",
    tips: "Emphasize compliance, reliability, and data privacy.",
    iconColor: "blue"
  },
  Fintech: {
    name: "Fintech", 
    description: "Financial Technology",
    tips: "Highlight security, latency, and auditability.",
    iconColor: "green"
  },
  Retail: {
    name: "Retail",
    description: "Retail and eCommerce",
    tips: "Showcase personalization, scalability, and customer insights.",
    iconColor: "purple"
  },
  SaaS: {
    name: "SaaS",
    description: "Software as a Service",
    tips: "Focus on user onboarding, scalability, and recurring value.",
    iconColor: "orange"
  },
  Manufacturing: {
    name: "Manufacturing",
    description: "Manufacturing and Industry",
    tips: "Demonstrate efficiency, uptime, and supply chain integration.",
    iconColor: "slate"
  }
};

export default function DemoCalibrator({ layoutPreference }: DemoCalibratorProps) {
  const [values, setValues] = useState<CalibratorValues>({
    technical: 70,
    maturity: 50,
    stage: 60,
    authority: 65
  });
  const [industry, setIndustry] = useState<string>("Healthcare");
  const [scriptOutput, setScriptOutput] = useState<string>("Your demo script will appear here...");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isScriptGenerated, setIsScriptGenerated] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<CalibratorStage>('industry');
  
  // Calculate optimal ranges based on industry
  const optimalRanges = getOptimalRanges(industry, values);

  // Update preferences when industry changes
  useEffect(() => {
    savePreferences({
      layout: layoutPreference,
      lastIndustry: industry
    });
    
    // In progressive disclosure, after industry selection, move to primary controls
    if (currentStage === 'industry') {
      setTimeout(() => setCurrentStage('primary'), 300);
    }
  }, [industry, layoutPreference, currentStage]);

  const handleChange = (key: string, newValue: number[]) => {
    setValues((prev: CalibratorValues) => ({ ...prev, [key]: newValue[0] }));
  };

  const getValueText = (value: number) => {
    if (value >= 80) return "High";
    if (value >= 50) return "Medium";
    return "Low";
  };

  const generateScript = () => {
    setIsGenerating(true);
    
    try {
      // In a production environment, we would:
      // 1. Generate parameters based on slider values
      // 2. Send these to an API that interfaces with an LLM
      // 3. Process and display the returned script
      
      // For demo purposes, we're simulating the response with hardcoded values
      setTimeout(() => {
        const simulatedResponse = `# Demo Script: ${industry} Solution Presentation

## Opening (30 seconds)
"Today I'll show you how our platform addresses ${industry === 'Healthcare' ? 'compliance and data privacy challenges' : 
                                                industry === 'Fintech' ? 'security and auditability requirements' : 
                                                industry === 'Retail' ? 'personalization and customer insight needs' : 
                                                industry === 'SaaS' ? 'user onboarding and scalability challenges' : 
                                                'efficiency and integration challenges'} 
that are costing organizations like yours significant time and resources."

## Key Demonstration Points (2 minutes)
${values.technical > 80 ? '- Performance benchmark comparison showing 3x improvement over industry average\n- Technical integration workflow with existing systems\n' : 
  values.technical > 50 ? '- Balance of technical capabilities with intuitive user experience\n- Key validation points that resonate with technical stakeholders\n' : 
  '- Focus on intuitive UI and simplified user experience\n- Visual demonstration of outcomes without technical complexity\n'}

${values.maturity > 80 ? '- Showcase our differentiated approach compared to legacy solutions\n- Highlight seamless migration path from existing systems\n' :
  '- Educational overview of the problem space and our unique approach\n- Emphasis on first-mover advantage in this solution category\n'}

${values.stage > 80 ? '- Detailed ROI calculator showing 6-month payback period\n- Implementation timeline with key milestones\n' :
  '- Vision-building demonstration of the transformed state\n- Pain validation through relatable use cases\n'}

${values.authority > 80 ? '- Strategic business impact across departments\n- Executive-level metrics and governance capabilities\n' :
  '- Shareable content for internal champions\n- Focus on departmental wins and quick victories\n'}

## Closing (30 seconds)
"Based on what we've discussed about your ${industry.toLowerCase()} environment, I believe our solution offers the ${values.technical > 80 ? 'technical performance' : 'user experience'} 
you need with ${values.maturity > 80 ? 'mature capabilities' : 'innovative approaches'} that will 
${values.stage > 80 ? 'deliver measurable ROI' : 'solve your critical challenges'}. 
Let's discuss next steps for ${values.authority > 80 ? 'a strategic evaluation' : 'a departmental pilot'}."`;

        setScriptOutput(simulatedResponse);
        setIsGenerating(false);
        setIsScriptGenerated(true);
      }, 1500);
      
    } catch {
      setScriptOutput("Error generating script. Please try again.");
      setIsGenerating(false);
    }
  };

  const calibrationScore = Math.round((values.technical + values.maturity + values.stage + values.authority) / 4);

  // Main render function with progressive disclosure based on stage
  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 ${layoutPreference === 'compact' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
        {/* Left Column: Industry Selection + Controls */}
        <div className={`${layoutPreference === 'compact' ? 'md:col-span-1' : 'md:col-span-1'} space-y-6`}>
          {/* Industry Selection Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
              <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-5 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-slate-500 dark:text-slate-400" />
                    Industry
                  </CardTitle>
                  <Badge variant="outline" className="font-normal">Required</Badge>
                </div>
                <CardDescription className="mt-1.5">
                  Select the prospect&apos;s industry for optimal script targeting
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <Select 
                  defaultValue={industry} 
                  onValueChange={(value) => {
                    setIndustry(value);
                    // Progress to next stage in disclosure flow
                    if (currentStage === 'industry') {
                      setCurrentStage('primary');
                    }
                  }}
                >
                  <SelectTrigger className="w-full mt-4">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(industries).map(([key, ind]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex flex-col">
                          <span>{ind.name}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ind.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {industry && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800"
                  >
                    <h4 className="text-sm font-medium mb-2">Industry Insight</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {industries[industry].tips}
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Calibration Score Card - Only show after industry is selected */}
          {currentStage !== 'industry' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-5 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-[#39FF14]" />
                      Calibration Score
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="flex items-center justify-center mt-4">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center border-8 border-slate-100 dark:border-slate-800 relative">
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(#39FF14 ${calibrationScore}%, transparent 0)`,
                          mask: 'radial-gradient(transparent 55%, black 56%)',
                          WebkitMask: 'radial-gradient(transparent 55%, black 56%)'
                        }}
                      />
                      <div className="text-center">
                        <div className="text-3xl font-bold">{calibrationScore}%</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Overall</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    {calibratorOptions.map(opt => (
                      <div key={opt.key} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          {opt.icon}
                          <span className="text-slate-600 dark:text-slate-400">{opt.label}</span>
                        </div>
                        <div className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "font-normal text-xs", 
                              values[opt.key as keyof CalibratorValues] >= 80 
                                ? "border-green-300 dark:border-green-800" 
                                : values[opt.key as keyof CalibratorValues] >= 50 
                                  ? "border-amber-300 dark:border-amber-800"
                                  : "border-blue-300 dark:border-blue-800"
                            )}
                          >
                            {getValueText(values[opt.key as keyof CalibratorValues])}
                          </Badge>
                          <span className="ml-2 font-medium">{values[opt.key as keyof CalibratorValues]}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={generateScript} 
                    disabled={isGenerating}
                    className="w-full mt-6 bg-[#39FF14] hover:bg-[#32E512] text-black font-medium flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <BrainCircuit className="h-4 w-4 animate-pulse" />
                        Generating Script...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate Demo Script
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
        
        {/* Right Column: Calibration Controls + Output */}
        <div className={`${layoutPreference === 'compact' ? 'md:col-span-3' : 'md:col-span-2'} space-y-6`}>
          {/* Only show calibrator controls after industry is selected */}
          {currentStage !== 'industry' && (
            <div className="space-y-4">
              {calibratorOptions.map((opt, index) => (
                <motion.div
                  key={opt.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
                    <CardContent className="p-5">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md ${opt.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                                                opt.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
                                                opt.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 
                                                'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'}`}>
                            {opt.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-base">{opt.label}</h3>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {values[opt.key as keyof CalibratorValues] > 80 ? 'High' :
                               values[opt.key as keyof CalibratorValues] > 50 ? 'Medium' : 'Low'}
                              <span className="mx-1">•</span>
                              {values[opt.key as keyof CalibratorValues]}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleChange(opt.key, [Math.max(0, values[opt.key as keyof CalibratorValues] - 10)])}
                          >
                            -
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleChange(opt.key, [Math.min(100, values[opt.key as keyof CalibratorValues] + 10)])}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      
                      <div className="relative mt-2">
                        <EnhancedSlider
                          value={values[opt.key as keyof CalibratorValues]}
                          onChange={(newValue) => handleChange(opt.key, newValue)}
                          optimalRange={optimalRanges[opt.key]}
                          color={opt.color}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Visual representation of demo script structure */}
          {currentStage !== 'industry' && layoutPreference === 'visual' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Card>
                <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-5 pb-4">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Presentation className="h-5 w-5 mr-2 text-slate-500 dark:text-slate-400" />
                    Demo Structure Visualization
                  </CardTitle>
                  <CardDescription className="mt-1.5">
                    Visual flow of your demo based on current calibration
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <ScriptVisualizer 
                    values={values} 
                    industry={industry}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Script Output Section */}
          {(isScriptGenerated || isGenerating) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-5 pb-4 flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-medium flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-slate-500 dark:text-slate-400" />
                      Generated Demo Script
                    </CardTitle>
                    <CardDescription className="mt-1.5">
                      Tailored for {industry} industry with your calibration settings
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  {isScriptGenerated ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {scriptOutput.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) {
                          return <h2 key={i} className="text-xl font-bold mt-0">{line.substring(2)}</h2>;
                        } else if (line.startsWith('## ')) {
                          return <h3 key={i} className="text-lg font-semibold mt-4">{line.substring(3)}</h3>;
                        } else if (line.startsWith('- ')) {
                          return <p key={i} className="flex gap-2 my-1">
                            <span className="text-[#39FF14] font-bold">•</span>
                            <span>{line.substring(2)}</span>
                          </p>;
                        } else if (line.trim() === '') {
                          return <br key={i} />;
                        } else {
                          return <p key={i} className="my-2">{line}</p>;
                        }
                      })}
                    </div>
                  ) : (
                    <div className="h-[400px] flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-800/10 rounded-md">
                      <BrainCircuit className="h-12 w-12 mb-4 text-slate-300 dark:text-slate-700" />
                      <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">Generating Your Demo Script</h3>
                      <p className="max-w-md">Our AI is crafting a customized demo script based on your calibration settings.</p>
                      <div className="mt-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-ping" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-ping" style={{ animationDelay: '200ms' }}></div>
                        <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-ping" style={{ animationDelay: '400ms' }}></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
