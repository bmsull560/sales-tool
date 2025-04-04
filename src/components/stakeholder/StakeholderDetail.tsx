import { User, Users, MessageSquare, Target, ThumbsUp, Link as LinkIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Stakeholder, Relationship } from '@/lib/types';

interface StakeholderDetailProps {
  stakeholder: Stakeholder;
  relationships: Relationship[];
  allStakeholders: Stakeholder[];
  onInfluenceChange: (value: number) => void;
  onInterestChange: (value: number) => void;
}

export function StakeholderDetail({
  stakeholder,
  relationships,
  allStakeholders,
  onInfluenceChange,
  onInterestChange
}: StakeholderDetailProps) {
  const reportsToStakeholder = stakeholder.reportsToId
    ? allStakeholders.find(s => s.id === stakeholder.reportsToId)
    : null;

  const directReports = allStakeholders.filter(s => s.reportsToId === stakeholder.id);

  const relatedStakeholders = relationships
    .filter(r => r.sourceStakeholderId === stakeholder.id || r.targetStakeholderId === stakeholder.id)
    .map(r => {
      const relatedId = r.sourceStakeholderId === stakeholder.id ? r.targetStakeholderId : r.sourceStakeholderId;
      const related = allStakeholders.find(s => s.id === relatedId);
      return related ? { ...related, relationshipType: r.type, strength: r.strength } : null;
    })
    .filter(Boolean) as (Stakeholder & { relationshipType: Relationship['type'], strength?: Relationship['strength'] })[];

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{stakeholder.name}</h2>
          <p className="text-gray-500">{stakeholder.title}</p>
          {stakeholder.department && (
            <p className="text-sm text-gray-600 mt-1">{stakeholder.department}</p>
          )}
        </div>
      </div>

      {/* Reporting Structure */}
      <div className="space-y-1 text-sm text-gray-600">
        {reportsToStakeholder && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>Reports to: <span className="font-medium">{reportsToStakeholder.name}</span> ({reportsToStakeholder.title})</span>
          </div>
        )}
        {directReports.length > 0 && (
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div>
              <span>Manages:</span>
              <ul className="list-disc list-inside ml-1">
                {directReports.map(report => (
                  <li key={report.id}>{report.name} ({report.title})</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Role & Responsibilities */}
      {stakeholder.role && (
        <Section title="Role">
          <p className="text-gray-600">{stakeholder.role}</p>
        </Section>
      )}
      {stakeholder.responsibilities && stakeholder.responsibilities.length > 0 && (
        <Section title="Key Responsibilities">
          <InfoList items={stakeholder.responsibilities} />
        </Section>
      )}

      {/* Pain Points & Objectives */}
      {stakeholder.painPoints && stakeholder.painPoints.length > 0 && (
        <Section title="Pain Points" icon={<ThumbsUp className="h-4 w-4 rotate-180 text-red-500" />}>
          <InfoList items={stakeholder.painPoints} />
        </Section>
      )}
      {stakeholder.objectives && stakeholder.objectives.length > 0 && (
        <Section title="Objectives" icon={<Target className="h-4 w-4 text-green-500" />}>
          <InfoList items={stakeholder.objectives} />
        </Section>
      )}

      {/* Key Quotes */}
      {stakeholder.keyQuotes && stakeholder.keyQuotes.length > 0 && (
        <Section title="Key Quotes" icon={<MessageSquare className="h-4 w-4 text-yellow-500" />}>
          <ul className="space-y-1 text-gray-600">
            {stakeholder.keyQuotes.map((quote, index) => (
              <li key={index} className="italic">" {quote} "</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Relationships */}
      {relatedStakeholders.length > 0 && (
        <Section title="Relationships" icon={<LinkIcon className="h-4 w-4 text-purple-500" />}>
          <ul className="space-y-1 text-gray-600 text-sm">
            {relatedStakeholders.map(related => (
              <li key={related.id}>
                <span className="font-medium">{related.name}</span> ({related.title}) - {formatRelationshipType(related.relationshipType)}{related.strength ? ` (${related.strength})` : ''}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Influence & Interest Sliders */}
      <div className="space-y-4 pt-4 border-t">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-900">Influence Level</label>
            <span className="text-sm text-gray-500">{stakeholder.influence}%</span>
          </div>
          <Slider
            value={[stakeholder.influence]}
            onValueChange={(value: number[]) => onInfluenceChange(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-900">Interest Level</label>
            <span className="text-sm text-gray-500">{stakeholder.interest}%</span>
          </div>
          <Slider
            value={[stakeholder.interest]}
            onValueChange={(value: number[]) => onInterestChange(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

// Helper components for structure
function Section({ title, icon, children }: { title: string, icon?: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside text-gray-600 space-y-1">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Helper function to format relationship types nicely
function formatRelationshipType(type: Relationship['type']): string {
  switch (type) {
    case 'reports_to': return 'Reports To';
    case 'works_with': return 'Works With';
    case 'influences': return 'Influences';
    default: return type;
  }
}
