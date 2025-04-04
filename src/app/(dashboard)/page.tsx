import { ArrowUpRight, Building2, Users, PieChart, Presentation, BarChart4 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Sales Engineer Software</h1>
        <p className="text-slate-500 mt-2">
          Your intelligent platform for deal preparation and execution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Companies" 
          description="Manage company profiles and industry research"
          icon={<Building2 size={24} />}
          href="/companies"
          count={0}
        />
        <DashboardCard 
          title="Personas" 
          description="Track stakeholders and relationship mapping"
          icon={<Users size={24} />}
          href="/personas"
          count={0}
        />
        <DashboardCard 
          title="Value Mapping" 
          description="Map customer needs to solution capabilities"
          icon={<PieChart size={24} />}
          href="/value-mapping"
          count={0}
        />
        <DashboardCard 
          title="Demo Archives" 
          description="Create compelling demo scripts and presentations"
          icon={<Presentation size={24} />}
          href="/demos"
          count={0}
        />
        <DashboardCard 
          title="ROI & Business Case" 
          description="Build ROI models and business justification"
          icon={<BarChart4 size={24} />}
          href="/roi"
          count={0}
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  count: number;
}

function DashboardCard({ title, description, icon, href, count }: DashboardCardProps) {
  return (
    <Link 
      href={href}
      className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          {icon}
        </div>
        <span className="text-slate-500 font-medium">{count}</span>
      </div>
      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-slate-500 mt-1">{description}</p>
      <div className="flex items-center text-blue-600 mt-4 text-sm font-medium">
        <span>View details</span>
        <ArrowUpRight size={16} className="ml-1" />
      </div>
    </Link>
  );
}
