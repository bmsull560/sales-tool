'use client';

import React from 'react';
import { 
  Presentation, 
  Plus, 
  ScreenShare,
  MessageSquare,
  LineChart,
  Zap,
  Check,
  Calendar,
  Users,
  PieChart,
  Bell,
  Info,
  AlertTriangle,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DemoCard, DemoCardGradientHeader } from "@/components/ui/demo-card";
import { Heading, Text, Label, KeyPoint, SectionTitle } from "@/components/ui/typography";
import { FormField } from "@/components/ui/form-field";
import { StatusBadge, StatusDot } from "@/components/ui/status-badge";
import { IconButton, ActionButton } from "@/components/ui/icon-button";
import { DemoSection, DemoGrid, DemoEmptyState } from "@/components/ui/demo-section";
import { cn } from "@/lib/utils";
import theme from "@/lib/design-tokens";

export default function DesignSystemPage() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-12">
        <Heading as="h1" size="3xl" className="mb-2">
          DemoGenius Design System
        </Heading>
        <Text size="lg" color="secondary">
          A comprehensive guide to using the DemoGenius UI components and design tokens.
        </Text>
      </div>

      {/* Colors Section */}
      <DemoSection title="Colors" subtitle="Color palette and usage guidelines">
        <div className="mb-6">
          <Heading as="h3" size="md" className="mb-3">Primary Colors</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ColorSwatch color="#39FF14" name="Primary" desc="Brand Accent" />
            <ColorSwatch color="#32E512" name="Primary Hover" desc="Button hover states" />
            <ColorSwatch color="#2BD910" name="Primary Pressed" desc="Button pressed states" />
          </div>
        </div>

        <div className="mb-6">
          <Heading as="h3" size="md" className="mb-3">Neutrals</Heading>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            <ColorSwatch color="#f8fafc" name="Slate 50" textDark />
            <ColorSwatch color="#f1f5f9" name="Slate 100" textDark />
            <ColorSwatch color="#e2e8f0" name="Slate 200" textDark />
            <ColorSwatch color="#cbd5e1" name="Slate 300" textDark />
            <ColorSwatch color="#94a3b8" name="Slate 400" textDark />
            <ColorSwatch color="#64748b" name="Slate 500" textDark />
            <ColorSwatch color="#475569" name="Slate 600" />
            <ColorSwatch color="#334155" name="Slate 700" />
            <ColorSwatch color="#1e293b" name="Slate 800" />
            <ColorSwatch color="#0f172a" name="Slate 900" />
          </div>
        </div>

        <div>
          <Heading as="h3" size="md" className="mb-3">Functional Colors</Heading>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ColorSwatch color="#10B981" name="Success" />
            <ColorSwatch color="#F59E0B" name="Warning" textDark />
            <ColorSwatch color="#EF4444" name="Error" />
            <ColorSwatch color="#3B82F6" name="Info" />
          </div>
        </div>
      </DemoSection>

      {/* Typography Section */}
      <DemoSection title="Typography" subtitle="Text styles and components">
        <div className="space-y-6">
          <div>
            <Heading as="h3" size="md" className="mb-3">Headings</Heading>
            <Card className="p-6 space-y-4">
              <Heading as="h1" size="4xl">Heading 1 (4xl)</Heading>
              <Heading as="h2" size="3xl">Heading 2 (3xl)</Heading>
              <Heading as="h3" size="2xl">Heading 3 (2xl)</Heading>
              <Heading as="h4" size="xl">Heading 4 (xl)</Heading>
              <Heading as="h5" size="lg">Heading 5 (lg)</Heading>
              <Heading as="h6" size="md">Heading 6 (md)</Heading>
            </Card>
          </div>

          <div>
            <Heading as="h3" size="md" className="mb-3">Text Styles</Heading>
            <Card className="p-6 space-y-4">
              <Text size="lg" weight="medium">Large Text (lg)</Text>
              <Text size="md">Medium Text (md) - Default size</Text>
              <Text size="sm">Small Text (sm)</Text>
              <Text size="xs">Extra Small Text (xs)</Text>
              
              <div className="pt-4">
                <Text size="md" weight="bold" className="mb-2">Text Colors</Text>
                <div className="space-y-2">
                  <Text color="primary">Primary Text</Text>
                  <Text color="secondary">Secondary Text</Text>
                  <Text color="muted">Muted Text</Text>
                  <Text color="accent">Accent Text</Text>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Heading as="h3" size="md" className="mb-3">Special Text Components</Heading>
            <Card className="p-6 space-y-4">
              <SectionTitle 
                title="Section Title Component" 
                subtitle="This is a subtitle that explains more about this section"
              />
              
              <div className="pt-2">
                <Label>Label Component</Label>
              </div>
              
              <div className="space-y-2">
                <Text weight="medium" size="sm" className="mb-1">Key Points:</Text>
                <KeyPoint>First key point with the standardized bullet styling</KeyPoint>
                <KeyPoint>Second key point showing consistent formatting</KeyPoint>
                <KeyPoint>Third key point demonstrates the pattern</KeyPoint>
              </div>
            </Card>
          </div>
        </div>
      </DemoSection>

      {/* Form Elements */}
      <DemoSection title="Form Elements" subtitle="Input fields and form controls">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Standard Input" 
              htmlFor="standard-input"
              description="This is a standard text input with description"
            >
              <Input 
                id="standard-input" 
                placeholder="Enter text here" 
              />
            </FormField>
            
            <FormField 
              label="Input with Error" 
              htmlFor="error-input"
              error="This field is required"
              required
            >
              <Input 
                id="error-input" 
                placeholder="Required field" 
                className="border-red-300 focus:border-red-500 dark:border-red-900"
              />
            </FormField>
            
            <FormField 
              label="Textarea Input" 
              htmlFor="textarea-input"
              description="A multiline text input field"
            >
              <Textarea 
                id="textarea-input" 
                placeholder="Enter multiple lines of text" 
                rows={3}
              />
            </FormField>
            
            <FormField 
              label="Text with Button" 
              htmlFor="input-with-button"
            >
              <div className="flex gap-2">
                <Input 
                  id="input-with-button" 
                  placeholder="Search..." 
                  className="flex-1"
                />
                <Button>Search</Button>
              </div>
            </FormField>
          </div>
        </Card>
      </DemoSection>

      {/* Buttons */}
      <DemoSection title="Buttons" subtitle="Button styles and variations">
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Heading as="h3" size="sm" className="mb-3">Standard Buttons</Heading>
              <div className="flex flex-wrap gap-4">
                <Button>Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button className="bg-[#39FF14] hover:bg-[#32E512] text-black font-medium">
                  Accent Button
                </Button>
              </div>
            </div>
            
            <div>
              <Heading as="h3" size="sm" className="mb-3">Action Buttons</Heading>
              <div className="flex flex-wrap gap-4">
                <ActionButton icon={<Plus size={16} />}>Create New</ActionButton>
                <ActionButton icon={<Check size={16} />} variant="secondary">Approve</ActionButton>
                <ActionButton icon={<X size={16} />} variant="destructive">Delete</ActionButton>
                <ActionButton icon={<Plus size={16} />} variant="accent">Add Step</ActionButton>
              </div>
            </div>
            
            <div>
              <Heading as="h3" size="sm" className="mb-3">Icon Buttons</Heading>
              <div className="flex flex-wrap gap-4">
                <IconButton icon={<Plus />} label="Add item" />
                <IconButton icon={<Check />} variant="secondary" label="Check" />
                <IconButton icon={<X />} variant="destructive" label="Delete" />
                <IconButton icon={<Bell />} variant="outline" label="Notifications" />
                <IconButton icon={<Plus />} variant="accent" label="Add" />
                <IconButton icon={<Plus />} variant="ghost" label="Add" />
                <IconButton icon={<X />} variant="ghost" rounded label="Close" size="sm" />
              </div>
            </div>
          </div>
        </Card>
      </DemoSection>

      {/* Status indicators */}
      <DemoSection title="Status Indicators" subtitle="Badges, dots, and status indicators">
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Heading as="h3" size="sm" className="mb-3">Status Badges</Heading>
              <div className="flex flex-wrap gap-4">
                <StatusBadge>Default</StatusBadge>
                <StatusBadge variant="primary">Active</StatusBadge>
                <StatusBadge variant="success">Completed</StatusBadge>
                <StatusBadge variant="warning">Pending</StatusBadge>
                <StatusBadge variant="danger">Failed</StatusBadge>
                <StatusBadge variant="info">Info</StatusBadge>
              </div>
            </div>
            
            <div>
              <Heading as="h3" size="sm" className="mb-3">Status Badges with Icons</Heading>
              <div className="flex flex-wrap gap-4">
                <StatusBadge variant="primary" icon={<Bell size={14} />}>Notifications</StatusBadge>
                <StatusBadge variant="success" icon={<Check size={14} />}>Completed</StatusBadge>
                <StatusBadge variant="warning" icon={<AlertTriangle size={14} />}>Warning</StatusBadge>
                <StatusBadge variant="danger" icon={<X size={14} />}>Error</StatusBadge>
                <StatusBadge variant="info" icon={<Info size={14} />}>Information</StatusBadge>
              </div>
            </div>
            
            <div>
              <Heading as="h3" size="sm" className="mb-3">Pulse Status</Heading>
              <div className="flex flex-wrap gap-4 items-center">
                <StatusBadge variant="primary" pulse>Live</StatusBadge>
                <StatusBadge variant="success" pulse>Connected</StatusBadge>
                <StatusBadge variant="warning" pulse>Reconnecting</StatusBadge>
                <StatusBadge variant="danger" pulse>Disconnected</StatusBadge>
                
                <div className="ml-6 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <StatusDot variant="primary" pulse tooltip="Active" />
                    <Text size="sm">Active</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot variant="success" pulse tooltip="Online" />
                    <Text size="sm">Online</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot variant="danger" pulse tooltip="Offline" />
                    <Text size="sm">Offline</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </DemoSection>

      {/* Cards */}
      <DemoSection title="Cards" subtitle="Card components and variations">
        <DemoGrid columns={{ default: 1, sm: 2, lg: 3 }}>
          <DemoCard>
            <CardHeader>
              <CardTitle>Standard Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This is a standard card component with basic styling.
              </Text>
            </CardContent>
          </DemoCard>
          
          <DemoCard accentColor="#3B82F6">
            <CardHeader>
              <CardTitle>Accent Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card has a custom accent color at the top border.
              </Text>
            </CardContent>
          </DemoCard>
          
          <DemoCard accentColor="#39FF14" animateEntry index={1}>
            <CardHeader>
              <CardTitle>Animated Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card has the standard accent color and animate-in effect.
              </Text>
            </CardContent>
          </DemoCard>
          
          <DemoCard className="col-span-1 sm:col-span-2 lg:col-span-3">
            <DemoCardGradientHeader 
              title="Card with Gradient Header" 
              description="This card utilizes the standard gradient header pattern"
              icon={<PieChart size={24} />}
            />
            <CardContent className="p-6">
              <Text>
                This card demonstrates the gradient header pattern used throughout DemoGenius.
                The header includes an icon, title, and optional description.
              </Text>
            </CardContent>
          </DemoCard>
        </DemoGrid>
      </DemoSection>

      {/* Empty States */}
      <DemoSection title="Empty States" subtitle="Patterns for empty or loading states">
        <DemoEmptyState 
          title="No Items Found"
          description="There are no items that match your search criteria. Try adjusting your filters or create a new item."
          icon={<Presentation size={36} />}
          action={<ActionButton icon={<Plus size={16} />} variant="accent">Create New</ActionButton>}
        />
      </DemoSection>

      {/* Design System Usage */}
      <DemoSection title="Design System Usage" subtitle="How to use the design system">
        <Card className="p-6">
          <div className="space-y-4">
            <Text>
              The DemoGenius Design System provides a cohesive set of components and styles to maintain consistency across the application.
              Always import components from their dedicated files rather than recreating them:
            </Text>
            
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md font-mono text-sm">
              {`import { Heading, Text } from "@/components/ui/typography";
import { FormField } from "@/components/ui/form-field";
import { StatusBadge } from "@/components/ui/status-badge";
import theme from "@/lib/design-tokens";`}
            </div>
            
            <Text size="md" className="mt-4">
              When creating new components, use the design tokens to maintain consistency:
            </Text>
            
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md font-mono text-sm">
              {`// Good practice
<div 
  className="p-6 rounded-lg" 
  style={{ backgroundColor: theme.colors.neutrals[800] }}
>
  Content goes here
</div>

// Instead of hardcoding colors
<div className="p-6 rounded-lg bg-[#1e293b]">
  Content goes here
</div>`}
            </div>
          </div>
        </Card>
      </DemoSection>
    </div>
  );
}

// Helper component for color swatches
function ColorSwatch({ 
  color, 
  name, 
  desc,
  textDark = false 
}: { 
  color: string; 
  name: string; 
  desc?: string;
  textDark?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div 
        className="h-20 rounded-md mb-2" 
        style={{ backgroundColor: color }}
      />
      <div className={cn(
        "text-sm font-medium",
        textDark ? "text-slate-900" : "text-white"
      )}>
        {name}
      </div>
      {desc && (
        <div className={cn(
          "text-xs",
          textDark ? "text-slate-700" : "text-slate-300"
        )}>
          {desc}
        </div>
      )}
      <div className={cn(
        "text-xs mt-1",
        textDark ? "text-slate-500" : "text-slate-400"
      )}>
        {color}
      </div>
    </div>
  );
}
