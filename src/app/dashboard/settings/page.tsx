"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function SettingsPage() {
  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto three-d-perspective py-8 animate-fade-in">
      <div className="flex flex-col mb-8">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Configuration</span>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Platform Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-8" glow="primary">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Display Name</label>
              <input type="text" defaultValue="Ruby Jain" className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Email Address</label>
              <input type="email" defaultValue="ruby@coachme.crm" className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Location</label>
              <input type="text" defaultValue="Pune, India" className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" />
            </div>
            <button className="mt-4 px-6 py-3 rounded-xl bg-primary/20 text-primary font-bold hover:bg-primary/30 transition-colors">
              Save Changes
            </button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-8" glow="tertiary">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Preferences</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-on-surface font-semibold">Dark Mode</h4>
                <p className="text-on-surface-variant text-sm">Enable deep void dark theme</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(1,245,160,0.4)]">
                <div className="w-5 h-5 bg-black rounded-full absolute right-0.5 top-0.5 border border-primary"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-on-surface font-semibold">Email Notifications</h4>
                <p className="text-on-surface-variant text-sm">Receive alerts for new sessions</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(1,245,160,0.4)]">
                <div className="w-5 h-5 bg-black rounded-full absolute right-0.5 top-0.5 border border-primary"></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
