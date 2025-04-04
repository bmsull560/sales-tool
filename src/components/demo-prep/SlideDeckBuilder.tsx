'use client';

import * as React from 'react';
import { useState } from 'react';
import { 
  FileText, 
  Image, 
  PlusCircle, 
  X, 
  MoveVertical, 
  ChevronUp, 
  ChevronDown,
  Copy,
  LayoutGrid
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SlideContent {
  id: string;
  type: 'heading' | 'text' | 'image' | 'bullets';
  content: string;
  bulletPoints?: string[];
}

interface Slide {
  id: string;
  title: string;
  contents: SlideContent[];
  notes: string;
  expanded: boolean;
}

const initialSlides: Slide[] = [
  {
    id: '1',
    title: 'Welcome & Introduction',
    contents: [
      {
        id: '1-1',
        type: 'heading',
        content: 'Welcome to Our Solution Overview'
      },
      {
        id: '1-2',
        type: 'text',
        content: 'Today we will explore how our platform addresses your key challenges and delivers measurable business value.'
      }
    ],
    notes: 'Start with a warm welcome and set expectations for the presentation.',
    expanded: false
  },
  {
    id: '2',
    title: 'Problem Statement',
    contents: [
      {
        id: '2-1',
        type: 'heading',
        content: 'Industry Challenges'
      },
      {
        id: '2-2',
        type: 'bullets',
        content: '',
        bulletPoints: [
          'Increasing operational costs',
          'Compliance and security concerns',
          'Legacy system integration',
          'Scalability limitations'
        ]
      }
    ],
    notes: 'Validate these pain points with the audience before moving on.',
    expanded: false
  },
  {
    id: '3',
    title: 'Solution Overview',
    contents: [
      {
        id: '3-1',
        type: 'heading',
        content: 'Our Approach'
      },
      {
        id: '3-2',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3'
      },
      {
        id: '3-3',
        type: 'text',
        content: 'A comprehensive platform designed for seamless integration and scalability.'
      }
    ],
    notes: 'This is where we transition into the demo portion.',
    expanded: false
  }
];

export default function SlideDeckBuilder() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [activeSlide, setActiveSlide] = useState<string | null>(null);
  const [isAddingSlide, setIsAddingSlide] = useState(false);
  const [newSlide, setNewSlide] = useState<Partial<Slide>>({
    title: '',
    contents: [],
    notes: '',
    expanded: true
  });

  const toggleExpand = (id: string) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, expanded: !slide.expanded } : slide
    ));
  };

  const handleAddSlide = () => {
    if (!newSlide.title) return;
    
    const slide: Slide = {
      id: Date.now().toString(),
      title: newSlide.title || 'New Slide',
      contents: [
        {
          id: `${Date.now()}-1`,
          type: 'heading',
          content: 'Slide Heading'
        }
      ],
      notes: newSlide.notes || '',
      expanded: false
    };
    
    setSlides([...slides, slide]);
    setIsAddingSlide(false);
    setNewSlide({
      title: '',
      contents: [],
      notes: '',
      expanded: true
    });
  };

  const removeSlide = (id: string) => {
    setSlides(slides.filter(slide => slide.id !== id));
  };

  const addContent = (slideId: string, type: SlideContent['type']) => {
    setSlides(slides.map(slide => {
      if (slide.id === slideId) {
        const newContent: SlideContent = {
          id: `${slideId}-${Date.now()}`,
          type,
          content: type === 'heading' ? 'New Heading' : 
                  type === 'text' ? 'Add your text here' : 
                  type === 'image' ? 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3' : '',
          bulletPoints: type === 'bullets' ? ['New bullet point'] : undefined
        };
        return { ...slide, contents: [...slide.contents, newContent] };
      }
      return slide;
    }));
  };

  const updateContent = (slideId: string, contentId: string, value: string) => {
    setSlides(slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          contents: slide.contents.map(content => 
            content.id === contentId ? { ...content, content: value } : content
          )
        };
      }
      return slide;
    }));
  };

  const updateBulletPoint = (slideId: string, contentId: string, index: number, value: string) => {
    setSlides(slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          contents: slide.contents.map(content => {
            if (content.id === contentId && content.bulletPoints) {
              const newBulletPoints = [...content.bulletPoints];
              newBulletPoints[index] = value;
              return { ...content, bulletPoints: newBulletPoints };
            }
            return content;
          })
        };
      }
      return slide;
    }));
  };

  const addBulletPoint = (slideId: string, contentId: string) => {
    setSlides(slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          contents: slide.contents.map(content => {
            if (content.id === contentId && content.bulletPoints) {
              return { ...content, bulletPoints: [...content.bulletPoints, 'New bullet point'] };
            }
            return content;
          })
        };
      }
      return slide;
    }));
  };

  const removeBulletPoint = (slideId: string, contentId: string, index: number) => {
    setSlides(slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          contents: slide.contents.map(content => {
            if (content.id === contentId && content.bulletPoints) {
              const newBulletPoints = [...content.bulletPoints];
              newBulletPoints.splice(index, 1);
              return { ...content, bulletPoints: newBulletPoints };
            }
            return content;
          })
        };
      }
      return slide;
    }));
  };

  const removeContent = (slideId: string, contentId: string) => {
    setSlides(slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          contents: slide.contents.filter(content => content.id !== contentId)
        };
      }
      return slide;
    }));
  };

  const updateNotes = (slideId: string, notes: string) => {
    setSlides(slides.map(slide => 
      slide.id === slideId ? { ...slide, notes } : slide
    ));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Slide Deck Builder</h2>
        </div>
        <Button 
          onClick={() => setIsAddingSlide(true)} 
          className="bg-[#39FF14] hover:bg-[#32E512] text-black"
        >
          <PlusCircle className="h-4 w-4 mr-1" /> Add Slide
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-slate-800 rounded-lg p-4 h-fit">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Slide Navigator</h3>
            <Button variant="ghost" size="sm">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`p-2 rounded cursor-pointer flex items-center ${activeSlide === slide.id ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
                onClick={() => setActiveSlide(slide.id)}
              >
                <div className="w-6 h-6 flex items-center justify-center bg-slate-600 rounded mr-2">
                  {index + 1}
                </div>
                <div className="flex-grow truncate">{slide.title}</div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSlide(slide.id);
                  }}
                >
                  <X className="h-4 w-4 text-slate-400 hover:text-red-400" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {slides.map((slide, index) => (
            <Card key={slide.id} className={activeSlide === slide.id ? 'border-[#39FF14]' : ''}>
              <CardContent className="p-0">
                <div 
                  className="p-4 flex items-center cursor-pointer"
                  onClick={() => toggleExpand(slide.id)}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-slate-700 rounded-full mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{slide.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Duplicate slide functionality would go here
                      }}
                    >
                      <Copy className="h-4 w-4 text-slate-400" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSlide(slide.id);
                      }}
                    >
                      <X className="h-4 w-4 text-slate-400 hover:text-red-400" />
                    </Button>
                    {slide.expanded ? 
                      <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    }
                  </div>
                </div>
                
                {slide.expanded && (
                  <div className="p-4 pt-0 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <Tabs defaultValue="content">
                      <TabsList className="mb-4">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="notes">Speaker Notes</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content">
                        <div className="space-y-4">
                          {slide.contents.map((content) => (
                            <div key={content.id} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium capitalize">{content.type}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => removeContent(slide.id, content.id)}
                                >
                                  <X className="h-4 w-4 text-slate-400 hover:text-red-400" />
                                </Button>
                              </div>
                              
                              {content.type === 'heading' && (
                                <Input 
                                  value={content.content} 
                                  onChange={(e) => updateContent(slide.id, content.id, e.target.value)}
                                  className="font-bold text-lg"
                                />
                              )}
                              
                              {content.type === 'text' && (
                                <Textarea 
                                  value={content.content} 
                                  onChange={(e) => updateContent(slide.id, content.id, e.target.value)}
                                  rows={3}
                                />
                              )}
                              
                              {content.type === 'image' && (
                                <div>
                                  <Input 
                                    value={content.content} 
                                    onChange={(e) => updateContent(slide.id, content.id, e.target.value)}
                                    placeholder="Image URL"
                                    className="mb-2"
                                  />
                                  {content.content && (
                                    <div className="mt-2 relative h-40 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
                                      <img 
                                        src={content.content} 
                                        alt="Slide content" 
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {content.type === 'bullets' && content.bulletPoints && (
                                <div className="space-y-2">
                                  {content.bulletPoints.map((point, pointIndex) => (
                                    <div key={pointIndex} className="flex items-center">
                                      <div className="w-2 h-2 bg-[#39FF14] rounded-full mr-2 flex-shrink-0"></div>
                                      <Input 
                                        value={point} 
                                        onChange={(e) => updateBulletPoint(slide.id, content.id, pointIndex, e.target.value)}
                                        className="flex-grow"
                                      />
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => removeBulletPoint(slide.id, content.id, pointIndex)}
                                        className="ml-1"
                                      >
                                        <X className="h-4 w-4 text-slate-400 hover:text-red-400" />
                                      </Button>
                                    </div>
                                  ))}
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => addBulletPoint(slide.id, content.id)}
                                    className="mt-2"
                                  >
                                    <PlusCircle className="h-4 w-4 mr-1" /> Add Bullet
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => addContent(slide.id, 'heading')}
                            >
                              Add Heading
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => addContent(slide.id, 'text')}
                            >
                              Add Text
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => addContent(slide.id, 'bullets')}
                            >
                              Add Bullets
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => addContent(slide.id, 'image')}
                            >
                              Add Image
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notes">
                        <div>
                          <label className="block text-sm mb-1">Speaker Notes</label>
                          <Textarea 
                            value={slide.notes} 
                            onChange={(e) => updateNotes(slide.id, e.target.value)}
                            placeholder="Add notes for the presenter"
                            rows={5}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {isAddingSlide && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Add New Slide</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Title</label>
                    <Input 
                      value={newSlide.title} 
                      onChange={(e) => setNewSlide({...newSlide, title: e.target.value})}
                      placeholder="Slide title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Initial Notes (Optional)</label>
                    <Textarea 
                      value={newSlide.notes} 
                      onChange={(e) => setNewSlide({...newSlide, notes: e.target.value})}
                      placeholder="Add initial speaker notes"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingSlide(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddSlide}
                      className="bg-[#39FF14] hover:bg-[#32E512] text-black"
                    >
                      Add Slide
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
