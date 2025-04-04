import { mockCompanies, mockDemos } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { DemoList } from '@/components/demo/DemoList';

export default function DemosPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Demo Preparation Hub</h1>
        <p className="text-gray-600">
          Organize and prepare for upcoming demos, review past sessions, and track action items
        </p>
      </div>
      
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="preparation" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            In Prep
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-8">
          <DemoList 
            demos={mockDemos.filter(demo => new Date(demo.date) > new Date())}
            companies={mockCompanies}
            viewMode="preparation"
          />
        </TabsContent>

        <TabsContent value="preparation" className="space-y-8">
          <DemoList 
            demos={mockDemos.filter(demo => demo.stage === 'Discovery')}
            companies={mockCompanies}
            viewMode="preparation"
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-8">
          <DemoList 
            demos={mockDemos.filter(demo => new Date(demo.date) < new Date())}
            companies={mockCompanies}
            viewMode="review"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
