import { Persona } from "@/types";
import { Mail, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StakeholderCardProps {
  persona: Persona;
  showCompany?: boolean;
}

export function StakeholderCard({ persona, showCompany }: StakeholderCardProps) {
  return (
    <Link
      href={`/personas/${persona.id}`}
      className="block bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full bg-slate-100 flex-shrink-0">
            {persona.avatar_url ? (
              <Image
                src={persona.avatar_url}
                alt={persona.name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-slate-400">
                {persona.name.charAt(0)}
              </div>
            )}
            {persona.role === 'decision_maker' && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Star size={12} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{persona.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{persona.title}</p>
            {showCompany && persona.company_name && (
              <p className="text-sm text-slate-500 mt-1">{persona.company_name}</p>
            )}
            <div className="flex items-center gap-3 mt-3">
              <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeClass(persona.role)}`}>
                {formatRole(persona.role)}
              </span>
              {persona.priority && (
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadgeClass(persona.priority)}`}>
                  {formatPriority(persona.priority)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2 text-sm">
          {persona.email && (
            <div className="flex items-center gap-2 text-slate-600">
              <Mail size={14} className="text-slate-400" />
              <span>{persona.email}</span>
            </div>
          )}
          {persona.phone && (
            <div className="flex items-center gap-2 text-slate-600">
              <Phone size={14} className="text-slate-400" />
              <span>{persona.phone}</span>
            </div>
          )}
        </div>
        
        {persona.notes && (
          <div className="mt-4 p-3 bg-slate-50 rounded-md text-sm text-slate-600">
            {persona.notes}
          </div>
        )}
      </div>
      
      {persona.last_contact && (
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          Last contacted {formatDate(persona.last_contact)}
        </div>
      )}
    </Link>
  );
}

// Helper functions
function getRoleBadgeClass(role: string): string {
  switch (role) {
    case 'decision_maker':
      return 'bg-blue-100 text-blue-800';
    case 'influencer':
      return 'bg-green-100 text-green-800';
    case 'user':
      return 'bg-purple-100 text-purple-800';
    case 'blocker':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}

function getPriorityBadgeClass(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}

function formatRole(role: string): string {
  return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatPriority(priority: string): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
}
