import React from "react";
import Link from "next/link";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { GlassCard } from "@/components/ui/GlassCard";

export default function WelcomePage() {
  return (
    <>
      <TopAppBar isLoggedIn={false} />
      
      <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-16">
        {/* 3D-Styled Atmospheric Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        </div>

        {/* Hero Canvas */}
        <section className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center gap-12 py-12">
          {/* Left Content: Branding & Glass Cards */}
          <div className="w-full md:w-1/2 flex flex-col gap-8 three-d-perspective">
            <div className="flex flex-col gap-4">
              <span className="text-secondary-fixed font-label-sm text-label-sm tracking-widest uppercase">Performance Evolution</span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-none">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary-container">Metrics.</span>
              </h1>
              <p className="text-on-surface-variant max-w-md font-body-base text-body-base">
                The elite command center for sales professionals. High-velocity 3D data visualization meets precision executive coaching.
              </p>
            </div>

            <div className="flex gap-4">
              {/* Primary Action */}
              <Link href="/signup">
                <button className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container font-headline-md text-headline-md transition-transform hover:scale-105 active:scale-95 neon-glow-primary">
                  Get Started
                  <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </button>
              </Link>
              {/* Secondary Action */}
              <Link href="/login">
                <button className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-on-surface font-headline-md text-headline-md hover:bg-white/5 transition-colors">
                  Log In
                </button>
              </Link>
            </div>

            {/* Status Glass Card */}
            <GlassCard className="mt-8 three-d-card p-6 max-w-xs space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-label-sm text-label-sm">ACTIVE NODES</span>
                <span className="flex h-2 w-2 rounded-full bg-secondary-container animate-pulse"></span>
              </div>
              <div className="font-data-point text-data-point text-secondary-fixed">84.2% Growth</div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container w-[84%] shadow-[0_0_10px_#01f5a0]"></div>
              </div>
            </GlassCard>
          </div>

          {/* Right Content: High-Impact 3D Visual Representation */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden glass-panel border border-white/10 three-d-card neon-glow-primary group">
              <img 
                alt="Futuristic Dashboard Concept" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPU2KVlPR5_VWFEWP5xaEJKOF3qbAlcxaQWxTCxgsLVh1tzZhZDY-BX0mL8rPAMUrNSjNVjRUo3nvFJ2nrPVY2Td8wlulVlVFuYTUECDz2Gqn3BHA5K_g5Xla9NuWuZQIJbPOPMNO2VfBja09h6vJCwc5eYu3flfWC53IIAwvYJolQl6lj9VosO00P0ld0LGEDKaoc4r1LxESKOXZno5x6Lyvo_1YQtKt5m8Frt6v1PTqWABLz9lUV5eGd2auRK3SKHzIwYumDEsY"
              />
              {/* Overlay Micro-UI */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-panel p-8 rounded-full border-primary/30 animate-pulse">
                  <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-primary-fixed font-headline-md text-headline-md">Interface 01-A</div>
                  <div className="text-on-surface-variant font-label-sm text-label-sm">SYNCHRONIZING DATA...</div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-secondary-container/20 text-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm border border-secondary-container/30">ONLINE</span>
                </div>
              </div>
            </div>

            {/* Floating Decorative Chips */}
            <div className="absolute -top-6 -right-6 glass-panel px-4 py-2 rounded-lg border-white/10 shadow-xl hidden lg:block">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                <span className="font-label-sm text-label-sm text-on-surface">AI Coach Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Feature Teaser */}
        <section className="w-full max-w-container-max px-margin-mobile md:px-margin-desktop py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card */}
            <div className="md:col-span-2 glass-panel p-8 rounded-2xl flex flex-col justify-between min-h-[320px] group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              <div className="z-10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">monitoring</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Predictive Performance</h3>
                <p className="text-on-surface-variant max-w-sm">AI-driven forecasting that anticipates market shifts before they happen. Stay three steps ahead.</p>
              </div>
              <div className="z-10 flex items-center gap-4 mt-8">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm">+24</div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-sm">person</span>
                  </div>
                </div>
                <span className="text-on-surface-variant font-label-sm text-label-sm">Trusted by Global Teams</span>
              </div>
            </div>

            {/* Small Card */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:border-secondary-container/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary-container">bolt</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Instant Feedback</h3>
                <p className="text-on-surface-variant">Real-time tactical coaching during live interactions.</p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/5">
                <a className="text-secondary-fixed font-label-sm text-label-sm flex items-center gap-2 group" href="#">
                  LEARN MORE <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Another Small Card */}
            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">security</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Neural Security</h3>
                <p className="text-on-surface-variant">Military-grade encryption for your most sensitive trade secrets.</p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/5 text-on-surface-variant font-label-sm text-label-sm">
                SECURE-STACK V4.2
              </div>
            </div>

            {/* Progress Visual Card */}
            <div className="md:col-span-2 glass-panel p-8 rounded-2xl overflow-hidden relative group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-4">
                  <h3 className="font-headline-md text-headline-md text-on-surface">Weekly Efficiency</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display-lg text-headline-md text-secondary-fixed">98.4</span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">OPTIMIZED</span>
                  </div>
                </div>
                <div className="flex items-end gap-2 h-24">
                  <div className="w-6 bg-primary-container/20 rounded-t-lg group-hover:h-12 transition-all duration-500 h-8"></div>
                  <div className="w-6 bg-primary-container/40 rounded-t-lg group-hover:h-20 transition-all duration-700 h-14"></div>
                  <div className="w-6 bg-primary-container/60 rounded-t-lg group-hover:h-24 transition-all duration-300 h-10"></div>
                  <div className="w-6 bg-secondary-container/80 rounded-t-lg group-hover:h-16 transition-all duration-1000 h-22 shadow-[0_0_15px_rgba(1,245,160,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden bg-surface-container/60 text-secondary-fixed font-label-sm text-label-sm fixed bottom-0 left-0 w-full z-50 rounded-t-xl backdrop-blur-xl border-t border-white/10 shadow-2xl flex justify-around items-center px-4 pb-4 pt-2">
        <Link href="/" className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 shadow-[0_0_15px_rgba(1,245,160,0.3)] transition-all duration-200 active:scale-90">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span>Welcome</span>
        </Link>
        <Link href="/signup" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all duration-200 active:scale-90">
          <span className="material-symbols-outlined">person_add</span>
          <span>Sign Up</span>
        </Link>
        <Link href="/login" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all duration-200 active:scale-90">
          <span className="material-symbols-outlined">login</span>
          <span>Login</span>
        </Link>
      </nav>
    </>
  );
}
