'use client';

import React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { CardBase } from "@/components/ui/card-base";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex">
      {/* Sidebar - Part of flex layout, not fixed */}
      <div className="w-64 flex-shrink-0 h-screen overflow-y-auto hidden md:block bg-white dark:bg-slate-800 shadow-md">
        {/* Added h-screen, overflow-y-auto, background, and shadow for better visual structure */}
        <Sidebar />
      </div>
      
      {/* Main Content Area - Takes remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Content Container - Centered */} 
          <div className="w-full max-w-4xl mx-auto">
            <CardBase className="w-full p-6">
              {children}
            </CardBase>
          </div>
        </main>
      </div>
    </div>
  );
}
