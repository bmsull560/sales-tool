import Link from "next/link";
import { 
  Building2, 
  Users, 
  PieChart, 
  Presentation, 
  BarChart4,
  Settings
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-full flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">SE Software</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem href="/companies" icon={<Building2 size={20} />} label="Companies" />
        <SidebarItem href="/personas" icon={<Users size={20} />} label="Personas" />
        <SidebarItem href="/value-mapping" icon={<PieChart size={20} />} label="Value Mapping" />
        <SidebarItem href="/demos" icon={<Presentation size={20} />} label="Demo Storyboard" />
        <SidebarItem href="/roi" icon={<BarChart4 size={20} />} label="ROI & Business Case" />
      </nav>
      <div className="p-4 border-t border-slate-800">
        <SidebarItem href="/settings" icon={<Settings size={20} />} label="Settings" />
      </div>
    </div>
  );
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarItem({ href, icon, label }: SidebarItemProps) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
