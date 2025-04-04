import * as React from 'react'
import { useState } from 'react'
import { 
  Clock, 
  Presentation, 
  Plus, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Move,
  ScreenShare,
  MessageSquare,
  LineChart,
  Zap
} from 'lucide-react'

interface StoryboardStep {
  id: string
  title: string
  type: 'presentation' | 'demo' | 'discussion' | 'data' | 'feature'
  duration: number // in minutes
  description: string
  keyPoints: string[]
  order: number
}

export function DemoStoryboard() {
  const [steps, setSteps] = useState<StoryboardStep[]>([
    {
      id: '1',
      title: 'Introduction & Agenda',
      type: 'presentation',
      duration: 5,
      description: 'Welcome and overview of what will be covered',
      keyPoints: ['Company introduction', 'Agenda overview', 'Expected outcomes'],
      order: 1
    },
    {
      id: '2',
      title: 'Problem Statement',
      type: 'discussion',
      duration: 7,
      description: 'Discuss the challenges the prospect is facing',
      keyPoints: ['Current pain points', 'Business impact', 'Desired outcomes'],
      order: 2
    },
    {
      id: '3',
      title: 'Platform Overview',
      type: 'demo',
      duration: 10,
      description: 'Live demonstration of core platform capabilities',
      keyPoints: ['User interface walkthrough', 'Core workflows', 'Admin capabilities'],
      order: 3
    },
    {
      id: '4',
      title: 'Success Metrics',
      type: 'data',
      duration: 5,
      description: 'Share relevant case studies and metrics',
      keyPoints: ['ROI calculation', 'Time-to-value', 'Customer testimonials'],
      order: 4
    }
  ])
  
  const [showNewStepForm, setShowNewStepForm] = useState(false)
  const [newStep, setNewStep] = useState<Partial<StoryboardStep>>({
    title: '',
    type: 'presentation',
    duration: 5,
    description: '',
    keyPoints: [''],
    order: steps.length + 1
  })
  
  const [editingStepId, setEditingStepId] = useState<string | null>(null)
  
  const totalDuration = steps.reduce((total, step) => total + step.duration, 0)
  
  const handleAddStep = () => {
    if (!newStep.title) return
    
    const step: StoryboardStep = {
      id: Date.now().toString(),
      title: newStep.title || '',
      type: newStep.type || 'presentation',
      duration: newStep.duration || 5,
      description: newStep.description || '',
      keyPoints: newStep.keyPoints?.filter(point => point.trim() !== '') || [],
      order: steps.length + 1
    }
    
    setSteps([...steps, step])
    setShowNewStepForm(false)
    setNewStep({
      title: '',
      type: 'presentation',
      duration: 5,
      description: '',
      keyPoints: [''],
      order: steps.length + 2
    })
  }
  
  const handleDeleteStep = (id: string) => {
    const updatedSteps = steps.filter(step => step.id !== id)
    // Update order for remaining steps
    const reorderedSteps = updatedSteps.map((step, index) => ({
      ...step,
      order: index + 1
    }))
    setSteps(reorderedSteps)
  }
  
  const handleMoveStep = (id: string, direction: 'up' | 'down') => {
    const stepIndex = steps.findIndex(step => step.id === id)
    if ((direction === 'up' && stepIndex === 0) || 
        (direction === 'down' && stepIndex === steps.length - 1)) {
      return
    }
    
    const newSteps = [...steps]
    const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1
    
    // Swap order properties
    const stepToMove = newSteps[stepIndex]
    const targetStep = newSteps[targetIndex]
    
    const tempOrder = targetStep.order
    newSteps[targetIndex].order = stepToMove.order
    newSteps[stepIndex].order = tempOrder
    
    // Swap positions in array
    [newSteps[stepIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[stepIndex]]
    
    setSteps(newSteps)
  }
  
  const handleEditStep = (step: StoryboardStep) => {
    setEditingStepId(step.id)
    setNewStep(step)
  }
  
  const handleUpdateStep = () => {
    if (!editingStepId) return
    
    const updatedSteps = steps.map(step => {
      if (step.id === editingStepId) {
        return {
          ...step,
          title: newStep.title || step.title,
          type: newStep.type || step.type,
          duration: newStep.duration || step.duration,
          description: newStep.description || step.description,
          keyPoints: newStep.keyPoints?.filter(point => point.trim() !== '') || step.keyPoints
        }
      }
      return step
    })
    
    setSteps(updatedSteps)
    setEditingStepId(null)
    setNewStep({
      title: '',
      type: 'presentation',
      duration: 5,
      description: '',
      keyPoints: [''],
      order: steps.length + 1
    })
  }
  
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'presentation':
        return <Presentation className="w-5 h-5 text-blue-400" />
      case 'demo':
        return <ScreenShare className="w-5 h-5 text-green-400" />
      case 'discussion':
        return <MessageSquare className="w-5 h-5 text-purple-400" />
      case 'data':
        return <LineChart className="w-5 h-5 text-yellow-400" />
      case 'feature':
        return <Zap className="w-5 h-5 text-neon" />
      default:
        return <Presentation className="w-5 h-5 text-blue-400" />
    }
  }
  
  return (
    <div className="bg-surface rounded-lg border border-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Presentation className="w-6 h-6 text-neon" />
          <h2 className="text-lg font-medium text-white">Demo Storyboard</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Total: {totalDuration} minutes
          </div>
          <button 
            onClick={() => setShowNewStepForm(true)}
            className="text-neon hover:text-neon-dark transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Step</span>
          </button>
        </div>
      </div>
      
      {/* Storyboard Timeline */}
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="bg-panel rounded-lg p-4 relative">
            {editingStepId === step.id ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newStep.title}
                      onChange={(e) => setNewStep({...newStep, title: e.target.value})}
                      className="w-full bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-white mb-1">
                      Type
                    </label>
                    <select
                      value={newStep.type}
                      onChange={(e) => setNewStep({...newStep, type: e.target.value as any})}
                      className="w-full bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                    >
                      <option value="presentation">Presentation</option>
                      <option value="demo">Demo</option>
                      <option value="discussion">Discussion</option>
                      <option value="data">Data</option>
                      <option value="feature">Feature</option>
                    </select>
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-white mb-1">
                      Minutes
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={newStep.duration}
                      onChange={(e) => setNewStep({...newStep, duration: parseInt(e.target.value)})}
                      className="w-full bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Description
                  </label>
                  <textarea
                    value={newStep.description}
                    onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                    className="w-full bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Key Points
                  </label>
                  <div className="space-y-2">
                    {newStep.keyPoints?.map((point, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => {
                            const updatedPoints = [...(newStep.keyPoints || [])];
                            updatedPoints[i] = e.target.value;
                            setNewStep({...newStep, keyPoints: updatedPoints});
                          }}
                          className="flex-1 bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                        />
                        <button
                          onClick={() => {
                            const updatedPoints = [...(newStep.keyPoints || [])];
                            updatedPoints.splice(i, 1);
                            setNewStep({...newStep, keyPoints: updatedPoints});
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setNewStep({
                          ...newStep, 
                          keyPoints: [...(newStep.keyPoints || []), '']
                        });
                      }}
                      className="text-neon hover:text-neon-dark transition-colors text-sm"
                    >
                      + Add Point
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingStepId(null);
                      setNewStep({
                        title: '',
                        type: 'presentation',
                        duration: 5,
                        description: '',
                        keyPoints: [''],
                        order: steps.length + 1
                      });
                    }}
                    className="px-4 py-2 border border-gray-700 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateStep}
                    className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-neon to-blue-500 rounded-l-lg"></div>
                
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center border-2 border-neon text-white font-medium">
                        {step.order}
                      </div>
                      <div className="h-full w-0.5 bg-gray-700 my-1"></div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        {getStepIcon(step.type)}
                        <h3 className="text-white font-medium">{step.title}</h3>
                        <span className="text-sm text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.duration}m
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mt-2">{step.description}</p>
                      
                      {step.keyPoints.length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">Key Points</h4>
                          <ul className="space-y-1">
                            {step.keyPoints.map((point, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="text-neon">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveStep(step.id, 'up')}
                      disabled={index === 0}
                      className={`p-1 rounded hover:bg-gray-700 ${index === 0 ? 'text-gray-600' : 'text-gray-400'}`}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveStep(step.id, 'down')}
                      disabled={index === steps.length - 1}
                      className={`p-1 rounded hover:bg-gray-700 ${index === steps.length - 1 ? 'text-gray-600' : 'text-gray-400'}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditStep(step)}
                      className="p-1 rounded hover:bg-gray-700 text-gray-400"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteStep(step.id)}
                      className="p-1 rounded hover:bg-red-900 text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Add New Step Form */}
      {showNewStepForm && (
        <div className="bg-panel rounded-lg p-4 border border-neon">
          <h3 className="text-white font-medium mb-4">Add New Step</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newStep.title}
                  onChange={(e) => setNewStep({...newStep, title: e.target.value})}
                  className="w-full bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                  placeholder="Step title"
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-white mb-1">
                  Type
                </label>
                <select
                  value={newStep.type}
                  onChange={(e) => setNewStep({...newStep, type: e.target.value as any})}
                  className="w-full bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                >
                  <option value="presentation">Presentation</option>
                  <option value="demo">Demo</option>
                  <option value="discussion">Discussion</option>
                  <option value="data">Data</option>
                  <option value="feature">Feature</option>
                </select>
              </div>
              <div className="w-24">
                <label className="block text-sm font-medium text-white mb-1">
                  Minutes
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={newStep.duration}
                  onChange={(e) => setNewStep({...newStep, duration: parseInt(e.target.value)})}
                  className="w-full bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Description
              </label>
              <textarea
                value={newStep.description}
                onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                className="w-full bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                rows={2}
                placeholder="Brief description of this step"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Key Points
              </label>
              <div className="space-y-2">
                {newStep.keyPoints?.map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const updatedPoints = [...(newStep.keyPoints || [])];
                        updatedPoints[i] = e.target.value;
                        setNewStep({...newStep, keyPoints: updatedPoints});
                      }}
                      className="flex-1 bg-surface text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                      placeholder="Important point to cover"
                    />
                    <button
                      onClick={() => {
                        const updatedPoints = [...(newStep.keyPoints || [])];
                        updatedPoints.splice(i, 1);
                        setNewStep({...newStep, keyPoints: updatedPoints});
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setNewStep({
                      ...newStep, 
                      keyPoints: [...(newStep.keyPoints || []), '']
                    });
                  }}
                  className="text-neon hover:text-neon-dark transition-colors text-sm"
                >
                  + Add Point
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setShowNewStepForm(false);
                setNewStep({
                  title: '',
                  type: 'presentation',
                  duration: 5,
                  description: '',
                  keyPoints: [''],
                  order: steps.length + 1
                });
              }}
              className="px-4 py-2 border border-gray-700 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStep}
              className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors"
            >
              Add Step
            </button>
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 border border-neon text-neon hover:bg-neon hover:text-background rounded transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Storyboard
        </button>
        
        <button className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
          Start Rehearsal
        </button>
      </div>
    </div>
  )
}
