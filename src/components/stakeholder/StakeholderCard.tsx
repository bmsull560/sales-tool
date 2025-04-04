import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Users, Target, ThumbsUp } from "lucide-react";
import { Stakeholder } from "@/lib/types";
import Link from "next/link";

interface StakeholderCardProps {
  stakeholder: Stakeholder;
  selected?: boolean;
  onClick?: () => void;
}

export function StakeholderCard({ stakeholder, selected = false, onClick }: StakeholderCardProps) {
  const getInfluenceColor = (influence: number) => {
    if (influence >= 80) return "bg-red-100 text-red-800";
    if (influence >= 60) return "bg-orange-100 text-orange-800";
    if (influence >= 40) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const getInterestColor = (interest: number) => {
    if (interest >= 80) return "bg-green-100 text-green-800";
    if (interest >= 60) return "bg-emerald-100 text-emerald-800";
    if (interest >= 40) return "bg-teal-100 text-teal-800";
    return "bg-slate-100 text-slate-800";
  };

  const getDispositionIcon = (disposition?: string) => {
    switch (disposition) {
      case "champion":
        return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case "neutral":
        return <Target className="h-4 w-4 text-amber-600" />;
      case "blocker":
        return <ThumbsUp className="h-4 w-4 rotate-180 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selected ? "ring-2 ring-blue-500 shadow-md" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {stakeholder.name}
            {stakeholder.disposition && (
              <span>{getDispositionIcon(stakeholder.disposition)}</span>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2" />
            <span>{stakeholder.title}</span>
          </div>
          
          {stakeholder.department && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{stakeholder.department}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className={getInfluenceColor(stakeholder.influence)}>
              Influence: {stakeholder.influence}%
            </Badge>
            <Badge variant="outline" className={getInterestColor(stakeholder.interest)}>
              Interest: {stakeholder.interest}%
            </Badge>
          </div>
          
          {stakeholder.tags && stakeholder.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {stakeholder.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default StakeholderCard;