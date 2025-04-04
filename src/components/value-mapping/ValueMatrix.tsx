'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  NodeChange,
  applyNodeChanges,
  NodeTypes,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ValueProposition } from '@/lib/types';
import ValuePropositionNode from './ValuePropositionNode';

interface ValueMatrixProps {
  valuePropositions: ValueProposition[];
  onValuePropositionChange?: (updatedValueProposition: ValueProposition) => void;
  onValuePropositionSelect?: (valueProposition: ValueProposition) => void;
}

// Define custom node types
const nodeTypes: NodeTypes = {
  valueProposition: ValuePropositionNode,
};

// Matrix dimensions
const MATRIX_WIDTH = 800;
const MATRIX_HEIGHT = 600;
const PADDING = 50; // Padding from edges

export function ValueMatrix({ 
  valuePropositions,
  onValuePropositionChange,
  onValuePropositionSelect
}: ValueMatrixProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  // Convert value propositions to nodes
  const initialNodes: Node[] = valuePropositions.map((vp) => ({
    id: vp.id,
    type: 'valueProposition',
    position: { 
      x: PADDING + (vp.customerPriority / 100) * (MATRIX_WIDTH - 2 * PADDING), 
      y: MATRIX_HEIGHT - PADDING - (vp.solutionStrength / 100) * (MATRIX_HEIGHT - 2 * PADDING) 
    },
    data: { 
      valueProposition: vp,
      onSelect: () => onValuePropositionSelect?.(vp)
    },
  }));

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Update nodes when value propositions change
  useEffect(() => {
    setNodes(
      valuePropositions.map((vp) => ({
        id: vp.id,
        type: 'valueProposition',
        position: { 
          x: PADDING + (vp.customerPriority / 100) * (MATRIX_WIDTH - 2 * PADDING), 
          y: MATRIX_HEIGHT - PADDING - (vp.solutionStrength / 100) * (MATRIX_HEIGHT - 2 * PADDING) 
        },
        data: { 
          valueProposition: vp,
          onSelect: () => onValuePropositionSelect?.(vp)
        },
      }))
    );
  }, [valuePropositions, onValuePropositionSelect]);

  // Handle node drag
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const nextNodes = applyNodeChanges(changes, nodes);
      setNodes(nextNodes);
      
      // Find the node that changed position
      changes.forEach((change) => {
        if (change.type === 'position' && change.position) {
          const node = nextNodes.find((n) => n.id === change.id);
          if (node) {
            const vp = valuePropositions.find((vp) => vp.id === node.id);
            if (vp && onValuePropositionChange) {
              // Calculate new priority and strength based on position
              const customerPriority = Math.round(((node.position.x - PADDING) / (MATRIX_WIDTH - 2 * PADDING)) * 100);
              const solutionStrength = Math.round(((MATRIX_HEIGHT - PADDING - node.position.y) / (MATRIX_HEIGHT - 2 * PADDING)) * 100);
              
              onValuePropositionChange({
                ...vp,
                customerPriority: Math.max(0, Math.min(100, customerPriority)),
                solutionStrength: Math.max(0, Math.min(100, solutionStrength)),
                position: {
                  x: node.position.x,
                  y: node.position.y,
                },
              });
            }
          }
        }
      });
    },
    [nodes, valuePropositions, onValuePropositionChange]
  );

  // Add grid lines for better orientation
  const gridLines = [];
  for (let i = 25; i <= 75; i += 25) {
    // Horizontal lines
    const yPos = MATRIX_HEIGHT - PADDING - (i / 100) * (MATRIX_HEIGHT - 2 * PADDING);
    gridLines.push(
      <line 
        key={`h-${i}`} 
        x1={PADDING} 
        y1={yPos} 
        x2={MATRIX_WIDTH - PADDING} 
        y2={yPos} 
        stroke="#e5e7eb" 
        strokeWidth="1" 
        strokeDasharray="5,5" 
      />
    );
    
    // Vertical lines
    const xPos = PADDING + (i / 100) * (MATRIX_WIDTH - 2 * PADDING);
    gridLines.push(
      <line 
        key={`v-${i}`} 
        x1={xPos} 
        y1={PADDING} 
        x2={xPos} 
        y2={MATRIX_HEIGHT - PADDING} 
        stroke="#e5e7eb" 
        strokeWidth="1" 
        strokeDasharray="5,5" 
      />
    );
  }

  return (
    <div className="h-[600px] w-full border rounded-lg bg-white" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        onInit={setReactFlowInstance}
        minZoom={0.5}
        maxZoom={1.5}
      >
        {/* Custom grid lines */}
        <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
          {gridLines}
        </svg>
        
        {/* Quadrant labels */}
        <div className="absolute top-2 left-2 bg-white/90 p-1.5 rounded shadow-sm text-xs">
          <span className="font-medium">Low Priority / High Strength</span><br />
          <span className="text-gray-500 text-[10px]">Potential Differentiators</span>
        </div>
        <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded shadow-sm text-xs">
          <span className="font-medium">High Priority / High Strength</span><br />
          <span className="text-gray-500 text-[10px]">Competitive Advantage</span>
        </div>
        <div className="absolute bottom-10 left-2 bg-white/90 p-1.5 rounded shadow-sm text-xs">
          <span className="font-medium">Low Priority / Low Strength</span><br />
          <span className="text-gray-500 text-[10px]">Low Focus Areas</span>
        </div>
        <div className="absolute bottom-10 right-2 bg-white/90 p-1.5 rounded shadow-sm text-xs">
          <span className="font-medium">High Priority / Low Strength</span><br />
          <span className="text-gray-500 text-[10px]">Improvement Needed</span>
        </div>
        
        {/* Axis labels */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium">
          Customer Priority →
        </div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 rotate-[-90deg] text-xs font-medium">
          Solution Strength →
        </div>
        
        <Controls />
        <MiniMap 
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            const vp = valuePropositions.find(vp => vp.id === node.id);
            if (vp) {
              switch(vp.impact) {
                case 'financial': return '#10b981'; // green-500
                case 'operational': return '#3b82f6'; // blue-500
                case 'strategic': return '#8b5cf6'; // purple-500
                case 'risk': return '#ef4444'; // red-500
                default: return '#64748b'; // slate-500
              }
            }
            return '#64748b';
          }}
        />
        <Background gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
