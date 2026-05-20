"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();
  
  if (!pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-2xl border-t border-white/5 rounded-t-xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-2">
      <Link href="/dashboard" className={`flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer ${pathname === "/dashboard" ? "text-primary-container drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]" : "text-outline hover:bg-white/5"}`}>
        <span className="material-symbols-outlined">dashboard</span>
        <span className="font-label-sm text-label-sm mt-1">Analytics</span>
      </Link>
      
      <Link href="/dashboard/clients" className={`flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer ${pathname.startsWith("/dashboard/clients") ? "text-primary-container drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]" : "text-outline hover:bg-white/5"}`}>
        <span className="material-symbols-outlined">group</span>
        <span className="font-label-sm text-label-sm mt-1">Clients</span>
      </Link>
      
      <Link href="/dashboard/performance" className={`flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer ${pathname.startsWith("/dashboard/performance") ? "text-primary-container drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]" : "text-outline hover:bg-white/5"}`}>
        <span className="material-symbols-outlined">calendar_today</span>
        <span className="font-label-sm text-label-sm mt-1">Sessions</span>
      </Link>
      
      <Link href="/dashboard/reports" className={`flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer ${pathname.startsWith("/dashboard/reports") ? "text-primary-container drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]" : "text-outline hover:bg-white/5"}`}>
        <span className="material-symbols-outlined">auto_graph</span>
        <span className="font-label-sm text-label-sm mt-1">Growth</span>
      </Link>
      
      <Link href="#" className="flex flex-col items-center justify-center text-outline hover:bg-white/5 transition-all duration-300 ease-out cursor-pointer">
        <span className="material-symbols-outlined">settings</span>
        <span className="font-label-sm text-label-sm mt-1">Settings</span>
      </Link>
    </footer>
  );
}
