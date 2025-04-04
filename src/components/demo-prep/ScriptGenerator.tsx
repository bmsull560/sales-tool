'use client';

import * as React from 'react';
import { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Download, 
  Save,
  RefreshCw,
  Layers,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface ScriptSection {
  title: string;
  content: string;
}

interface ScriptTemplate {
  id: string;
  name: string;
  description: string;
  sections: ScriptSection[];
}

const scriptTemplates: ScriptTemplate[] = [
  {
    id: 'standard',
    name: 'Standard Demo',
    description: 'A balanced demo script with problem statement, solution overview, and value proposition',
    sections: [
      {
        title: 'Introduction',
        content: "Welcome to our demo session today. I'm [Your Name] from [Company], and I'm excited to show you how our solution can address the challenges we discussed in our previous conversations."
      },
      {
        title: 'Agenda',
        content: '- Brief overview of the challenges\n- Solution demonstration\n- Value proposition\n- Next steps and timeline'
      },
      {
        title: 'Problem Statement',
        content: "Based on our discussions, we understand that you're facing challenges with [specific pain points]. These issues are impacting your business by [business impact]."
      },
      {
        title: 'Solution Overview',
        content: 'Our platform addresses these challenges through a comprehensive approach that includes:\n\n1. [Key capability 1]\n2. [Key capability 2]\n3. [Key capability 3]'
      },
      {
        title: 'Live Demonstration',
        content: '[Detailed steps for the demo flow, highlighting key features and benefits]'
      },
      {
        title: 'Value Proposition',
        content: 'By implementing our solution, you can expect:\n\n- [Benefit 1] resulting in [quantifiable outcome]\n- [Benefit 2] resulting in [quantifiable outcome]\n- [Benefit 3] resulting in [quantifiable outcome]'
      },
      {
        title: 'Next Steps',
        content: '1. Follow-up meeting to discuss technical requirements\n2. Proposal and pricing discussion\n3. Implementation planning'
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical Deep Dive',
    description: 'A technically focused demo emphasizing architecture, integration, and performance',
    sections: [
      {
        title: 'Introduction',
        content: "Welcome to our technical deep dive session. Today we'll explore the architecture and technical capabilities of our platform as they relate to your specific requirements."
      },
      {
        title: 'Technical Overview',
        content: 'Our solution is built on a [architecture type] architecture with the following key components:\n\n- [Component 1]: [Description]\n- [Component 2]: [Description]\n- [Component 3]: [Description]'
      },
      {
        title: 'Integration Capabilities',
        content: 'The platform offers multiple integration options:\n\n1. REST APIs with comprehensive documentation\n2. Webhook support for event-driven architectures\n3. Native connectors for [list relevant systems]'
      },
      {
        title: 'Security Framework',
        content: 'Security is built into every layer:\n\n- Authentication: [details]\n- Authorization: [details]\n- Data encryption: [details]\n- Compliance: [relevant standards]'
      },
      {
        title: 'Performance Metrics',
        content: 'In benchmark testing, our platform demonstrates:\n\n- Throughput: [metrics]\n- Latency: [metrics]\n- Scalability: [details]'
      },
      {
        title: 'Technical Demonstration',
        content: '[Detailed technical demonstration steps]'
      },
      {
        title: 'Implementation Requirements',
        content: '- Hardware specifications\n- Software dependencies\n- Network requirements\n- Deployment options'
      }
    ]
  },
  {
    id: 'executive',
    name: 'Executive Summary',
    description: 'A concise, business-focused demo highlighting ROI and strategic value',
    sections: [
      {
        title: 'Introduction',
        content: "Thank you for your time today. I'll be providing a high-level overview of how our solution addresses your strategic business objectives."
      },
      {
        title: 'Business Context',
        content: 'Your organization is facing [business challenges] in a market characterized by [relevant market conditions]. These challenges represent a [quantifiable impact] to your bottom line.'
      },
      {
        title: 'Strategic Solution',
        content: 'Our platform provides a strategic advantage through:\n\n1. [Strategic benefit 1]\n2. [Strategic benefit 2]\n3. [Strategic benefit 3]'
      },
      {
        title: 'ROI Analysis',
        content: 'Based on similar implementations, you can expect:\n\n- Initial investment: [cost range]\n- Annual savings: [savings estimate]\n- Payback period: [timeframe]\n- 3-year ROI: [percentage]'
      },
      {
        title: 'Competitive Advantage',
        content: 'Implementing our solution will position you ahead of competitors by:\n\n- [Competitive advantage 1]\n- [Competitive advantage 2]\n- [Competitive advantage 3]'
      },
      {
        title: 'Implementation Timeline',
        content: '- Discovery and planning: [timeframe]\n- Implementation: [timeframe]\n- Training and adoption: [timeframe]\n- First value realization: [timeframe]'
      },
      {
        title: 'Strategic Partnership',
        content: 'We offer more than just a product. Our strategic partnership includes:\n\n- Executive sponsorship\n- Quarterly business reviews\n- Access to product roadmap\n- Industry benchmarking'
      }
    ]
  }
];

export default function ScriptGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(scriptTemplates[0].id);
  const [scriptSections, setScriptSections] = useState<ScriptSection[]>(scriptTemplates[0].sections);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationParameters, setGenerationParameters] = useState({
    detail: 70,
    creativity: 50,
    formality: 60,
    length: 80
  });
  
  const handleTemplateChange = (templateId: string) => {
    const template = scriptTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setScriptSections(template.sections);
    }
  };
  
  const updateSectionContent = (index: number, content: string) => {
    const updatedSections = [...scriptSections];
    updatedSections[index] = { ...updatedSections[index], content };
    setScriptSections(updatedSections);
  };
  
  const handleParameterChange = (key: string, value: number[]) => {
    setGenerationParameters(prev => ({ ...prev, [key]: value[0] }));
  };
  
  const generateScript = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const enhancedSections = scriptSections.map(section => {
        // This would be replaced with actual AI generation in a real implementation
        const enhancedContent = enhanceContent(section.content, generationParameters);
        return { ...section, content: enhancedContent };
      });
      
      setScriptSections(enhancedSections);
      setIsGenerating(false);
    }, 2000);
  };
  
  // Simple function to simulate AI enhancement
  const enhanceContent = (content: string, params: typeof generationParameters) => {
    // In a real implementation, this would call an API to generate content
    // For now, we'll just add a note about the parameters
    
    // If the content contains placeholder text, replace it with more specific content
    let enhancedContent = content;
    
    if (content.includes('[Your Name]')) {
      enhancedContent = enhancedContent.replace('[Your Name]', 'Alex Chen');
    }
    
    if (content.includes('[Company]')) {
      enhancedContent = enhancedContent.replace('[Company]', 'DemoGenius AI');
    }
    
    // Add more specific details based on the detail parameter
    if (params.detail > 60 && content.includes('[specific pain points]')) {
      enhancedContent = enhancedContent.replace(
        '[specific pain points]', 
        'manual demo preparation processes, inconsistent messaging across sales teams, and difficulty tailoring demos to specific prospect needs'
      );
    }
    
    if (params.detail > 60 && content.includes('[business impact]')) {
      enhancedContent = enhancedContent.replace(
        '[business impact]', 
        'extending sales cycles by 35%, reducing demo-to-close rates, and creating inconsistent customer experiences'
      );
    }
    
    // Add key capabilities based on detail and creativity
    if (content.includes('[Key capability 1]')) {
      enhancedContent = enhancedContent.replace(
        '[Key capability 1]', 
        'AI-powered demo script generation tailored to specific prospect profiles'
      );
    }
    
    if (content.includes('[Key capability 2]')) {
      enhancedContent = enhancedContent.replace(
        '[Key capability 2]', 
        'Interactive demo storyboarding with built-in best practices'
      );
    }
    
    if (content.includes('[Key capability 3]')) {
      enhancedContent = enhancedContent.replace(
        '[Key capability 3]', 
        'Comprehensive analytics to measure demo effectiveness and optimize future presentations'
      );
    }
    
    // Add benefits based on creativity and formality
    if (content.includes('[Benefit 1]')) {
      enhancedContent = enhancedContent.replace(
        '[Benefit 1]', 
        'Reduced demo preparation time'
      );
    }
    
    if (content.includes('[quantifiable outcome]') && params.detail > 70) {
      enhancedContent = enhancedContent.replace(
        '[quantifiable outcome]', 
        'a 65% reduction in preparation hours and 40% faster time-to-value'
      );
    }
    
    return enhancedContent;
  };
  
  const copyToClipboard = () => {
    const fullScript = scriptSections.map(section => 
      `# ${section.title}\n\n${section.content}\n\n`
    ).join('');
    
    navigator.clipboard.writeText(fullScript);
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Script Generator</h2>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4 mr-1" /> Copy All
          </Button>
          <Button 
            onClick={generateScript} 
            disabled={isGenerating}
            className="bg-[#39FF14] hover:bg-[#32E512] text-black"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-1" /> Enhance with AI
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Template</h3>
              <Select 
                defaultValue={selectedTemplate} 
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {scriptTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="mt-2 text-sm text-slate-500">
                {scriptTemplates.find(t => t.id === selectedTemplate)?.description}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Generation Parameters</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Detail Level</span>
                    <Badge variant="outline">{generationParameters.detail}%</Badge>
                  </div>
                  <Slider
                    defaultValue={[generationParameters.detail]}
                    max={100}
                    step={10}
                    onValueChange={(val: number[]) => handleParameterChange('detail', val)}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Creativity</span>
                    <Badge variant="outline">{generationParameters.creativity}%</Badge>
                  </div>
                  <Slider
                    defaultValue={[generationParameters.creativity]}
                    max={100}
                    step={10}
                    onValueChange={(val: number[]) => handleParameterChange('creativity', val)}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Formality</span>
                    <Badge variant="outline">{generationParameters.formality}%</Badge>
                  </div>
                  <Slider
                    defaultValue={[generationParameters.formality]}
                    max={100}
                    step={10}
                    onValueChange={(val: number[]) => handleParameterChange('formality', val)}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Length</span>
                    <Badge variant="outline">{generationParameters.length}%</Badge>
                  </div>
                  <Slider
                    defaultValue={[generationParameters.length]}
                    max={100}
                    step={10}
                    onValueChange={(val: number[]) => handleParameterChange('length', val)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Sections</h3>
              <div className="space-y-2">
                {scriptSections.map((section, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center"
                  >
                    <div className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full mr-2 text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-grow truncate">{section.title}</div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-4">
              <Tabs defaultValue="edit">
                <TabsList className="mb-4">
                  <TabsTrigger value="edit">Edit Script</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="space-y-6">
                  {scriptSections.map((section, index) => (
                    <div key={index}>
                      <div className="flex items-center mb-2">
                        <h3 className="font-medium">{section.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="ml-auto"
                          onClick={() => {
                            // Individual section enhancement would go here
                          }}
                        >
                          <Sparkles className="h-3 w-3 mr-1" /> Enhance
                        </Button>
                      </div>
                      <Textarea
                        value={section.content}
                        onChange={(e) => updateSectionContent(index, e.target.value)}
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="preview">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {scriptSections.map((section, index) => (
                      <div key={index} className="mb-6">
                        <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                        <div className="whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-1" /> Save Draft
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
