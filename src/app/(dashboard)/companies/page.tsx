import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { CompanyCard } from "@/components/company/CompanyCard";
import { mockCompanies } from '@/lib/mock-data';
import { Company } from '@/lib/types';

export default function CompaniesPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Key Companies</h1>
        <p className="text-gray-600">
          Manage and track your key accounts and opportunities
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search companies..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Link
          href="/companies/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Company</span>
        </Link>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompanies.map((company: Company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
