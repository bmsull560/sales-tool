import * as React from 'react'
import { useState } from 'react'
import { FileText, Library, Settings, Presentation, BookOpen, Clock, Network } from 'lucide-react'
import { DemoStoryboard } from './DemoStoryboard'
import { DemoArcBanner } from './DemoArcBanner'
import { DemoNarrativeScales } from './DemoNarrativeScales'
import { SlideDeckStoryboard } from './SlideDeckStoryboard'
import { IntegrationDiagram } from './IntegrationDiagram'

interface ContentItem {
  title: string
  type: string
  duration: string
  description: string
}

const contentLibrary: ContentItem[] = [
  {
    title: "Product Overview",
    type: "Slide Deck",
    duration: "10 mins",
    description: "High-level introduction to key features and benefits"
  },
  {
    title: "Technical Architecture",
    type: "Interactive Demo",
    duration: "15 mins",
    description: "Deep dive into system architecture and integrations"
  },
  {
    title: "Success Story: TechCorp",
    type: "Case Study",
    duration: "5 mins",
    description: "3x improvement in demo efficiency"
  }
]

export function DemoPreparation() {
  const [activeTab, setActiveTab] = useState<'storyboard' | 'slides' | 'script' | 'integration'>('storyboard')
  
  return (
    <div>
      {/* Banner at the top */}
      <DemoArcBanner />
      
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-white mb-8">Demo Preparation Studio</h1>
        
        {/* Demo Narrative Scales */}
        <div className="mb-8">
          <DemoNarrativeScales />
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'storyboard' 
                ? 'border-neon text-neon' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('storyboard')}
          >
            Demo Storyboard
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'slides' 
                ? 'border-neon text-neon' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('slides')}
          >
            Slide Deck Builder
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'integration' 
                ? 'border-neon text-neon' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('integration')}
          >
            <div className="flex items-center gap-1">
              <Network className="w-4 h-4" />
              <span>Integration Diagram</span>
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'script' 
                ? 'border-neon text-neon' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('script')}
          >
            Script Generator
          </button>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'storyboard' && (
          <div className="mb-8">
            <DemoStoryboard />
          </div>
        )}
        
        {activeTab === 'slides' && (
          <div className="mb-8">
            <SlideDeckStoryboard />
          </div>
        )}
        
        {activeTab === 'integration' && (
          <div className="mb-8">
            <IntegrationDiagram />
          </div>
        )}
        
        {activeTab === 'script' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Script Generation */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-surface rounded-lg border border-panel p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-neon" />
                  <h2 className="text-lg font-medium text-white">Demo Script Generator</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Target Audience
                    </label>
                    <select className="w-full bg-panel text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon">
                      <option>Technical Decision Makers</option>
                      <option>Business Stakeholders</option>
                      <option>End Users</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Key Focus Areas
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Technical Features', 'Business Value', 'Integration', 'Security', 'Scalability', 'Support'].map((area) => (
                        <label key={area} className="flex items-center space-x-2">
                          <input type="checkbox" className="text-neon focus:ring-neon rounded border-gray-700 bg-panel" />
                          <span className="text-sm text-gray-300">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Demo Duration
                    </label>
                    <select className="w-full bg-panel text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon">
                      <option>25 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>

                  <button className="w-full bg-neon hover:bg-neon-dark text-background font-medium py-2 rounded transition-colors">
                    Generate Script
                  </button>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-panel p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-6 h-6 text-neon" />
                  <h2 className="text-lg font-medium text-white">Environment Setup</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-panel rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white">Demo Environment</span>
                    </div>
                    <span className="text-sm text-gray-400">Ready</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-panel rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white">Sample Data</span>
                    </div>
                    <span className="text-sm text-gray-400">Loaded</span>
                  </div>

                  <button className="w-full bg-neon hover:bg-neon-dark text-background font-medium py-2 rounded transition-colors">
                    Reset Environment
                  </button>
                </div>
              </div>
            </div>

            {/* Content Library */}
            <div className="space-y-6">
              <div className="bg-surface rounded-lg border border-panel p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Library className="w-6 h-6 text-neon" />
                  <h2 className="text-lg font-medium text-white">Content Library</h2>
                </div>
                
                <div className="space-y-4">
                  {contentLibrary.map((item, index) => (
                    <div key={index} className="p-4 bg-panel rounded hover:bg-opacity-70 cursor-pointer transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-medium">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">{item.type}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              {item.duration}
                            </div>
                          </div>
                        </div>
                        {item.type === 'Slide Deck' && <Presentation className="w-5 h-5 text-neon" />}
                        {item.type === 'Case Study' && <BookOpen className="w-5 h-5 text-neon" />}
                      </div>
                      <p className="mt-2 text-sm text-gray-400">{item.description}</p>
                    </div>
                  ))}

                  <button className="w-full mt-4 border border-neon text-neon hover:bg-neon hover:text-background font-medium py-2 rounded transition-colors">
                    View All Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
