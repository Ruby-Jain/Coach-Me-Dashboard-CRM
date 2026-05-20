"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TopAppBarProps {
  isLoggedIn?: boolean;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function TopAppBar({ isLoggedIn = false, onToggleSidebar, isSidebarOpen = false }: TopAppBarProps) {
  const pathname = usePathname();

  return (
    <header className={`fixed top-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 transition-all duration-300 ${isLoggedIn ? (isSidebarOpen ? 'md:w-[calc(100%-18rem)]' : 'md:w-[calc(100%-5rem)] w-full') : 'w-full'}`}>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button onClick={onToggleSidebar} className="flex items-center justify-center p-1 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-transform">
              {isSidebarOpen ? 'menu_open' : 'menu'}
            </span>
          </button>
        ) : (
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            hub
          </span>
        )}
        <Link href="/">
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-headline-md md:text-headline-md tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(164,230,255,0.5)]">
            COACH ME
          </h1>
        </Link>
      </div>

      {isLoggedIn ? (
        <>
          <div className="hidden md:flex gap-8 items-center">
            <nav className="flex gap-6">
              <Link
                className={`font-label-sm text-label-sm transition-colors duration-300 ${pathname === "/dashboard" ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
                href="/dashboard"
              >
                DASHBOARD
              </Link>
              <Link
                className={`font-label-sm text-label-sm transition-colors duration-300 ${pathname.startsWith("/dashboard/clients") ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
                href="/dashboard/clients"
              >
                CLIENTS
              </Link>
              <Link
                className={`font-label-sm text-label-sm transition-colors duration-300 ${pathname.startsWith("/dashboard/performance") ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
                href="/dashboard/performance"
              >
                SCHEDULE
              </Link>
            </nav>
            <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 overflow-hidden active:scale-95 transition-transform cursor-pointer">
              <img
                alt="Ruby Jain Profile"
                className="w-full h-full object-cover rounded-full"
                src="/profile.jpg"
              />
            </div>
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-primary">more_vert</span>
          </div>
        </>
      ) : (
        <div className="hidden md:flex gap-8">
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary-fixed transition-colors"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary-fixed transition-colors"
            href="#"
          >
            Methodology
          </Link>
          <Link
            className="font-label-sm text-label-sm text-primary hover:text-primary-fixed transition-colors ml-4 font-bold"
            href="/login"
          >
            LOGIN
          </Link>
        </div>
      )}
    </header>
  );
}
