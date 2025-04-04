import { ValueProposition, Stakeholder } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Clock, TrendingUp, ShieldCheck, Users } from "lucide-react";

interface ValuePropositionDetailProps {
  valueProposition: ValueProposition;
  allStakeholders: Stakeholder[];
  onCustomerPriorityChange?: (value: number) => void;
  onSolutionStrengthChange?: (value: number) => void;
}

const impactIcons = {
  financial: <DollarSign className="h-5 w-5" />,
  operational: <TrendingUp className="h-5 w-5" />,
  strategic: <Clock className="h-5 w-5" />,
  risk: <ShieldCheck className="h-5 w-5" />,
};

const impactLabels = {
  financial: "Financial Impact",
  operational: "Operational Impact",
  strategic: "Strategic Impact",
  risk: "Risk Reduction",
};

const timeToValueLabels = {
  immediate: "Immediate (0-3 months)",
  "short-term": "Short-term (3-6 months)",
  "medium-term": "Medium-term (6-12 months)",
  "long-term": "Long-term (12+ months)",
};

export function ValuePropositionDetail({
  valueProposition,
  allStakeholders,
  onCustomerPriorityChange,
  onSolutionStrengthChange,
}: ValuePropositionDetailProps) {
  const {
    title,
    description,
    customerPriority,
    solutionStrength,
    impact,
    metrics,
    stakeholderIds,
    competitiveAdvantage,
    timeToValue,
  } = valueProposition;

  // Find stakeholders who care about this value proposition
  const relevantStakeholders = allStakeholders.filter((stakeholder) =>
    stakeholderIds.includes(stakeholder.id)
  );

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge className="ml-2" variant="outline">
            <div className="flex items-center gap-1">
              {impactIcons[impact]}
              <span>{impactLabels[impact]}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Priority and Strength Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Customer Priority</label>
              <span className="text-sm text-gray-500">{customerPriority}%</span>
            </div>
            <Slider
              defaultValue={[customerPriority]}
              max={100}
              step={1}
              onValueChange={(value) => onCustomerPriorityChange?.(value[0])}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Solution Strength</label>
              <span className="text-sm text-gray-500">{solutionStrength}%</span>
            </div>
            <Slider
              defaultValue={[solutionStrength]}
              max={100}
              step={1}
              onValueChange={(value) => onSolutionStrengthChange?.(value[0])}
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div>
          <h3 className="text-sm font-medium mb-2">Key Metrics</h3>
          <ul className="space-y-1">
            {metrics.map((metric, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span className="text-sm">{metric}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Competitive Advantage */}
        <div>
          <h3 className="text-sm font-medium mb-2">Competitive Advantage</h3>
          <p className="text-sm text-gray-700">{competitiveAdvantage}</p>
        </div>

        {/* Time to Value */}
        <div>
          <h3 className="text-sm font-medium mb-2">Time to Value</h3>
          <p className="text-sm text-gray-700">{timeToValueLabels[timeToValue]}</p>
        </div>

        {/* Relevant Stakeholders */}
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Relevant Stakeholders</span>
          </h3>
          {relevantStakeholders.length > 0 ? (
            <div className="space-y-2">
              {relevantStakeholders.map((stakeholder) => (
                <div
                  key={stakeholder.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="font-medium text-sm">{stakeholder.name}</p>
                    <p className="text-xs text-gray-500">{stakeholder.title}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      Influence: {stakeholder.influence}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Interest: {stakeholder.interest}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No stakeholders assigned yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
