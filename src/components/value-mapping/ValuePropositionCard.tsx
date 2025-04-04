import { ValueProposition } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, TrendingUp, ShieldCheck } from "lucide-react";

interface ValuePropositionCardProps {
  valueProposition: ValueProposition;
  onClick?: () => void;
  selected?: boolean;
}

const impactIcons = {
  financial: <DollarSign className="h-4 w-4" />,
  operational: <TrendingUp className="h-4 w-4" />,
  strategic: <Clock className="h-4 w-4" />,
  risk: <ShieldCheck className="h-4 w-4" />,
};

const timeToValueColors = {
  immediate: "bg-green-100 text-green-800",
  "short-term": "bg-emerald-100 text-emerald-800",
  "medium-term": "bg-blue-100 text-blue-800",
  "long-term": "bg-purple-100 text-purple-800",
};

export function ValuePropositionCard({ 
  valueProposition, 
  onClick, 
  selected = false 
}: ValuePropositionCardProps) {
  const { 
    title, 
    description, 
    customerPriority, 
    solutionStrength, 
    impact, 
    timeToValue 
  } = valueProposition;

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selected ? "ring-2 ring-blue-500 shadow-md" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex space-x-1">
            {impactIcons[impact]}
          </div>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">Customer Priority</p>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${customerPriority}%` }}
                />
              </div>
              <p className="text-xs text-right mt-1">{customerPriority}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Solution Strength</p>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${solutionStrength}%` }}
                />
              </div>
              <p className="text-xs text-right mt-1">{solutionStrength}%</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <Badge variant="outline" className={`${timeToValueColors[timeToValue]} border-0`}>
              {timeToValue.replace('-', ' ')}
            </Badge>
            
            <div className="text-xs text-gray-500">
              {valueProposition.metrics.length} metrics
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
