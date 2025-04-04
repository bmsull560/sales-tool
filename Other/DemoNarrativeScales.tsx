import * as React from 'react'
import { useState } from 'react'
import { Info, ChevronDown, ChevronUp, Plus, X, Save, FileText } from 'lucide-react'

interface ScaleDefinition {
  id: string
  name: string
  leftLabel: string
  rightLabel: string
  value: number
  description: string
}

interface Stakeholder {
  id: string
  name: string
  role: string
  scales: {
    [scaleId: string]: number
  }
}

export function DemoNarrativeScales() {
  const [scales, setScales] = useState<ScaleDefinition[]>([
    {
      id: 'technical',
      name: 'Technical Sophistication',
      leftLabel: 'Non-Technical',
      rightLabel: 'Highly Technical',
      value: 50,
      description: 'Calibrate your demo\'s technical depth. For technical decision-makers, focus on platform performance. For business decision-makers, emphasize user experience and outcomes.'
    },
    {
      id: 'maturity',
      name: 'Solution Maturity',
      leftLabel: 'No Solution',
      rightLabel: 'Advanced Solution',
      value: 30,
      description: 'When prospects have no existing solution, focus more on problem education. For those with advanced solutions, emphasize differentiation and migration benefits.'
    },
    {
      id: 'process',
      name: 'Buying Process Position',
      leftLabel: 'Early Exploration',
      rightLabel: 'Final Decision',
      value: 70,
      description: 'Early-stage demos should focus on pain validation and vision-building, while late-stage demos should include concrete ROI calculations and transition planning.'
    },
    {
      id: 'authority',
      name: 'Decision Authority',
      leftLabel: 'Influencer',
      rightLabel: 'Ultimate Decision-Maker',
      value: 40,
      description: 'For influencers, provide content they can share upward. For ultimate decision-makers, focus on strategic alignment and business case validation.'
    }
  ])
  
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      scales: {
        technical: 90,
        maturity: 70,
        process: 80,
        authority: 85
      }
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      role: 'VP of Operations',
      scales: {
        technical: 60,
        maturity: 50,
        process: 75,
        authority: 70
      }
    }
  ])
  
  const [activeStakeholder, setActiveStakeholder] = useState<string>(stakeholders[0].id)
  const [showAddStakeholder, setShowAddStakeholder] = useState(false)
  const [newStakeholder, setNewStakeholder] = useState({ name: '', role: '' })
  const [showRecommendations, setShowRecommendations] = useState(false)
  
  const handleScaleChange = (scaleId: string, value: number) => {
    // Update the scale value for the active stakeholder
    setStakeholders(stakeholders.map(s => {
      if (s.id === activeStakeholder) {
        return {
          ...s,
          scales: {
            ...s.scales,
            [scaleId]: value
          }
        }
      }
      return s
    }))
  }
  
  const handleAddStakeholder = () => {
    if (!newStakeholder.name.trim()) return
    
    const newId = Date.now().toString()
    const defaultScales: {[key: string]: number} = {}
    
    // Initialize with default values (50%)
    scales.forEach(scale => {
      defaultScales[scale.id] = 50
    })
    
    const stakeholder: Stakeholder = {
      id: newId,
      name: newStakeholder.name,
      role: newStakeholder.role,
      scales: defaultScales
    }
    
    setStakeholders([...stakeholders, stakeholder])
    setActiveStakeholder(newId)
    setNewStakeholder({ name: '', role: '' })
    setShowAddStakeholder(false)
  }
  
  const handleRemoveStakeholder = (id: string) => {
    const filtered = stakeholders.filter(s => s.id !== id)
    setStakeholders(filtered)
    
    if (activeStakeholder === id && filtered.length > 0) {
      setActiveStakeholder(filtered[0].id)
    }
  }
  
  const getRecommendations = (stakeholder: Stakeholder) => {
    const recommendations: string[] = []
    
    // Technical Sophistication recommendations
    if (stakeholder.scales.technical > 70) {
      recommendations.push("Focus on technical architecture and platform performance")
      recommendations.push("Include detailed integration capabilities")
      recommendations.push("Demonstrate advanced configuration options")
    } else if (stakeholder.scales.technical < 30) {
      recommendations.push("Emphasize user experience and business outcomes")
      recommendations.push("Use business terminology instead of technical jargon")
      recommendations.push("Focus on visual workflows rather than technical details")
    }
    
    // Solution Maturity recommendations
    if (stakeholder.scales.maturity > 70) {
      recommendations.push("Highlight differentiation from their current solution")
      recommendations.push("Emphasize migration benefits and process")
      recommendations.push("Focus on advanced features they may not have")
    } else if (stakeholder.scales.maturity < 30) {
      recommendations.push("Focus on problem education and validation")
      recommendations.push("Demonstrate basic workflows and core value")
      recommendations.push("Include more educational content about the problem space")
    }
    
    // Buying Process Position recommendations
    if (stakeholder.scales.process > 70) {
      recommendations.push("Include concrete ROI calculations")
      recommendations.push("Provide detailed implementation planning")
      recommendations.push("Address specific technical and security concerns")
    } else if (stakeholder.scales.process < 30) {
      recommendations.push("Focus on pain validation and vision-building")
      recommendations.push("Keep the demo high-level and conceptual")
      recommendations.push("Include industry trends and benchmarks")
    }
    
    // Decision Authority recommendations
    if (stakeholder.scales.authority > 70) {
      recommendations.push("Focus on strategic alignment and business case validation")
      recommendations.push("Include executive-level metrics and KPIs")
      recommendations.push("Prepare for detailed questions about long-term value")
    } else if (stakeholder.scales.authority < 30) {
      recommendations.push("Provide content they can share upward")
      recommendations.push("Include talking points they can use with decision-makers")
      recommendations.push("Focus on day-to-day operational benefits")
    }
    
    return recommendations
  }
  
  const activeStakeholderData = stakeholders.find(s => s.id === activeStakeholder)
  
  return (
    <div className="bg-surface rounded-lg border border-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          Demo Narrative Calibration
          <div className="relative group">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 w-64 bg-gray-800 p-3 rounded-lg shadow-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              Adjust these scales to calibrate your demo narrative based on your audience's characteristics. The system will provide recommendations based on your settings.
            </div>
          </div>
        </h2>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="px-3 py-1.5 text-sm border border-neon text-neon hover:bg-neon hover:text-background rounded transition-colors flex items-center gap-1"
          >
            <FileText className="w-4 h-4" />
            {showRecommendations ? 'Hide Recommendations' : 'Show Recommendations'}
          </button>
          
          <button
            onClick={() => setShowAddStakeholder(true)}
            className="px-3 py-1.5 text-sm bg-neon hover:bg-neon-dark text-background rounded transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Stakeholder
          </button>
        </div>
      </div>
      
      {/* Stakeholder selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {stakeholders.map(stakeholder => (
          <div 
            key={stakeholder.id}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
              activeStakeholder === stakeholder.id 
                ? 'bg-neon text-background' 
                : 'bg-panel text-white hover:bg-gray-700'
            }`}
            onClick={() => setActiveStakeholder(stakeholder.id)}
          >
            <div>
              <div className="font-medium">{stakeholder.name}</div>
              <div className="text-xs opacity-80">{stakeholder.role}</div>
            </div>
            {stakeholders.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveStakeholder(stakeholder.id);
                }}
                className={`p-1 rounded-full hover:bg-red-500 hover:text-white ${
                  activeStakeholder === stakeholder.id ? 'text-background' : 'text-gray-400'
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Scales */}
      {activeStakeholderData && (
        <div className="space-y-8">
          {scales.map(scale => (
            <div key={scale.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{scale.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{scale.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 w-32">{scale.leftLabel}</span>
                
                <div className="relative flex-1">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-neon"
                      style={{ width: `${activeStakeholderData.scales[scale.id]}%` }}
                    />
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={activeStakeholderData.scales[scale.id]}
                    onChange={(e) => handleScaleChange(scale.id, parseInt(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  />
                  
                  <div 
                    className="absolute top-full mt-1 text-xs text-neon font-medium"
                    style={{ left: `calc(${activeStakeholderData.scales[scale.id]}% - 10px)` }}
                  >
                    {activeStakeholderData.scales[scale.id]}%
                  </div>
                </div>
                
                <span className="text-sm text-gray-400 w-32 text-right">{scale.rightLabel}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Recommendations */}
      {showRecommendations && activeStakeholderData && (
        <div className="mt-8 p-4 bg-panel rounded-lg border border-gray-700">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-neon" />
            Narrative Recommendations for {activeStakeholderData.name}
          </h3>
          
          <ul className="space-y-2">
            {getRecommendations(activeStakeholderData).map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-neon mt-1">•</span>
                {rec}
              </li>
            ))}
          </ul>
          
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors flex items-center gap-2 text-sm">
              <Save className="w-4 h-4" />
              Generate Narrative Guide
            </button>
          </div>
        </div>
      )}
      
      {/* Add stakeholder form */}
      {showAddStakeholder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg border border-panel p-6 w-96 shadow-xl">
            <h3 className="text-white font-medium mb-4">Add New Stakeholder</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={newStakeholder.name}
                  onChange={(e) => setNewStakeholder({ ...newStakeholder, name: e.target.value })}
                  className="w-full bg-panel text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                  placeholder="Stakeholder name"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Role</label>
                <input
                  type="text"
                  value={newStakeholder.role}
                  onChange={(e) => setNewStakeholder({ ...newStakeholder, role: e.target.value })}
                  className="w-full bg-panel text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                  placeholder="e.g. CTO, VP of Operations"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowAddStakeholder(false)}
                  className="px-4 py-2 border border-gray-700 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStakeholder}
                  className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors"
                >
                  Add Stakeholder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-gray-400">
          Calibrate scales for each stakeholder to optimize your demo narrative
        </div>
        
        <button className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors text-sm">
          Apply to Demo Script
        </button>
      </div>
    </div>
  )
}
