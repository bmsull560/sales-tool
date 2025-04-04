import { mockCompanies, mockDemos, mockIndustryData, mockPersonas } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, TrendingUp, Target, History, MessageSquare } from 'lucide-react';

export default function DemoPreparationPage({ params }: { params: { id: string } }) {
  const demo = mockDemos.find(d => d.id === params.id);
  const company = mockCompanies.find(c => c.id === demo?.companyId);
  const industryData = company ? mockIndustryData[company.industry] : null;
  const personas = company ? mockPersonas[company.id] : [];

  if (!demo || !company) {
    return <div>Demo not found</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Demo Preparation: {demo.title}</h1>
          <p className="text-gray-600">
            {new Date(demo.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <span className={`
            px-3 py-1.5 rounded-full text-sm font-medium
            ${demo.type === 'Vision' ? 'bg-purple-100 text-purple-700' :
              demo.type === 'Value' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'}
          `}>
            {demo.type} Demo
          </span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {demo.stage}
          </span>
        </div>
      </div>

      {/* Research Tabs */}
      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-[800px]">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Industry
          </TabsTrigger>
          <TabsTrigger value="attendees" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Attendees
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Sales Context
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Notes
          </TabsTrigger>
        </TabsList>

        {/* Company Overview */}
        <TabsContent value="company" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Key information about {company.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Website</div>
                  <div className="text-sm">{company.website}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Headquarters</div>
                  <div className="text-sm">{company.headquarters}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Size</div>
                  <div className="text-sm">{company.size} employees</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Revenue</div>
                  <div className="text-sm">{company.revenue}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Funding</div>
                  <div className="text-sm">{company.funding}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Products & Competition</CardTitle>
                <CardDescription>Market positioning and competitors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Main Product</div>
                  <div className="text-sm">Enterprise Analytics Platform</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Target Market</div>
                  <div className="text-sm">Mid to Large Enterprises</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Key Competitors</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">Competitor A</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">Competitor B</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">Competitor C</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Industry Context */}
        <TabsContent value="industry" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Industry Trends</CardTitle>
                <CardDescription>Current market dynamics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industryData?.trends.map((trend, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span className="text-sm">{trend}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Challenges & Pressures</CardTitle>
                <CardDescription>Key industry challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industryData?.pressures.map((pressure, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span className="text-sm">{pressure}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Attendees */}
        <TabsContent value="attendees" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {demo.attendees.map((attendee) => {
              const personaData = personas.find(p => p.email === attendee.email);
              return (
                <Card key={attendee.id}>
                  <CardHeader>
                    <CardTitle>{attendee.name}</CardTitle>
                    <CardDescription>{attendee.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Role Level</div>
                      <div className="text-sm">{personaData?.level || 'Unknown'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Department</div>
                      <div className="text-sm">{personaData?.department || 'Unknown'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Key Interests</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {personaData?.interests.map((interest, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Pain Points</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {personaData?.painPoints.map((pain, i) => (
                          <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
                            {pain}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Sales Context */}
        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Progress</CardTitle>
                <CardDescription>Current status and next steps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Current Stage</div>
                  <div className="text-sm font-medium text-blue-600">{demo.stage}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Key Use Cases</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {demo.useCases.map((useCase) => (
                      <div key={useCase.id} className="w-full p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium mb-1">{useCase.name}</div>
                        <div className="text-sm text-gray-600">{useCase.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Opportunity Details</CardTitle>
                <CardDescription>Value and decision drivers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Primary Pain Points</div>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      Manual deployment processes causing delays
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      Lack of visibility into development bottlenecks
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Why Now?</div>
                  <div className="text-sm mt-2">
                    Current solution contract ending in Q3. Looking to modernize their development pipeline before next fiscal year.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Success Criteria</div>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      50% reduction in deployment time
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      Improved developer satisfaction scores
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Interaction History */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previous Interactions</CardTitle>
              <CardDescription>History of engagement with {company.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demo.id === "2" && (
                  <div className="border-l-2 border-blue-200 pl-4 ml-2">
                    <div className="text-sm text-gray-500">March 15, 2025</div>
                    <div className="font-medium mb-1">Initial Platform Overview</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Demonstrated core CI/CD capabilities. Strong interest in deployment automation features.
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        Positive Reception
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        Technical Focus
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes & Action Items */}
        <TabsContent value="notes" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Preparation Notes</CardTitle>
                <CardDescription>Key points to cover</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demo.actionItems?.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Summary</CardTitle>
                <CardDescription>Generated insights from previous interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 whitespace-pre-line">
                  {demo.aiSummary || 'No summary available yet.'}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
