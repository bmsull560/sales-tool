'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Users, 
  PieChart, 
  Presentation, 
  BarChart4,
  Settings,
  FileText,
  Layers,
  FlaskConical,
  BrainCircuit
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="h-full w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 shadow-xl fixed top-0 left-0 bottom-0">
      <div className="p-6 border-b border-slate-800 flex items-center">
        <BrainCircuit className="h-6 w-6 text-[#39FF14] mr-2" />
        <h1 className="text-xl font-bold">DemoGenius<span className="text-[#39FF14]">AI</span></h1>
      </div>
      
      <div className="p-4">
        <div className="bg-slate-800/50 rounded-lg p-3 mb-6">
          <div className="text-xs uppercase text-slate-400 font-medium tracking-wider mb-1">Active Project</div>
          <div className="text-sm font-medium truncate">Enterprise Cloud Platform</div>
          <div className="flex mt-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-slate-800">JD</div>
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs border-2 border-slate-800">AL</div>
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs border-2 border-slate-800">TK</div>
            </div>
            <div className="text-xs text-slate-400 ml-auto flex items-center">
              <Layers className="h-3 w-3 mr-1" />
              4 stages
            </div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="text-xs uppercase text-slate-400 font-medium tracking-wider px-3 py-2">Research</div>
        <SidebarItem href="/companies" icon={<Building2 size={18} />} label="Companies" active={pathname === '/companies'} />
        <SidebarItem href="/personas" icon={<Users size={18} />} label="Personas" active={pathname === '/personas'} />
        <SidebarItem href="/value-mapping" icon={<PieChart size={18} />} label="Value Mapping" active={pathname === '/value-mapping'} />
        
        <div className="text-xs uppercase text-slate-400 font-medium tracking-wider px-3 py-2 mt-4">Demos</div>
        <SidebarItem href="/demos" icon={<Presentation size={18} />} label="Demo Archives" active={pathname === '/demos'} />
        <SidebarItem 
          href="/demos/preparation" 
          icon={<FileText size={18} />} 
          label="Demo Preparation" 
          active={pathname === '/demos/preparation'}
          notification="New"
        />
        <SidebarItem href="/demos/calibrator" icon={<FlaskConical size={18} />} label="Script Calibrator" active={pathname === '/demos/calibrator'} />
        
        <div className="text-xs uppercase text-slate-400 font-medium tracking-wider px-3 py-2 mt-4">Evaluation</div>
        <SidebarItem href="/roi" icon={<BarChart4 size={18} />} label="ROI & Business Case" active={pathname === '/roi'} />
      </nav>
      
      <div className="p-3 border-t border-slate-800">
        <SidebarItem href="/settings" icon={<Settings size={18} />} label="Settings" active={pathname === '/settings'} />
      </div>
    </div>
  );
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  notification?: string;
}

function SidebarItem({ href, icon, label, active, notification }: SidebarItemProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center justify-between px-3 py-2 rounded-md transition-colors group",
        active 
          ? "bg-[#39FF14]/10 text-[#39FF14]" 
          : "hover:bg-slate-800/70 text-slate-300 hover:text-white"
      )}
    >
      <div className="flex items-center">
        <div className={cn(
          "mr-3",
          active ? "text-[#39FF14]" : "text-slate-400 group-hover:text-white"
        )}>
          {icon}
        </div>
        <span className="text-sm">{label}</span>
      </div>
      
      {notification && (
        <span className="px-1.5 py-0.5 rounded-md text-xs bg-[#39FF14]/20 text-[#39FF14] font-medium">
          {notification}
        </span>
      )}
    </Link>
  );
}
