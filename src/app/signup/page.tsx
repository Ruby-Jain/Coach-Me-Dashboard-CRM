"use client";

import React from "react";
import Link from "next/link";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { GlassCard } from "@/components/ui/GlassCard";

import { signIn } from "next-auth/react";

export default function SignupPage() {
  const handleGoogleSignup = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <>
      <TopAppBar isLoggedIn={false} />
      
      <main className="flex-grow flex items-center justify-center px-4 w-full max-w-lg mt-8 mb-24 mx-auto min-h-screen">
        {/* Main Signup Card */}
        <GlassCard className="w-full p-8 md:p-12 relative overflow-hidden group">
          {/* Decorative Accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <header className="mb-10 text-center md:text-left">
              <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-on-surface mb-2">Elevate Your Practice</h2>
              <p className="font-body-base text-body-base text-on-surface-variant">Join the command center for world-class executive coaching.</p>
            </header>

            {/* Social Logins */}
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <button 
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 hover:neon-glow-primary transition-all duration-300 group shadow-lg"
              >
                <img alt="Google" className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJWeiuF-tLYYlbAaSMIDBsqZhB7eEwQvl4sNVU_kIJiqAs9o_gTDVhXqI6dMYxBtj7LorHzf_2VYBtqAF34ZaXX-kTnR6SfJxnBqP_1B3mUX9-RdUXoxHOC-SX6h2Gy5JRupv-3qlTSzj433VeTDdEtRRhYd2YmS3kT64ViEkUmgajePKZ3E9rFeyLr5npJ_9B4pgU8Fgajwi7wrf7aOnxjuOjzwE0Is6hiUDu9PBJcuTXGCKVc6cKGTLiK97NXvjGJve_8sDxu-A"/>
                <span className="font-body-base text-body-base text-on-surface font-semibold">Sign up with Google</span>
              </button>
            </div>
            
            <p className="mt-8 text-center font-label-sm text-label-sm text-on-surface-variant">
              By proceeding, you agree to our <Link className="text-primary hover:underline" href="#">Service Protocols</Link> and <Link className="text-primary hover:underline" href="#">Data Sovereignty Policy</Link>.
            </p>
          </div>
        </GlassCard>
      </main>
    </>
  );
}
