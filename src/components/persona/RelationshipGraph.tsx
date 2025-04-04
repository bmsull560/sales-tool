import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Persona, Relationship } from '@/types';

interface RelationshipGraphProps {
  personas: Persona[];
  relationships: Relationship[];
}

export function RelationshipGraph({ personas, relationships }: RelationshipGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Generate nodes and edges from personas and relationships
  useEffect(() => {
    if (!personas.length) return;

    // Create nodes from personas
    const personaNodes: Node[] = personas.map((persona, index) => ({
      id: persona.id,
      data: { 
        label: (
          <div className="p-2">
            <div className="font-semibold">{persona.name}</div>
            <div className="text-xs text-slate-500">{persona.title}</div>
          </div>
        ) 
      },
      position: { 
        x: 250 * (index % 3), 
        y: 150 * Math.floor(index / 3) 
      },
      style: {
        background: getNodeColor(persona.role),
        color: '#ffffff',
        border: '1px solid #eaeaea',
        borderRadius: '8px',
        width: 180,
      },
    }));

    // Create edges from relationships
    const relationshipEdges: Edge[] = relationships.map((rel) => ({
      id: rel.id,
      source: rel.source_persona_id,
      target: rel.target_persona_id,
      label: getRelationshipLabel(rel.relationship_type),
      animated: rel.strength === 'strong',
      style: { 
        stroke: getEdgeColor(rel.strength),
        strokeWidth: getEdgeWidth(rel.strength),
      },
      type: 'smoothstep',
    }));

    setNodes(personaNodes);
    setEdges(relationshipEdges);
  }, [personas, relationships, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  if (!personas.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-slate-500">Add personas to visualize relationships</p>
      </div>
    );
  }

  return (
    <div className="h-[600px] border border-slate-200 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

// Helper functions
function getNodeColor(role: string): string {
  switch (role) {
    case 'decision_maker':
      return '#2563eb'; // blue-600
    case 'influencer':
      return '#16a34a'; // green-600
    case 'user':
      return '#9333ea'; // purple-600
    case 'blocker':
      return '#dc2626'; // red-600
    default:
      return '#6b7280'; // gray-500
  }
}

function getRelationshipLabel(type: string): string {
  switch (type) {
    case 'reports_to':
      return 'Reports to';
    case 'works_with':
      return 'Works with';
    case 'influences':
      return 'Influences';
    default:
      return '';
  }
}

function getEdgeColor(strength: string): string {
  switch (strength) {
    case 'strong':
      return '#2563eb'; // blue-600
    case 'medium':
      return '#6b7280'; // gray-500
    case 'weak':
      return '#d1d5db'; // gray-300
    default:
      return '#6b7280'; // gray-500
  }
}

function getEdgeWidth(strength: string): number {
  switch (strength) {
    case 'strong':
      return 3;
    case 'medium':
      return 2;
    case 'weak':
      return 1;
    default:
      return 1;
  }
}
