"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment,
          email: session?.user?.email || "anonymous@example.com",
          name: session?.user?.name || "CRM User",
        }),
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* DARK OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[55] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      ></div>

      {/* NAVIGATION DRAWER */}
      <aside 
        className={`h-full fixed left-0 top-0 z-[60] bg-background/95 backdrop-blur-3xl border-r border-white/10 shadow-2xl flex flex-col transition-all duration-300 overflow-x-hidden whitespace-nowrap ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 md:w-[80px] w-72'}`}
      >
        {/* Header/Profile Section */}
        <div className={`flex flex-col gap-4 border-b border-white/5 transition-all duration-300 ${isOpen ? 'p-6' : 'py-6 px-0 items-center'}`}>
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img 
                alt="Ruby Jain" 
                className={`rounded-full border-2 border-primary/30 object-cover shadow-[0_0_15px_rgba(164,230,255,0.2)] transition-all duration-300 ${isOpen ? 'w-14 h-14' : 'w-10 h-10'}`} 
                src="/profile.jpg"
              />
              <div className={`absolute bottom-0 right-0 bg-secondary-fixed border-2 border-background rounded-full transition-all duration-300 ${isOpen ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'}`}></div>
            </div>
            {isOpen && (
              <div className="flex flex-col animate-fade-in">
                <span className="font-headline-md text-headline-md text-on-surface">Ruby Jain</span>
                <span className="text-label-sm font-label-sm text-outline uppercase tracking-widest">Sales Director</span>
              </div>
            )}
          </div>
          {isOpen && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 self-start animate-fade-in">
              <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
              <span className="text-[11px] font-medium text-on-surface-variant uppercase tracking-tighter">Pune, India</span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col py-6 gap-1 overflow-y-auto overflow-x-hidden">
          <Link 
            href="/dashboard" 
            title={!isOpen ? "Main Dashboard" : undefined}
            className={`flex items-center py-4 gap-4 transition-all duration-200 group border-l-4 ${pathname === '/dashboard' ? 'bg-primary/10 text-primary border-primary neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-primary border-transparent'} ${isOpen ? 'px-6' : 'px-0 justify-center'}`}
          >
            <span className="material-symbols-outlined shrink-0" style={{ fontVariationSettings: pathname === '/dashboard' ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
            {isOpen && <span className="font-body-base text-body-base font-semibold tracking-wide animate-fade-in">Main Dashboard</span>}
          </Link>
          <Link 
            href="/dashboard/clients" 
            title={!isOpen ? "Client Pipeline" : undefined}
            className={`flex items-center py-4 gap-4 transition-all duration-200 group border-l-4 ${pathname.includes('/clients') ? 'bg-primary/10 text-primary border-primary neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-primary border-transparent'} ${isOpen ? 'px-6' : 'px-0 justify-center'}`}
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform shrink-0">account_tree</span>
            {isOpen && <span className="font-body-base text-body-base animate-fade-in">Client Pipeline</span>}
          </Link>
          <Link 
            href="/dashboard/performance" 
            title={!isOpen ? "Coach Performance" : undefined}
            className={`flex items-center py-4 gap-4 transition-all duration-200 group border-l-4 ${pathname.includes('/performance') ? 'bg-primary/10 text-primary border-primary neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-primary border-transparent'} ${isOpen ? 'px-6' : 'px-0 justify-center'}`}
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform shrink-0">military_tech</span>
            {isOpen && <span className="font-body-base text-body-base animate-fade-in">Coach Performance</span>}
          </Link>
          <Link 
            href="/dashboard/insights" 
            title={!isOpen ? "Client Insights" : undefined}
            className={`flex items-center py-4 gap-4 transition-all duration-200 group border-l-4 ${pathname.includes('/insights') ? 'bg-primary/10 text-primary border-primary neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-primary border-transparent'} ${isOpen ? 'px-6' : 'px-0 justify-center'}`}
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform shrink-0">hub</span>
            {isOpen && <span className="font-body-base text-body-base animate-fade-in">Client Insights</span>}
          </Link>
          <Link 
            href="/dashboard/manage-clients" 
            title={!isOpen ? "Manage Clients" : undefined}
            className={`flex items-center py-4 gap-4 transition-all duration-200 group border-l-4 ${pathname.includes('/manage-clients') ? 'bg-primary/10 text-primary border-primary neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-primary border-transparent'} ${isOpen ? 'px-6' : 'px-0 justify-center'}`}
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform shrink-0">group_add</span>
            {isOpen && <span className="font-body-base text-body-base animate-fade-in">Manage Clients</span>}
          </Link>
          <Link 
            href="/dashboard/reports" 
            title={!isOpen ? "Growth Reports" : undefined}
            className={`flex items-center py-4 gap-4 transition-all duration-200 group border-l-4 ${pathname.includes('/reports') ? 'bg-primary/10 text-primary border-primary neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-primary border-transparent'} ${isOpen ? 'px-6' : 'px-0 justify-center'}`}
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform shrink-0">query_stats</span>
            {isOpen && <span className="font-body-base text-body-base animate-fade-in">Growth Reports</span>}
          </Link>
          <Link 
            href="/dashboard/settings" 
            title={!isOpen ? "Settings" : undefined}
            className={`flex items-center py-4 gap-4 transition-all duration-200 group border-l-4 ${pathname.includes('/settings') ? 'bg-primary/10 text-primary border-primary neon-glow-primary' : 'text-on-surface-variant hover:bg-white/5 hover:text-primary border-transparent'} ${isOpen ? 'px-6' : 'px-0 justify-center'}`}
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform shrink-0">settings</span>
            {isOpen && <span className="font-body-base text-body-base animate-fade-in">Settings</span>}
          </Link>
          
          {/* FEEDBACK LINK */}
          <button 
            onClick={() => setIsFeedbackOpen(true)}
            title={!isOpen ? "Share Feedback" : undefined}
            className={`w-full flex items-center py-4 gap-4 transition-all duration-200 group border-l-4 text-on-surface-variant hover:bg-white/5 hover:text-primary border-transparent cursor-pointer ${isOpen ? 'px-6' : 'px-0 justify-center'}`}
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform shrink-0">rate_review</span>
            {isOpen && <span className="font-body-base text-body-base animate-fade-in">Share Feedback</span>}
          </button>
        </nav>

        {/* Bottom Section: Logout */}
        <div className={`border-t border-white/5 transition-all duration-300 ${isOpen ? 'p-6' : 'p-4'}`}>
          <button 
            onClick={handleLogout}
            title={!isOpen ? "Logout Session" : undefined} 
            className="flex items-center gap-4 py-3 rounded-xl bg-error-container/10 border border-error/20 text-error hover:bg-error/20 transition-all duration-300 active:scale-95 group px-4 w-full cursor-pointer"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform shrink-0">logout</span>
            {isOpen && <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold animate-fade-in">Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* FEEDBACK MODAL */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-surface-container/95 border border-white/10 p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setIsFeedbackOpen(false);
                setSubmitSuccess(false);
                setRating(5);
                setComment("");
              }}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {submitSuccess ? (
              <div className="text-center py-6">
                <span className="material-symbols-outlined text-[64px] text-primary mb-4 animate-bounce">check_circle</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Thank You!</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Your feedback has been submitted. A thanking confirmation email was sent to your registered address.
                </p>
                <button 
                  onClick={() => {
                    setIsFeedbackOpen(false);
                    setSubmitSuccess(false);
                    setRating(5);
                    setComment("");
                  }}
                  className="mt-6 px-6 py-2.5 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-all font-semibold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Share Feedback</h3>
                  <p className="text-xs text-on-surface-variant">We appreciate your suggestions to optimize Coach Me CRM.</p>
                </div>

                <div>
                  <label className="text-label-sm text-on-surface-variant mb-2 block uppercase tracking-widest">Rate your experience</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-[32px] focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                      >
                        <span className={star <= rating ? "text-primary material-symbols-outlined" : "text-white/20 material-symbols-outlined"}>
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Comments</label>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={4}
                    placeholder="Tell us what you like or what we can improve..."
                    className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary text-sm resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary-container text-on-primary font-bold shadow-[0_0_15px_rgba(1,245,160,0.2)] hover:neon-glow-primary transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Submit Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </>
  );
}

