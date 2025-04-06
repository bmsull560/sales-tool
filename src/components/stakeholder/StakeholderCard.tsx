import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Users, Target, ThumbsUp, ChevronRight, Star, Shield, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface StakeholderCardProps {
  id: string;
  name: string;
  title: string;
  department?: string;
  influence: number;
  interest: number;
  disposition?: string;
  tags?: string[];
  selected?: boolean;
  onClick?: () => void;
}

export function StakeholderCard({ 
  id,
  name,
  title,
  department,
  influence,
  interest,
  disposition,
  tags,
  selected = false,
  onClick 
}: StakeholderCardProps) {
  // Role indicator based on influence and interest
  const getStakeholderRole = () => {
    if (influence >= 80 && interest >= 70) return { icon: <Star className="h-4 w-4" />, label: "Decision Maker" };
    if (influence >= 70) return { icon: <Shield className="h-4 w-4" />, label: "Executive" };
    if (interest >= 80) return { icon: <Award className="h-4 w-4" />, label: "Champion" };
    if (influence >= 60 && interest >= 50) return { icon: <Target className="h-4 w-4" />, label: "Technical Evaluator" };
    return { icon: <User className="h-4 w-4" />, label: "Contact" };
  };

  const getDispositionIcon = (disposition?: string) => {
    switch (disposition?.toLowerCase()) {
      case "champion":
        return <ThumbsUp className="h-4 w-4 text-emerald-500" />;
      case "neutral":
        return <Target className="h-4 w-4 text-amber-500" />;
      case "blocker":
        return <ThumbsUp className="h-4 w-4 rotate-180 text-red-500" />;
      default:
        return null;
    }
  };

  // Dynamic styles for influence meter
  const influenceMeterWidth = `${influence}%`;
  const influenceMeterColor = influence >= 75 ? "bg-gradient-to-r from-red-500 to-red-400" : 
                              influence >= 50 ? "bg-gradient-to-r from-amber-500 to-amber-400" : 
                              "bg-gradient-to-r from-blue-500 to-blue-400";

  // Dynamic styles for interest meter
  const interestMeterWidth = `${interest}%`;
  const interestMeterColor = interest >= 75 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : 
                             interest >= 50 ? "bg-gradient-to-r from-green-500 to-green-400" : 
                             "bg-gradient-to-r from-teal-500 to-teal-400";

  const role = getStakeholderRole();

  return (
    <Card 
      className={cn(
        "relative overflow-hidden w-full transition-all duration-300 border border-slate-200 dark:border-slate-800",
        "dark:bg-slate-950 hover:shadow-lg dark:shadow-slate-900/30",
        "group cursor-pointer",
        selected && "ring-2 ring-[#39FF14] shadow-md shadow-[#39FF14]/10"
      )}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={selected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Top accent bar that indicates influence */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800">
        <div 
          className={cn("h-full", influenceMeterColor)} 
          style={{ width: influenceMeterWidth }}
          aria-hidden="true"
        />
      </div>

      <CardHeader className="pb-2 pt-5">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
            {name}
            {disposition && (
              <span 
                className="ml-1" 
                title={`Disposition: ${disposition}`}
              >
                {getDispositionIcon(disposition)}
              </span>
            )}
          </CardTitle>
          <ChevronRight className="h-5 w-5 text-slate-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 dark:text-slate-500" />
        </div>
      </CardHeader>

      <CardContent className="pb-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
              <User className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate font-medium">{title}</span>
            </div>
            
            {department && (
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{department}</span>
              </div>
            )}

            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 pt-1">
              {role.icon}
              <span className="ml-2 font-medium text-xs uppercase tracking-wider">{role.label}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-700 dark:text-slate-300">Influence</span>
                <span className="font-semibold tabular-nums">{influence}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800">
                <div 
                  className={cn("h-full rounded-full", influenceMeterColor)} 
                  style={{ width: influenceMeterWidth }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-700 dark:text-slate-300">Interest</span>
                <span className="font-semibold tabular-nums">{interest}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800">
                <div 
                  className={cn("h-full rounded-full", interestMeterColor)} 
                  style={{ width: interestMeterWidth }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs py-0 h-5 px-1.5 bg-transparent border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute inset-0 border-2 border-[#39FF14] rounded-lg pointer-events-none" aria-hidden="true" />
      )}
    </Card>
  );
}

export default StakeholderCard;