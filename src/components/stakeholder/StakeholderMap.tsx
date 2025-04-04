'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Stakeholder, Relationship } from '@/lib/types';

interface StakeholderMapProps {
  stakeholders: Stakeholder[];
  relationships: Relationship[];
}

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  style: {
    borderRadius: '8px',
    border: '1px solid #cbd5e1', // slate-300
    padding: '10px 15px',
    backgroundColor: 'white',
    fontSize: '12px',
    width: 180,
  },
};

const relationshipStyles: { [key in Relationship['type']]: React.CSSProperties } = {
  reports_to: { stroke: '#ef4444' }, // red-500
  works_with: { stroke: '#3b82f6' }, // blue-500
  influences: { stroke: '#f97316' }, // orange-500
};

export function StakeholderMap({ stakeholders, relationships }: StakeholderMapProps) {
  const initialNodes: Node[] = useMemo(() => stakeholders.map(stakeholder => ({
    id: stakeholder.id,
    type: 'default', // Consider creating custom nodes later
    position: stakeholder.position || { x: Math.random() * 400, y: Math.random() * 400 }, // Use stored or random position
    data: {
      label: (
        <div className="text-left">
          <div className="font-medium text-gray-800">{stakeholder.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{stakeholder.title}</div>
          {/* Optionally add Influence/Interest bars here */} 
        </div>
      ),
    },
    ...nodeDefaults,
  })), [stakeholders]);

  const initialEdges: Edge[] = useMemo(() => relationships.map(relationship => ({
    id: relationship.id,
    source: relationship.sourceStakeholderId,
    target: relationship.targetStakeholderId,
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 15,
      height: 15,
      color: relationshipStyles[relationship.type]?.stroke || '#64748b', // slate-500 default
    },
    style: {
      ...relationshipStyles[relationship.type],
      strokeWidth: 1.5,
    },
    // label: relationship.type, // Optional: show relationship type
  })), [relationships]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Update nodes if stakeholders prop changes (e.g., position updates)
  React.useEffect(() => {
    setNodes(stakeholders.map(stakeholder => ({
      id: stakeholder.id,
      type: 'default',
      position: stakeholder.position || { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: (
          <div className="text-left">
            <div className="font-medium text-gray-800">{stakeholder.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stakeholder.title}</div>
          </div>
        ),
      },
      ...nodeDefaults,
    })));
  }, [stakeholders, setNodes]);

  // Update edges if relationships prop changes
  React.useEffect(() => {
    setEdges(relationships.map(relationship => ({
      id: relationship.id,
      source: relationship.sourceStakeholderId,
      target: relationship.targetStakeholderId,
      type: 'smoothstep',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
        color: relationshipStyles[relationship.type]?.stroke || '#64748b',
      },
      style: {
        ...relationshipStyles[relationship.type],
        strokeWidth: 1.5,
      },
    })));
  }, [relationships, setEdges]);

  return (
    <div style={{ height: '500px' }} className="rounded-lg border bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
