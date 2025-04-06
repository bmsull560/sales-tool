import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";

export function Header() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-20 w-full">
      <div className="container mx-auto h-full flex items-center justify-center px-4">
        <div className="max-w-4xl w-full flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu size={20} />
            </Button>
            <div className="relative w-64 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                id="global-search"
                name="global-search"
                placeholder="Search demos, personas, companies..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center mr-4">
              <Badge className="bg-gradient-to-r from-emerald-500 to-[#39FF14] text-black font-medium">
                Pro Account
              </Badge>
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
            </div>
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <User size={16} />
              </div>
              <div className="hidden md:block">
                <div className="font-medium text-sm">Sales Engineer</div>
                <div className="text-xs text-slate-500">Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
