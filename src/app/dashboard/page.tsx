"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function DashboardPage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNewSessionOpen, setIsNewSessionOpen] = useState(false);
  const [sessionDate, setSessionDate] = useState("");

  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto three-d-perspective py-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Global Mentorship Pulse</span>
          <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Coach Overview</h2>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="px-6 py-2 rounded-full glass-panel font-label-sm text-label-sm text-primary flex items-center gap-2 hover:bg-white/5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              THIS MONTH
              <span className="material-symbols-outlined text-sm ml-1 transition-transform" style={{ transform: isCalendarOpen ? 'rotate(180deg)' : 'rotate(0)' }}>expand_more</span>
            </button>
            
            {/* Calendar Dropdown */}
            {isCalendarOpen && (
              <div className="absolute top-full mt-2 w-48 right-0 glass-panel rounded-xl py-2 z-20 animate-fade-in shadow-2xl border border-white/10">
                <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-on-surface-variant hover:text-primary transition-colors text-sm">THIS WEEK</button>
                <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary transition-colors text-sm">THIS MONTH</button>
                <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-on-surface-variant hover:text-primary transition-colors text-sm">LAST MONTH</button>
                <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-on-surface-variant hover:text-primary transition-colors text-sm">THIS YEAR</button>
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsNewSessionOpen(true)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-tertiary font-label-sm text-label-sm text-on-primary flex items-center gap-2 shadow-[0_0_15px_rgba(164,230,255,0.4)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            NEW SESSION
          </button>
        </div>
      </div>

      {/* New Session Modal */}
      {isNewSessionOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsNewSessionOpen(false)}></div>
          <GlassCard className="relative w-full max-w-md p-8 animate-fade-in">
            <button 
              onClick={() => setIsNewSessionOpen(false)}
              className="absolute top-4 right-4 text-outline hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Schedule New Session</h3>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsNewSessionOpen(false); }}>
              <div>
                <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Client Name</label>
                <input type="text" className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" placeholder="Enter client name" required />
              </div>
              <div>
                <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Session Type</label>
                <select className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary appearance-none">
                  <option>Career Transition</option>
                  <option>Leadership Skills</option>
                  <option>Mindset Coaching</option>
                </select>
              </div>
              <div>
                <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" 
                  style={{ colorScheme: 'dark' }}
                  required 
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsNewSessionOpen(false)}
                  className="px-6 py-3 rounded-xl font-label-sm hover:bg-white/5 transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary-container text-on-primary font-label-sm shadow-[0_0_15px_rgba(1,245,160,0.3)] active:scale-95 transition-all"
                >
                  SCHEDULE
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
        {/* Active Clients Card */}
        <GlassCard className="three-d-card group p-6" glow="primary">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary">groups</span>
            </div>
            <span className="text-secondary font-label-sm text-label-sm bg-secondary/10 px-2 py-1 rounded">+8.2%</span>
          </div>
          <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Active Clients</h3>
          <div className="font-display-lg-mobile text-display-lg-mobile md:font-headline-md md:text-headline-md text-on-background">42</div>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[84%] shadow-[0_0_8px_rgba(164,230,255,1)]"></div>
          </div>
        </GlassCard>

        {/* Session Hours Card */}
        <GlassCard className="three-d-card group p-6" glow="tertiary">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center border border-tertiary/20">
              <span className="material-symbols-outlined text-tertiary">timer</span>
            </div>
            <span className="text-secondary font-label-sm text-label-sm bg-secondary/10 px-2 py-1 rounded">+15.4%</span>
          </div>
          <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Session Hours</h3>
          <div className="font-display-lg-mobile text-display-lg-mobile md:font-headline-md md:text-headline-md text-on-background">156.5</div>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-tertiary w-[65%] shadow-[0_0_8px_rgba(233,169,255,1)]"></div>
          </div>
        </GlassCard>

        {/* Success Rate Card */}
        <GlassCard className="three-d-card group p-6" glow="secondary">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <span className="material-symbols-outlined text-secondary">verified</span>
            </div>
            <span className="text-secondary font-label-sm text-label-sm bg-secondary/10 px-2 py-1 rounded">+1.2%</span>
          </div>
          <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Success Rate</h3>
          <div className="font-display-lg-mobile text-display-lg-mobile md:font-headline-md md:text-headline-md text-on-background">94.8%</div>
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-[95%] shadow-[0_0_8px_rgba(80,255,175,1)]"></div>
          </div>
        </GlassCard>
      </div>

      {/* 3D Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-20">
        {/* Central Chart */}
        <GlassCard className="lg:col-span-2 p-8 relative overflow-hidden h-[450px]">
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-background">Client Growth Progress</h3>
                <p className="font-body-base text-body-base text-on-surface-variant">Projected milestones &amp; attendance trends</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase">Active Sync</span>
              </div>
            </div>
            
            {/* Simulated 3D CSS Chart */}
            <div className="flex-grow flex items-end gap-2 px-4 pb-4">
              <div className="w-full h-full flex items-end justify-around">
                {[40, 60, 55, 85, 70, 95, 75].map((h, i) => (
                  <div key={i} className="relative w-8 bg-primary/20 rounded-t-lg group transition-all hover:bg-primary/40" style={{ height: `${h}%` }}>
                    <div className="absolute inset-0 bg-primary/40 border-t-2 border-primary shadow-[0_-5px_15px_rgba(164,230,255,0.4)]"></div>
                    {h > 80 && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container-highest px-2 py-1 rounded text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        GOAL REACHED
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Background grid/pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(164,230,255,0.15) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
        </GlassCard>

        {/* Mentorship Regional Insights */}
        <GlassCard className="p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-background mb-6">Client Distribution</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-secondary">explore</span>
                  </div>
                  <span className="font-body-base text-body-base text-on-surface">Career Transition</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary">42%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-tertiary">bolt</span>
                  </div>
                  <span className="font-body-base text-body-base text-on-surface">Leadership Skills</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary">31%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-primary">psychology</span>
                  </div>
                  <span className="font-body-base text-body-base text-on-surface">Mindset Coaching</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary">27%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">MENTOR EFFECTIVENESS</p>
            <div className="text-4xl font-bold animated-gradient-text">98.2</div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
