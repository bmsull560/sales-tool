import * as React from 'react'
import { useState, useRef } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  X, 
  Copy, 
  Move, 
  Image, 
  Type, 
  List, 
  BarChart, 
  Layout, 
  Layers,
  FileText,
  Save,
  Play,
  Edit,
  Trash2
} from 'lucide-react'

interface SlideContent {
  id: string
  type: 'text' | 'image' | 'chart' | 'list' | 'layout'
  content: string
}

interface Slide {
  id: string
  title: string
  thumbnail: string
  order: number
  notes: string
  contents: SlideContent[]
  expanded: boolean
}

export function SlideDeckStoryboard() {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: '1',
      title: 'Introduction',
      thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      order: 1,
      notes: 'Welcome the audience and introduce the key topics',
      contents: [
        {
          id: '1-1',
          type: 'text',
          content: 'Welcome to Our Solution'
        },
        {
          id: '1-2',
          type: 'list',
          content: 'Agenda\n- Problem Overview\n- Solution Introduction\n- Key Benefits\n- Implementation Plan'
        }
      ],
      expanded: false
    },
    {
      id: '2',
      title: 'Problem Statement',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      order: 2,
      notes: 'Outline the key challenges the prospect is facing',
      contents: [
        {
          id: '2-1',
          type: 'text',
          content: 'Current Challenges'
        },
        {
          id: '2-2',
          type: 'list',
          content: '- Manual processes consuming time\n- Limited visibility into performance\n- Difficulty scaling operations'
        },
        {
          id: '2-3',
          type: 'chart',
          content: 'Time Spent on Manual Tasks'
        }
      ],
      expanded: false
    },
    {
      id: '3',
      title: 'Solution Overview',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      order: 3,
      notes: 'Introduce our solution and how it addresses their needs',
      contents: [
        {
          id: '3-1',
          type: 'text',
          content: 'Introducing Our Platform'
        },
        {
          id: '3-2',
          type: 'image',
          content: 'Platform Dashboard'
        },
        {
          id: '3-3',
          type: 'list',
          content: 'Key Features\n- Automated workflows\n- Real-time analytics\n- Scalable infrastructure'
        }
      ],
      expanded: false
    }
  ])
  
  const [currentDrag, setCurrentDrag] = useState<string | null>(null)
  const [showAddSlide, setShowAddSlide] = useState(false)
  const [newSlide, setNewSlide] = useState({
    title: '',
    notes: ''
  })
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null)
  const [editingContentId, setEditingContentId] = useState<string | null>(null)
  const [contentText, setContentText] = useState('')
  
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)
  
  // Content type options for adding new content
  const contentTypes = [
    { type: 'text', icon: <Type className="w-4 h-4" />, label: 'Text' },
    { type: 'image', icon: <Image className="w-4 h-4" />, label: 'Image' },
    { type: 'list', icon: <List className="w-4 h-4" />, label: 'List' },
    { type: 'chart', icon: <BarChart className="w-4 h-4" />, label: 'Chart' },
    { type: 'layout', icon: <Layout className="w-4 h-4" />, label: 'Layout' }
  ]
  
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragItem.current = index
    e.dataTransfer.effectAllowed = 'move'
    e.currentTarget.classList.add('opacity-50')
    setCurrentDrag(slides[index].id)
  }
  
  const handleDragEnter = (e: React.DragEvent, index: number) => {
    dragOverItem.current = index
    e.preventDefault()
    e.currentTarget.classList.add('bg-gray-800')
  }
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-gray-800')
  }
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove('bg-gray-800')
    
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const copySlides = [...slides]
      const draggedItem = copySlides[dragItem.current]
      
      // Remove the dragged item
      copySlides.splice(dragItem.current, 1)
      
      // Add it at the new position
      copySlides.splice(dragOverItem.current, 0, draggedItem)
      
      // Update order numbers
      const reorderedSlides = copySlides.map((slide, index) => ({
        ...slide,
        order: index + 1
      }))
      
      // Reset refs
      dragItem.current = null
      dragOverItem.current = null
      setCurrentDrag(null)
      
      setSlides(reorderedSlides)
    }
  }
  
  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50')
    setCurrentDrag(null)
  }
  
  const toggleSlideExpand = (id: string) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, expanded: !slide.expanded } : slide
    ))
  }
  
  const handleAddSlide = () => {
    if (!newSlide.title.trim()) return
    
    const newId = Date.now().toString()
    const slide: Slide = {
      id: newId,
      title: newSlide.title,
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      order: slides.length + 1,
      notes: newSlide.notes,
      contents: [
        {
          id: `${newId}-1`,
          type: 'text',
          content: newSlide.title
        }
      ],
      expanded: false
    }
    
    setSlides([...slides, slide])
    setNewSlide({ title: '', notes: '' })
    setShowAddSlide(false)
  }
  
  const handleRemoveSlide = (id: string) => {
    const filteredSlides = slides.filter(slide => slide.id !== id)
    
    // Update order numbers
    const reorderedSlides = filteredSlides.map((slide, index) => ({
      ...slide,
      order: index + 1
    }))
    
    setSlides(reorderedSlides)
  }
  
  const handleDuplicateSlide = (slide: Slide) => {
    const newId = Date.now().toString()
    const newSlide: Slide = {
      ...slide,
      id: newId,
      order: slides.length + 1,
      title: `${slide.title} (Copy)`,
      contents: slide.contents.map(content => ({
        ...content,
        id: `${newId}-${content.id.split('-')[1]}`
      })),
      expanded: false
    }
    
    setSlides([...slides, newSlide])
  }
  
  const handleEditSlide = (slide: Slide) => {
    setEditingSlideId(slide.id)
    setNewSlide({
      title: slide.title,
      notes: slide.notes
    })
  }
  
  const handleUpdateSlide = () => {
    if (!editingSlideId) return
    
    setSlides(slides.map(slide => 
      slide.id === editingSlideId
        ? { ...slide, title: newSlide.title, notes: newSlide.notes }
        : slide
    ))
    
    setEditingSlideId(null)
    setNewSlide({ title: '', notes: '' })
  }
  
  const handleAddContent = (slideId: string, contentType: string) => {
    const newContentId = `${slideId}-${Date.now()}`
    const newContent: SlideContent = {
      id: newContentId,
      type: contentType as 'text' | 'image' | 'chart' | 'list' | 'layout',
      content: contentType === 'text' ? 'New Text' : 
               contentType === 'list' ? '- Item 1\n- Item 2\n- Item 3' : 
               contentType === 'chart' ? 'Chart Title' :
               contentType === 'image' ? 'Image Description' : 'Layout Section'
    }
    
    setSlides(slides.map(slide => 
      slide.id === slideId
        ? { ...slide, contents: [...slide.contents, newContent] }
        : slide
    ))
  }
  
  const handleRemoveContent = (slideId: string, contentId: string) => {
    setSlides(slides.map(slide => 
      slide.id === slideId
        ? { ...slide, contents: slide.contents.filter(content => content.id !== contentId) }
        : slide
    ))
  }
  
  const handleEditContent = (slideId: string, contentId: string, content: string) => {
    const slideContent = slides
      .find(slide => slide.id === slideId)
      ?.contents.find(c => c.id === contentId)
    
    if (slideContent) {
      setEditingContentId(contentId)
      setContentText(content)
    }
  }
  
  const handleUpdateContent = (slideId: string) => {
    if (!editingContentId) return
    
    setSlides(slides.map(slide => 
      slide.id === slideId
        ? { 
            ...slide, 
            contents: slide.contents.map(content => 
              content.id === editingContentId
                ? { ...content, content: contentText }
                : content
            ) 
          }
        : slide
    ))
    
    setEditingContentId(null)
    setContentText('')
  }
  
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <Type className="w-4 h-4 text-blue-400" />
      case 'image':
        return <Image className="w-4 h-4 text-green-400" />
      case 'list':
        return <List className="w-4 h-4 text-yellow-400" />
      case 'chart':
        return <BarChart className="w-4 h-4 text-purple-400" />
      case 'layout':
        return <Layout className="w-4 h-4 text-red-400" />
      default:
        return <Type className="w-4 h-4 text-blue-400" />
    }
  }
  
  return (
    <div className="bg-surface rounded-lg border border-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-neon" />
          Slide Deck Storyboard
        </h2>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddSlide(true)}
            className="px-3 py-1.5 text-sm bg-neon hover:bg-neon-dark text-background rounded transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Slide
          </button>
          
          <button className="px-3 py-1.5 text-sm border border-neon text-neon hover:bg-neon hover:text-background rounded transition-colors flex items-center gap-1">
            <Save className="w-4 h-4" />
            Save Deck
          </button>
          
          <button className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center gap-1">
            <Play className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>
      
      {/* Slide deck grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`bg-panel rounded-lg border border-gray-700 overflow-hidden transition-all ${
              currentDrag === slide.id ? 'opacity-50' : ''
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
          >
            {/* Slide header with thumbnail */}
            <div className="relative">
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                Slide {slide.order}
              </div>
              
              <div className="absolute top-2 right-2 flex gap-1">
                <button 
                  onClick={() => handleDuplicateSlide(slide)}
                  className="p-1 bg-black bg-opacity-70 text-white rounded-full hover:bg-opacity-90"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleEditSlide(slide)}
                  className="p-1 bg-black bg-opacity-70 text-white rounded-full hover:bg-opacity-90"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleRemoveSlide(slide.id)}
                  className="p-1 bg-black bg-opacity-70 text-white rounded-full hover:bg-opacity-90"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div className="h-40 bg-gray-800 flex items-center justify-center overflow-hidden">
                <img 
                  src={slide.thumbnail} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-medium truncate">{slide.title}</h3>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-move opacity-0 hover:opacity-100 transition-opacity">
                <div className="p-3 bg-black bg-opacity-70 rounded-full">
                  <Move className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            {/* Slide content accordion */}
            <div className="p-3">
              <button
                onClick={() => toggleSlideExpand(slide.id)}
                className="w-full flex items-center justify-between text-white py-2"
              >
                <span className="font-medium">Slide Contents</span>
                {slide.expanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              
              {slide.expanded && (
                <div className="mt-2 space-y-3">
                  {/* Content items */}
                  {slide.contents.map((content) => (
                    <div key={content.id} className="bg-gray-800 rounded p-3">
                      {editingContentId === content.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={contentText}
                            onChange={(e) => setContentText(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded border border-gray-600 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                            rows={4}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingContentId(null)}
                              className="px-2 py-1 text-xs text-gray-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateContent(slide.id)}
                              className="px-2 py-1 text-xs bg-neon hover:bg-neon-dark text-background rounded"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getContentIcon(content.type)}
                              <span className="text-sm text-gray-300 capitalize">{content.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditContent(slide.id, content.id, content.content)}
                                className="p-1 text-gray-400 hover:text-white rounded"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleRemoveContent(slide.id, content.id)}
                                className="p-1 text-gray-400 hover:text-red-400 rounded"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 whitespace-pre-line">
                            {content.content}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Add content buttons */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {contentTypes.map((type) => (
                      <button
                        key={type.type}
                        onClick={() => handleAddContent(slide.id, type.type)}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300"
                      >
                        {type.icon}
                        <span>Add {type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Slide notes accordion */}
              <div className="mt-2">
                <button
                  className="w-full flex items-center justify-between text-white py-2"
                  onClick={() => {
                    // Toggle notes visibility logic would go here
                  }}
                >
                  <span className="font-medium text-sm">Speaker Notes</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {slide.notes || 'No notes added'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add slide form */}
      {showAddSlide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg border border-panel p-6 w-96 shadow-xl">
            <h3 className="text-white font-medium mb-4">Add New Slide</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Slide Title</label>
                <input
                  type="text"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full bg-panel text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                  placeholder="Slide title"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Speaker Notes</label>
                <textarea
                  value={newSlide.notes}
                  onChange={(e) => setNewSlide({ ...newSlide, notes: e.target.value })}
                  className="w-full bg-panel text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                  rows={3}
                  placeholder="Notes for the presenter"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowAddSlide(false);
                    setNewSlide({ title: '', notes: '' });
                  }}
                  className="px-4 py-2 border border-gray-700 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSlide}
                  className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors"
                >
                  Add Slide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit slide form */}
      {editingSlideId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg border border-panel p-6 w-96 shadow-xl">
            <h3 className="text-white font-medium mb-4">Edit Slide</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Slide Title</label>
                <input
                  type="text"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full bg-panel text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Speaker Notes</label>
                <textarea
                  value={newSlide.notes}
                  onChange={(e) => setNewSlide({ ...newSlide, notes: e.target.value })}
                  className="w-full bg-panel text-white rounded border border-gray-700 px-3 py-2 focus:border-neon focus:ring-1 focus:ring-neon"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingSlideId(null);
                    setNewSlide({ title: '', notes: '' });
                  }}
                  className="px-4 py-2 border border-gray-700 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSlide}
                  className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors"
                >
                  Update Slide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-gray-400">
          {slides.length} slides in deck
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-700 text-white rounded hover:border-gray-600 transition-colors text-sm">
            Import Slides
          </button>
          <button className="px-4 py-2 bg-neon hover:bg-neon-dark text-background font-medium rounded transition-colors text-sm">
            Export to PowerPoint
          </button>
        </div>
      </div>
    </div>
  )
}
