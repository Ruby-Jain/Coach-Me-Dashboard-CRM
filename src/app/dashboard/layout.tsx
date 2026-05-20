"use client";

import React, { useState, useEffect } from "react";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatBot } from "@/components/ui/ChatBot";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  if (!mounted) return null; // Prevent hydration flash

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:pl-72' : 'md:pl-[80px]'}`}>
        <TopAppBar 
          isLoggedIn={true} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen} 
        />
        <div className="pt-24 pb-24 md:pb-8 min-h-screen px-4 md:px-0 relative">
          {children}
        </div>
      </div>
      
      <BottomNav />
      <ChatBot />
    </>
  );
}
