import { ArrowLeft, Building2, Globe, MapPin, Users, DollarSign, TrendingUp, Briefcase, Edit, Trash2, UserPlus } from "lucide-react";
import Link from "next/link";
import { mockCompanies, mockIndustryData, mockPersonas } from "@/lib/mock-data";
import { notFound } from "next/navigation";

interface CompanyDetailPageProps {
  params: {
    id: string;
  };
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const company = mockCompanies.find(c => c.id === params.id);
  
  if (!company) {
    notFound();
  }
  
  const industryData = mockIndustryData[company.industry];
  const companyPersonas = mockPersonas[company.id] || [];
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Companies</span>
          </Link>
          <h1 className="text-3xl font-bold mt-2">{company.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded-full ${getStageBadgeClass(company.stage)}`}>
              {formatStage(company.stage)}
            </span>
            <span className="text-slate-500">{company.industry}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link
            href={`/companies/${company.id}/edit`}
            className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </Link>
          <button className="inline-flex items-center gap-2 px-3 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors">
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold">Company Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500">Website</h3>
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {company.website}
                </a>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Headquarters</h3>
                <p>{company.headquarters}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Industry</h3>
                <p>{company.industry}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Company Size</h3>
                <p>{company.size}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Annual Revenue</h3>
                <p>{company.revenue}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Funding</h3>
                <p>{company.funding}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Company Stage</h3>
                <p>{formatStage(company.stage)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Key Stakeholders</h2>
              <Link
                href={`/personas/new?company=${company.id}`}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <UserPlus size={14} />
                <span>Add</span>
              </Link>
            </div>
            <div className="divide-y divide-slate-200">
              {companyPersonas.length > 0 ? (
                companyPersonas.map((persona) => (
                  <Link 
                    key={persona.id}
                    href={`/personas/${persona.id}`}
                    className="block p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{persona.name}</h3>
                        <p className="text-sm text-slate-500">{persona.title}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 h-fit rounded-full ${getRoleBadgeClass(persona.role)}`}>
                        {formatRole(persona.role)}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">
                  <p>No stakeholders added yet</p>
                </div>
              )}
            </div>
            {companyPersonas.length > 0 && (
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                <Link
                  href={`/personas?company=${company.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all stakeholders
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold">Industry Context</h2>
            </div>
            <div className="p-6">
              {industryData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Industry Trends</h3>
                    <ul className="space-y-2">
                      {industryData.trends.map((trend, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                          <span>{trend}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Industry Pressures</h3>
                    <ul className="space-y-2">
                      {industryData.pressures.map((pressure, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></span>
                          <span>{pressure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Compliance Requirements</h3>
                    <ul className="space-y-2">
                      {industryData.compliance.map((compliance, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></span>
                          <span>{compliance}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Disruption Factors</h3>
                    <ul className="space-y-2">
                      {industryData.disruption.map((disruption, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></span>
                          <span>{disruption}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500">
                  <p>No industry data available</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <span className="text-sm text-slate-500">Last 30 days</span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Building2 size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Company profile</span> was updated
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{formatDate(company.updated_at)}</p>
                  </div>
                </div>
                
                {companyPersonas.length > 0 && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Users size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{companyPersonas[0].name}</span> was added as a stakeholder
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{formatDate(companyPersonas[0].created_at)}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Company</span> was created
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{formatDate(company.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getStageBadgeClass(stage: string): string {
  switch (stage) {
    case 'startup':
      return 'bg-purple-100 text-purple-800';
    case 'growth':
      return 'bg-green-100 text-green-800';
    case 'enterprise':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}

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

function formatStage(stage: string): string {
  return stage.charAt(0).toUpperCase() + stage.slice(1);
}

function formatRole(role: string): string {
  return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
}
