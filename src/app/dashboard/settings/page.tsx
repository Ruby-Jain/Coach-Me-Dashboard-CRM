"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("Ruby Jain");
  const [email, setEmail] = useState("ruby@coachme.crm");
  const [location, setLocation] = useState("Pune, India");
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Load settings on mount to avoid hydration mismatch
  useEffect(() => {
    setDisplayName(localStorage.getItem("profile_name") || "Ruby Jain");
    setEmail(localStorage.getItem("profile_email") || "ruby@coachme.crm");
    setLocation(localStorage.getItem("profile_location") || "Pune, India");
    
    const theme = localStorage.getItem("theme") || "dark";
    setDarkMode(theme === "dark");
    
    setEmailNotifications(localStorage.getItem("preferences_email_notifications") !== "false");
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("profile_name", displayName);
    localStorage.setItem("profile_email", email);
    localStorage.setItem("profile_location", location);
    
    // Dispatch custom event to notify other components (like Sidebar)
    window.dispatchEvent(new Event("profileUpdate"));
    
    showToast("Profile settings saved successfully!");
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    const theme = newDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    
    if (newDarkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    
    showToast(`Switched to ${newDarkMode ? "Dark" : "Light"} theme.`);
  };

  const handleToggleEmailNotifications = () => {
    const newEmailNotifications = !emailNotifications;
    setEmailNotifications(newEmailNotifications);
    
    localStorage.setItem("preferences_email_notifications", String(newEmailNotifications));
    showToast(
      newEmailNotifications 
        ? "Email notifications enabled." 
        : "Email notifications disabled."
    );
  };

  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto three-d-perspective py-8 relative animate-fade-in">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-20 right-6 z-[100] px-6 py-4 rounded-xl border backdrop-blur-xl shadow-2xl animate-fade-in flex items-center gap-3 ${
          notification.type === "success" 
            ? "bg-primary/10 border-primary/30 text-primary shadow-[0_0_20px_rgba(1,245,160,0.2)]" 
            : "bg-error-container/20 border-error/30 text-error shadow-[0_0_20px_rgba(255,82,82,0.2)]"
        }`}>
          <span className="material-symbols-outlined">{notification.type === "success" ? "check_circle" : "error"}</span>
          <span className="font-body-base text-sm font-semibold">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-85 cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      <div className="flex flex-col mb-8">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Configuration</span>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Platform Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Profile Settings Card */}
        <GlassCard className="p-8" glow="primary">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Profile Settings</h3>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Display Name</label>
              <input 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" 
                required
              />
            </div>
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" 
                required
              />
            </div>
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Location</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary" 
                required
              />
            </div>
            <button 
              type="submit" 
              className="mt-4 px-6 py-3 rounded-xl bg-primary/20 text-primary border border-primary/30 font-bold hover:bg-primary/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Changes
            </button>
          </form>
        </GlassCard>
        
        {/* Preferences Settings Card */}
        <GlassCard className="p-8" glow="tertiary">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Preferences</h3>
          <div className="space-y-6">
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-on-surface font-semibold">Dark Mode</h4>
                <p className="text-on-surface-variant text-sm">Enable deep void dark theme</p>
              </div>
              <div 
                onClick={handleToggleDarkMode}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${
                  darkMode 
                    ? "bg-primary shadow-[0_0_10px_rgba(1,245,160,0.4)]" 
                    : "bg-white/10 border border-white/10"
                }`}
              >
                <div className={`w-5 h-5 bg-black rounded-full absolute top-0.5 border transition-all duration-300 ${
                  darkMode 
                    ? "left-[25px] border-primary" 
                    : "left-0.5 border-outline-variant"
                }`}></div>
              </div>
            </div>

            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-on-surface font-semibold">Email Notifications</h4>
                <p className="text-on-surface-variant text-sm">Receive alerts for new sessions</p>
              </div>
              <div 
                onClick={handleToggleEmailNotifications}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${
                  emailNotifications 
                    ? "bg-primary shadow-[0_0_10px_rgba(1,245,160,0.4)]" 
                    : "bg-white/10 border border-white/10"
                }`}
              >
                <div className={`w-5 h-5 bg-black rounded-full absolute top-0.5 border transition-all duration-300 ${
                  emailNotifications 
                    ? "left-[25px] border-primary" 
                    : "left-0.5 border-outline-variant"
                }`}></div>
              </div>
            </div>

          </div>
        </GlassCard>
      </div>
    </main>
  );
}
