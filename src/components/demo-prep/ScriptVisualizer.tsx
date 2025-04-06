import React, { useEffect, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MarkerType,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { calculateScriptEmphasis, calculateTimeAllocation } from '@/lib/demo-calibrator-utils';
import { Presentation, LineChart, Users, CircleDollarSign, Clock, Cpu } from 'lucide-react';
import { CalibratorValues, FlowNodeType, FlowEdgeType } from '@/types/demo-calibrator';
import { motion } from 'framer-motion';

const NODE_TYPES = {
  technical: Cpu,
  solution: LineChart,
  implementation: Presentation,
  business: Users,
};

const NODE_COLORS = {
  technical: 'rgb(59, 130, 246)',   // blue
  solution: 'rgb(34, 197, 94)',     // green
  implementation: 'rgb(168, 85, 247)', // purple
  business: 'rgb(249, 115, 22)',    // orange
};

interface ScriptVisualizerProps {
  values: CalibratorValues;
  industry: string;
}

export function ScriptVisualizer({ values, industry }: ScriptVisualizerProps) {
  const { nodes, edges } = useMemo(() => {
    const timeAllocation = calculateTimeAllocation(values);
    const scriptEmphasis = calculateScriptEmphasis(values);
    
    // Create nodes for the different sections
    const nodes: FlowNodeType[] = [
      {
        id: 'demo',
        position: { x: 250, y: 20 },
        data: { 
          label: `${industry} Demo Script`,
        },
      },
      {
        id: 'technical',
        position: { x: 100, y: 120 },
        data: { 
          label: 'Technical Section',
          value: values.technical,
          percentage: timeAllocation.technical,
          color: NODE_COLORS.technical,
        },
      },
      {
        id: 'solution',
        position: { x: 250, y: 120 },
        data: { 
          label: 'Solution Section',
          value: values.maturity,
          percentage: timeAllocation.solution,
          color: NODE_COLORS.solution,
        },
      },
      {
        id: 'implementation',
        position: { x: 400, y: 120 },
        data: { 
          label: 'Implementation',
          value: values.stage,
          percentage: timeAllocation.implementation,
          color: NODE_COLORS.implementation,
        },
      },
      {
        id: 'business',
        position: { x: 250, y: 220 },
        data: { 
          label: 'Business Value',
          value: values.authority,
          percentage: timeAllocation.business,
          color: NODE_COLORS.business,
        },
      },
    ];
    
    // Create connections between nodes
    const edges: FlowEdgeType[] = [
      {
        id: 'demo-technical',
        source: 'demo',
        target: 'technical',
        animated: true,
        style: { 
          stroke: NODE_COLORS.technical,
          strokeWidth: Math.max(1, timeAllocation.technical / 10),
        },
      },
      {
        id: 'demo-solution',
        source: 'demo',
        target: 'solution',
        animated: true,
        style: { 
          stroke: NODE_COLORS.solution,
          strokeWidth: Math.max(1, timeAllocation.solution / 10),
        },
      },
      {
        id: 'demo-implementation',
        source: 'demo',
        target: 'implementation',
        animated: true,
        style: { 
          stroke: NODE_COLORS.implementation,
          strokeWidth: Math.max(1, timeAllocation.implementation / 10),
        },
      },
      {
        id: 'technical-business',
        source: 'technical',
        target: 'business',
        animated: true,
        style: { 
          stroke: NODE_COLORS.business,
          strokeWidth: Math.max(1, timeAllocation.business / 15),
        },
      },
      {
        id: 'solution-business',
        source: 'solution',
        target: 'business',
        animated: true,
        style: { 
          stroke: NODE_COLORS.business,
          strokeWidth: Math.max(1, timeAllocation.business / 15),
        },
      },
      {
        id: 'implementation-business',
        source: 'implementation',
        target: 'business',
        animated: true,
        style: { 
          stroke: NODE_COLORS.business,
          strokeWidth: Math.max(1, timeAllocation.business / 15),
        },
      },
    ];
    
    return { nodes, edges };
  }, [values, industry]);
  
  const nodeTypes = useMemo(() => {
    // Custom node renderer
    const CustomNode = ({ data }: { data: any }) => {
      const Icon = data.label.toLowerCase().includes('technical') ? NODE_TYPES.technical :
                data.label.toLowerCase().includes('solution') ? NODE_TYPES.solution :
                data.label.toLowerCase().includes('implementation') ? NODE_TYPES.implementation :
                data.label.toLowerCase().includes('business') ? NODE_TYPES.business : null;
                
      const nodeColor = data.color || '#64748b';
      
      return (
        <div className={`px-4 py-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 min-w-48 max-w-52`}>
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="p-1.5 rounded-md" style={{ backgroundColor: `${nodeColor}20` }}>
                <Icon size={18} style={{ color: nodeColor }} />
              </div>
            )}
            <div className="font-medium text-sm">{data.label}</div>
          </div>
          
          {data.percentage !== undefined && (
            <div className="mt-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Clock size={14} />
                <span>{data.percentage}% of time</span>
              </div>
              
              {data.value !== undefined && (
                <div 
                  className="px-1.5 py-0.5 rounded-md text-xs font-medium"
                  style={{ 
                    backgroundColor: `${nodeColor}15`,
                    color: nodeColor
                  }}
                >
                  {data.value}/100
                </div>
              )}
            </div>
          )}
        </div>
      );
    };
    
    return {
      default: CustomNode,
    };
  }, []);
  
  return (
    <motion.div 
      className="h-[300px] w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-right"
      >
        <Background color="#94a3b8" gap={16} size={1} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </motion.div>
  );
}
