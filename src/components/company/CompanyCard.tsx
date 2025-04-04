import { Company } from "@/lib/types";
import { Building2 } from "lucide-react";
import Link from "next/link";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link 
      href={`/companies/${company.id}`}
      className="block bg-white rounded-lg border hover:border-blue-500 transition-all overflow-hidden group"
    >
      <div className="p-6 space-y-4">
        {/* Icon and Title */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
        </div>

        {/* Description */}
        <div className="text-sm text-gray-600">
          <p>{company.size} employees • {company.revenue}</p>
          <p className="mt-1">{company.headquarters}</p>
        </div>

        {/* Stage Badge */}
        <div className="pt-2">
          <span className={`
            inline-flex px-2.5 py-1 rounded-full text-xs font-medium
            ${company.stage === 'startup' ? 'bg-purple-50 text-purple-700' :
              company.stage === 'growth' ? 'bg-blue-50 text-blue-700' :
              'bg-green-50 text-green-700'}
          `}>
            {company.stage.charAt(0).toUpperCase() + company.stage.slice(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
