import { UseCase, Feature, FeatureMapping as FeatureMappingType } from '@/types';

interface FeatureMappingProps {
  useCases: UseCase[];
  features: Feature[];
  mappings: FeatureMappingType[];
}

export function FeatureMapping({ useCases, features, mappings }: FeatureMappingProps) {
  if (!useCases.length || !features.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-slate-500">Add use cases and features to create mappings</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky top-0 left-0 z-10 bg-white p-4 border-b border-r border-slate-200 min-w-[200px]">
              Use Cases / Features
            </th>
            {features.map((feature) => (
              <th 
                key={feature.id} 
                className="sticky top-0 bg-white p-4 border-b border-slate-200 min-w-[150px] text-left"
              >
                <div className="font-semibold">{feature.name}</div>
                <div className="text-xs text-slate-500">{feature.category}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {useCases.map((useCase) => (
            <tr key={useCase.id}>
              <td className="sticky left-0 bg-white p-4 border-r border-b border-slate-200">
                <div className="font-semibold">{useCase.title}</div>
                <div className="text-xs text-slate-500 mt-1">
                  Priority: <span className={getPriorityClass(useCase.priority)}>{useCase.priority}</span>
                </div>
              </td>
              {features.map((feature) => {
                const mapping = mappings.find(
                  (m) => m.use_case_id === useCase.id && m.feature_id === feature.id
                );
                return (
                  <td 
                    key={`${useCase.id}-${feature.id}`} 
                    className="p-4 border-b border-slate-200"
                  >
                    {mapping ? (
                      <div className={`p-2 rounded ${getRelevanceClass(mapping.relevance)}`}>
                        <div className="font-medium">{mapping.relevance}</div>
                        {mapping.notes && (
                          <div className="text-xs mt-1">{mapping.notes}</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-300 text-center">—</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Helper functions
function getPriorityClass(priority: string): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 font-medium';
    case 'medium':
      return 'text-amber-600 font-medium';
    case 'low':
      return 'text-green-600 font-medium';
    default:
      return '';
  }
}

function getRelevanceClass(relevance: string): string {
  switch (relevance) {
    case 'primary':
      return 'bg-blue-100 text-blue-800';
    case 'secondary':
      return 'bg-purple-100 text-purple-800';
    case 'tertiary':
      return 'bg-slate-100 text-slate-800';
    default:
      return '';
  }
}
