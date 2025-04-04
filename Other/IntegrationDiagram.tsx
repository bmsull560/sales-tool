import * as React from 'react'
import { useState, useCallback, useRef } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType
} from 'reactflow'
import 'reactflow/dist/style.css'
import { 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  Upload, 
  ZoomIn, 
  ZoomOut, 
  Layers,
  Settings,
  ArrowRight
} from 'lucide-react'

// Custom node types
import { SystemNode } from './diagram/SystemNode'
import { DataFlowNode } from './diagram/DataFlowNode'
import { APINode } from './diagram/APINode'
import { DatabaseNode } from './diagram/DatabaseNode'
import { UserNode } from './diagram/UserNode'

// Node type definitions
const nodeTypes = {
  system: SystemNode,
  dataFlow: DataFlowNode,
  api: APINode,
  database: DatabaseNode,
  user: UserNode
}

// Initial nodes for the diagram
const initialNodes: Node[] = [
  {
    id: 'your-product',
    type: 'system',
    data: { 
      label: 'Your Product',
      description: 'Core platform capabilities',
      icon: '💼',
      color: '#4ade80' // neon green
    },
    position: { x: 250, y: 200 },
  },
  {
    id: 'customer-crm',
    type: 'system',
    data: { 
      label: 'Customer CRM',
      description: 'Existing customer data',
      icon: '👥',
      color: '#3b82f6' // blue
    },
    position: { x: 50, y: 50 },
  },
  {
    id: 'erp-system',
    type: 'system',
    data: { 
      label: 'ERP System',
      description: 'Business operations',
      icon: '🏢',
      color: '#8b5cf6' // purple
    },
    position: { x: 450, y: 50 },
  },
  {
    id: 'database',
    type: 'database',
    data: { 
      label: 'Data Warehouse',
      description: 'Centralized data storage',
      color: '#f59e0b' // amber
    },
    position: { x: 250, y: 350 },
  },
  {
    id: 'users',
    type: 'user',
    data: { 
      label: 'End Users',
      description: 'Product consumers',
      color: '#ec4899' // pink
    },
    position: { x: 50, y: 350 },
  },
  {
    id: 'api-gateway',
    type: 'api',
    data: { 
      label: 'API Gateway',
      description: 'Integration layer',
      color: '#10b981' // emerald
    },
    position: { x: 450, y: 350 },
  },
]

// Initial edges for the diagram
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'customer-crm',
    target: 'your-product',
    animated: true,
    label: 'Customer Data',
    style: { stroke: '#3b82f6' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#3b82f6',
    },
  },
  {
    id: 'e2-3',
    source: 'erp-system',
    target: 'your-product',
    animated: true,
    label: 'Business Data',
    style: { stroke: '#8b5cf6' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#8b5cf6',
    },
  },
  {
    id: 'e3-4',
    source: 'your-product',
    target: 'database',
    animated: true,
    label: 'Store Data',
    style: { stroke: '#4ade80' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#4ade80',
    },
  },
  {
    id: 'e4-5',
    source: 'your-product',
    target: 'users',
    animated: true,
    label: 'User Interface',
    style: { stroke: '#4ade80' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#4ade80',
    },
  },
  {
    id: 'e5-6',
    source: 'your-product',
    target: 'api-gateway',
    animated: true,
    label: 'API Calls',
    style: { stroke: '#4ade80' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#4ade80',
    },
  },
]

// Node templates for adding new nodes
const nodeTemplates = [
  {
    type: 'system',
    label: 'System',
    description: 'External system or application',
    icon: '🖥️',
    color: '#3b82f6'
  },
  {
    type: 'database',
    label: 'Database',
    description: 'Data storage system',
    color: '#f59e0b'
  },
  {
    type: 'api',
    label: 'API',
    description: 'Integration endpoint',
    color: '#10b981'
  },
  {
    type: 'user',
    label: 'User',
    description: 'Human actor or role',
    color: '#ec4899'
  },
  {
    type: 'dataFlow',
    label: 'Data Flow',
    description: 'Information transfer',
    color: '#6366f1'
  }
]

export function IntegrationDiagram() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const [nodeName, setNodeName] = useState('')
  const [nodeDescription, setNodeDescription] = useState('')
  const [nodeColor, setNodeColor] = useState('#3b82f6')
  const [showNodePanel, setShowNodePanel] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  // Handle connecting nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#4ade80' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#4ade80',
      },
    }, eds)),
    [setEdges]
  )

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setNodeName(node.data.label)
    setNodeDescription(node.data.description)
    setNodeColor(node.data.color)
    setShowNodePanel(true)
  }, [])

  // Update selected node
  const updateNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            node.data = {
              ...node.data,
              label: nodeName,
              description: nodeDescription,
              color: nodeColor
            }
          }
          return node
        })
      )
      setShowNodePanel(false)
    }
  }, [selectedNode, nodeName, nodeDescription, nodeColor, setNodes])

  // Delete selected node
  const deleteNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
      setEdges((eds) => eds.filter(
        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
      ))
      setSelectedNode(null)
      setShowNodePanel(false)
    }
  }, [selectedNode, setNodes, setEdges])

  // Add new node from template
  const addNodeFromTemplate = useCallback((template: any) => {
    if (reactFlowInstance) {
      const position = reactFlowInstance.screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })
      
      const newNode = {
        id: `node-${Date.now()}`,
        type: template.type,
        position,
        data: {
          label: template.label,
          description: template.description,
          icon: template.icon,
          color: template.color
        }
      }
      
      setNodes((nds) => nds.concat(newNode))
      setShowTemplates(false)
    }
  }, [reactFlowInstance, setNodes])

  // Export diagram as JSON
  const exportDiagram = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      const dataStr = JSON.stringify(flow)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = 'integration-diagram.json'
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    }
  }, [reactFlowInstance])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-panel">
        <h2 className="text-xl font-semibold text-white">Integration Diagram</h2>
        <div className="flex items-center gap-2">
          <button 
            className="btn btn-secondary flex items-center gap-1"
            onClick={() => setShowTemplates(true)}
          >
            <Plus className="w-4 h-4" /> Add Node
          </button>
          <button 
            className="btn btn-secondary flex items-center gap-1"
            onClick={exportDiagram}
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>
      
      <div className="flex-1 h-[600px]" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
        >
          <Background />
          <Controls />
          
          {/* Node templates panel */}
          {showTemplates && (
            <Panel position="top-left" className="bg-panel border border-surface rounded-lg p-4 shadow-lg w-64">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-medium">Add Node</h3>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowTemplates(false)}
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                {nodeTemplates.map((template, index) => (
                  <div 
                    key={index}
                    className="p-2 bg-surface rounded border border-panel hover:border-neon cursor-pointer transition-colors"
                    onClick={() => addNodeFromTemplate(template)}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded flex items-center justify-center text-white"
                        style={{ backgroundColor: template.color }}
                      >
                        {template.icon || template.type.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-medium">{template.label}</div>
                        <div className="text-xs text-gray-400">{template.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          )}
          
          {/* Node edit panel */}
          {showNodePanel && selectedNode && (
            <Panel position="top-right" className="bg-panel border border-surface rounded-lg p-4 shadow-lg w-64">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-medium">Edit Node</h3>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowNodePanel(false)}
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <input
                    type="text"
                    value={nodeDescription}
                    onChange={(e) => setNodeDescription(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Color</label>
                  <input
                    type="color"
                    value={nodeColor}
                    onChange={(e) => setNodeColor(e.target.value)}
                    className="w-full h-8 rounded border border-panel bg-surface"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button 
                    className="btn btn-primary flex-1"
                    onClick={updateNode}
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-secondary flex items-center justify-center"
                    onClick={deleteNode}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Panel>
          )}
        </ReactFlow>
      </div>
      
      <div className="p-4 bg-panel border-t border-panel">
        <h3 className="text-white font-medium mb-2">How to use:</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li className="flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-neon" /> Drag nodes to position them
          </li>
          <li className="flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-neon" /> Connect nodes by dragging from node handles
          </li>
          <li className="flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-neon" /> Click on nodes to edit their properties
          </li>
          <li className="flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-neon" /> Use the Add Node button to add new components
          </li>
        </ul>
      </div>
    </div>
  )
}
