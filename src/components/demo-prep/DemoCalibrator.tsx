'use client';

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import type { ReactNode } from 'react';

type CalibratorOption = {
  key: string;
  label: string;
  tips: string[];
};

type IndustryTips = {
  [key: string]: string;
};

type CalibratorValues = {
  technical: number;
  maturity: number;
  stage: number;
  authority: number;
};

const calibratorOptions: CalibratorOption[] = [
  {
    key: "technical",
    label: "Technical Sophistication",
    tips: [
      "Focus on ease of use and visual UX.",
      "Balance user outcomes with light technical validation.",
      "Lead with performance benchmarks and integration options."
    ]
  },
  {
    key: "maturity",
    label: "Solution Maturity",
    tips: [
      "Educate on the problem and show first-mover advantage.",
      "Highlight differentiation and migration ease."
    ]
  },
  {
    key: "stage",
    label: "Buying Process Position",
    tips: [
      "Validate pain and build vision.",
      "Focus on ROI, implementation timeline, and friction reduction."
    ]
  },
  {
    key: "authority",
    label: "Decision Authority",
    tips: [
      "Create shareable internal content for influencers.",
      "Frame your pitch as a strategic business investment."
    ]
  }
];

const industries: IndustryTips = {
  Healthcare: "Emphasize compliance, reliability, and data privacy.",
  Fintech: "Highlight security, latency, and auditability.",
  Retail: "Showcase personalization, scalability, and customer insights.",
  SaaS: "Focus on user onboarding, scalability, and recurring value.",
  Manufacturing: "Demonstrate efficiency, uptime, and supply chain integration."
};

export default function DemoCalibrator(): ReactNode {
  const [values, setValues] = React.useState<CalibratorValues>({
    technical: 90,
    maturity: 70,
    stage: 80,
    authority: 85
  });
  const [industry, setIndustry] = React.useState<string>("Healthcare");
  const [scriptOutput, setScriptOutput] = React.useState<string>("Demo script will be generated here...");
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  const handleChange = (key: string, value: number[]) => {
    setValues((prev: CalibratorValues) => ({ ...prev, [key]: value[0] }));
  };

  const generateScript = () => {
    setIsGenerating(true);
    
    try {
      const tips = calibratorOptions.map(opt => {
        const val = values[opt.key as keyof CalibratorValues];
        const tier = val > 80 ? 2 : val > 50 ? 1 : 0;
        return `**${opt.label} (${val}%)**: ${opt.tips[tier]}`;
      }).join("\n");

      const industryTip = `**Industry – ${industry}**: ${industries[industry]}`;

      const prompt = `Generate a 3-minute demo script based on the following deal profile:\n\n${tips}\n${industryTip}\n\nFocus on relevance, transformation, and a persuasive narrative.`;

      // In a real implementation, this would call an API endpoint
      // that interfaces with an LLM to generate the script
      // For now, we'll simulate a response with a timeout
      
      // Simulated API call using setTimeout instead of async/await
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
      }, 1500);
      
    } catch (error) {
      setScriptOutput("Error generating script. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid gap-6 max-w-3xl mx-auto py-10">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Demo Script Calibrator</h2>
        <p className="text-muted-foreground">
          Adjust parameters to generate a customized demo script based on prospect profile.
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="mb-2 font-medium">Industry</div>
          <Select defaultValue={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(industries).map((ind) => (
                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {calibratorOptions.map(opt => (
        <Card key={opt.key}>
          <CardContent className="p-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{opt.label}</span>
              <span className="text-muted-foreground">{values[opt.key as keyof CalibratorValues]}%</span>
            </div>
            <Slider
              defaultValue={[values[opt.key as keyof CalibratorValues]]}
              max={100}
              step={5}
              onValueChange={(val: number[]) => handleChange(opt.key, val)}
              className="mb-2"
            />
            <div className="text-xs text-muted-foreground mt-2">
              {values[opt.key as keyof CalibratorValues] > 80 ? opt.tips[2] : 
               values[opt.key as keyof CalibratorValues] > 50 ? opt.tips[1] : 
               opt.tips[0]}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button 
        onClick={generateScript} 
        disabled={isGenerating}
        className="w-full bg-[#39FF14] hover:bg-[#32E512] text-black font-medium"
      >
        {isGenerating ? "Generating Script..." : "Generate Demo Script"}
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="mb-2 font-medium">Generated Script</div>
          <Textarea 
            className="min-h-[300px] font-mono text-sm" 
            value={scriptOutput} 
            readOnly 
          />
        </CardContent>
      </Card>
    </div>
  );
}
