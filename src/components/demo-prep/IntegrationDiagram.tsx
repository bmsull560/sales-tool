'use client';

import * as React from 'react';
import { useState } from 'react';
import { 
  Network, 
  Plus, 
  X, 
  ArrowRight, 
  Database, 
  Server, 
  Cloud, 
  Smartphone, 
  Globe,
  Lock,
  Cpu,
  Settings,
  Save
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface DiagramNode {
  id: string;
  type: 'database' | 'api' | 'cloud' | 'device' | 'web' | 'security' | 'processing' | 'custom';
  label: string;
  x: number;
  y: number;
}

interface DiagramConnection {
  id: string;
  source: string;
  target: string;
  label: string;
  bidirectional: boolean;
}

const getNodeIcon = (type: DiagramNode['type']) => {
  switch (type) {
    case 'database': return <Database className="h-6 w-6 text-blue-400" />;
    case 'api': return <Server className="h-6 w-6 text-green-400" />;
    case 'cloud': return <Cloud className="h-6 w-6 text-purple-400" />;
    case 'device': return <Smartphone className="h-6 w-6 text-yellow-400" />;
    case 'web': return <Globe className="h-6 w-6 text-orange-400" />;
    case 'security': return <Lock className="h-6 w-6 text-red-400" />;
    case 'processing': return <Cpu className="h-6 w-6 text-indigo-400" />;
    case 'custom': return <Settings className="h-6 w-6 text-gray-400" />;
    default: return <Settings className="h-6 w-6" />;
  }
};

const initialNodes: DiagramNode[] = [
  {
    id: '1',
    type: 'web',
    label: 'Web Application',
    x: 100,
    y: 100
  },
  {
    id: '2',
    type: 'api',
    label: 'API Gateway',
    x: 300,
    y: 100
  },
  {
    id: '3',
    type: 'database',
    label: 'Customer Database',
    x: 500,
    y: 100
  },
  {
    id: '4',
    type: 'cloud',
    label: 'Cloud Services',
    x: 300,
    y: 250
  },
  {
    id: '5',
    type: 'security',
    label: 'Auth Service',
    x: 100,
    y: 250
  }
];

const initialConnections: DiagramConnection[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    label: 'REST API',
    bidirectional: true
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
    label: 'SQL Queries',
    bidirectional: false
  },
  {
    id: '2-4',
    source: '2',
    target: '4',
    label: 'Service Integration',
    bidirectional: true
  },
  {
    id: '1-5',
    source: '1',
    target: '5',
    label: 'OAuth 2.0',
    bidirectional: true
  },
  {
    id: '5-2',
    source: '5',
    target: '2',
    label: 'JWT Validation',
    bidirectional: false
  }
];

export default function IntegrationDiagram() {
  const [nodes, setNodes] = useState<DiagramNode[]>(initialNodes);
  const [connections, setConnections] = useState<DiagramConnection[]>(initialConnections);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isAddingConnection, setIsAddingConnection] = useState(false);
  const [newNode, setNewNode] = useState<Partial<DiagramNode>>({
    type: 'api',
    label: '',
    x: 300,
    y: 200
  });
  const [newConnection, setNewConnection] = useState<Partial<DiagramConnection>>({
    source: '',
    target: '',
    label: '',
    bidirectional: false
  });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

  const handleAddNode = () => {
    if (!newNode.label) return;
    
    const node: DiagramNode = {
      id: Date.now().toString(),
      type: newNode.type || 'custom',
      label: newNode.label || 'New Node',
      x: newNode.x || 300,
      y: newNode.y || 200
    };
    
    setNodes([...nodes, node]);
    setIsAddingNode(false);
    setNewNode({
      type: 'api',
      label: '',
      x: 300,
      y: 200
    });
  };

  const handleAddConnection = () => {
    if (!newConnection.source || !newConnection.target || !newConnection.label) return;
    
    const connection: DiagramConnection = {
      id: `${newConnection.source}-${newConnection.target}-${Date.now()}`,
      source: newConnection.source,
      target: newConnection.target,
      label: newConnection.label || 'Connection',
      bidirectional: newConnection.bidirectional || false
    };
    
    setConnections([...connections, connection]);
    setIsAddingConnection(false);
    setNewConnection({
      source: '',
      target: '',
      label: '',
      bidirectional: false
    });
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    setConnections(connections.filter(conn => conn.source !== id && conn.target !== id));
  };

  const removeConnection = (id: string) => {
    setConnections(connections.filter(conn => conn.id !== id));
  };

  // This is a simplified diagram renderer
  // In a real implementation, you would use a library like react-flow or d3.js
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Network className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Integration Diagram</h2>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setIsAddingConnection(true)}
          >
            <ArrowRight className="h-4 w-4 mr-1" /> Add Connection
          </Button>
          <Button 
            onClick={() => setIsAddingNode(true)} 
            className="bg-[#39FF14] hover:bg-[#32E512] text-black"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Component
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Components</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {nodes.map((node) => (
                  <div 
                    key={node.id}
                    className={`p-2 rounded cursor-pointer flex items-center ${selectedNode === node.id ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                  >
                    <div className="mr-2">
                      {getNodeIcon(node.type)}
                    </div>
                    <div className="flex-grow truncate">{node.label}</div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNode(node.id);
                      }}
                    >
                      <X className="h-4 w-4 text-slate-400 hover:text-red-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Connections</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {connections.map((connection) => {
                  const source = nodes.find(n => n.id === connection.source);
                  const target = nodes.find(n => n.id === connection.target);
                  
                  if (!source || !target) return null;
                  
                  return (
                    <div 
                      key={connection.id}
                      className={`p-2 rounded cursor-pointer ${selectedConnection === connection.id ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      onClick={() => setSelectedConnection(connection.id === selectedConnection ? null : connection.id)}
                    >
                      <div className="flex items-center">
                        <div className="mr-1 text-sm font-medium">{source.label}</div>
                        <ArrowRight className="h-4 w-4 mx-1" />
                        <div className="text-sm font-medium">{target.label}</div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeConnection(connection.id);
                          }}
                          className="ml-auto"
                        >
                          <X className="h-4 w-4 text-slate-400 hover:text-red-400" />
                        </Button>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {connection.label}
                        {connection.bidirectional && ' (Bidirectional)'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-[600px] relative">
            <CardContent className="p-4 h-full">
              <div className="absolute top-4 right-4 z-10">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
              
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-lg relative overflow-hidden">
                {/* This is a simplified visual representation */}
                {/* In a real implementation, you would use a proper diagramming library */}
                <div className="absolute inset-0">
                  {/* Draw connections */}
                  <svg className="w-full h-full">
                    {connections.map(connection => {
                      const source = nodes.find(n => n.id === connection.source);
                      const target = nodes.find(n => n.id === connection.target);
                      
                      if (!source || !target) return null;
                      
                      // Simple straight line connection
                      return (
                        <g key={connection.id}>
                          <line 
                            x1={source.x + 40} 
                            y1={source.y + 40} 
                            x2={target.x + 40} 
                            y2={target.y + 40}
                            stroke={selectedConnection === connection.id ? '#39FF14' : '#94a3b8'}
                            strokeWidth={2}
                            markerEnd="url(#arrowhead)"
                          />
                          {/* Connection label */}
                          <text
                            x={(source.x + target.x) / 2 + 40}
                            y={(source.y + target.y) / 2 + 40}
                            textAnchor="middle"
                            fill="#94a3b8"
                            fontSize="12"
                            dy="-5"
                          >
                            {connection.label}
                          </text>
                        </g>
                      );
                    })}
                    {/* Arrow marker definition */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                      </marker>
                    </defs>
                  </svg>
                  
                  {/* Draw nodes */}
                  {nodes.map(node => (
                    <div
                      key={node.id}
                      className={`absolute w-20 h-20 flex flex-col items-center justify-center rounded-lg cursor-move ${
                        selectedNode === node.id ? 'ring-2 ring-[#39FF14]' : ''
                      }`}
                      style={{
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      {getNodeIcon(node.type)}
                      <div className="mt-1 text-xs text-center text-white px-1 truncate w-full">
                        {node.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {isAddingNode && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Add New Component</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Label</label>
                    <Input 
                      value={newNode.label} 
                      onChange={(e) => setNewNode({...newNode, label: e.target.value})}
                      placeholder="Component name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Type</label>
                    <Select 
                      defaultValue={newNode.type} 
                      onValueChange={(value: DiagramNode['type']) => setNewNode({...newNode, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="database">Database</SelectItem>
                        <SelectItem value="api">API / Service</SelectItem>
                        <SelectItem value="cloud">Cloud Service</SelectItem>
                        <SelectItem value="device">Device / Client</SelectItem>
                        <SelectItem value="web">Web Application</SelectItem>
                        <SelectItem value="security">Security Service</SelectItem>
                        <SelectItem value="processing">Processing Engine</SelectItem>
                        <SelectItem value="custom">Custom Component</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm mb-1">X Position</label>
                      <Input 
                        type="number" 
                        value={newNode.x} 
                        onChange={(e) => setNewNode({...newNode, x: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Y Position</label>
                      <Input 
                        type="number" 
                        value={newNode.y} 
                        onChange={(e) => setNewNode({...newNode, y: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingNode(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddNode}
                      className="bg-[#39FF14] hover:bg-[#32E512] text-black"
                    >
                      Add Component
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isAddingConnection && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Add New Connection</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm mb-1">Source</label>
                      <Select 
                        defaultValue={newConnection.source} 
                        onValueChange={(value: string) => setNewConnection({...newConnection, source: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          {nodes.map(node => (
                            <SelectItem key={node.id} value={node.id}>{node.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Target</label>
                      <Select 
                        defaultValue={newConnection.target} 
                        onValueChange={(value: string) => setNewConnection({...newConnection, target: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent>
                          {nodes.map(node => (
                            <SelectItem key={node.id} value={node.id}>{node.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Label</label>
                    <Input 
                      value={newConnection.label} 
                      onChange={(e) => setNewConnection({...newConnection, label: e.target.value})}
                      placeholder="Connection description"
                    />
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="bidirectional" 
                      checked={newConnection.bidirectional} 
                      onChange={(e) => setNewConnection({...newConnection, bidirectional: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="bidirectional" className="text-sm">Bidirectional</label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingConnection(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddConnection}
                      className="bg-[#39FF14] hover:bg-[#32E512] text-black"
                    >
                      Add Connection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
