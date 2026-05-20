"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { GlassCard } from "@/components/ui/GlassCard";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("An error occurred during Google sign-in.");
      setIsLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password: password || "demo-pass",
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        setError("Invalid credentials or authentication failed.");
        setIsLoading(false);
      } else if (res?.url) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred during login.");
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        email: "demo@coachme.com",
        password: "demo",
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        setError("Could not launch demo session.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Failed to initialize demo session.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <TopAppBar isLoggedIn={false} />
      
      <main className="flex-grow flex items-center justify-center px-gutter py-12 relative overflow-hidden min-h-screen">
        {/* Background Graphic Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Login Card */}
        <GlassCard className="w-full max-w-md p-8 md:p-10 relative z-10 transition-transform duration-500 hover:scale-[1.01]">
          <div className="text-center mb-8">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-2">Welcome Back</h1>
            <p className="font-body-base text-body-base text-on-surface-variant">Continue your high-performance journey.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container/20 border border-error/30 rounded-lg text-error text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-4 mb-6">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 hover:neon-glow-primary disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 group shadow-lg cursor-pointer"
            >
              <img alt="Google" className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJWeiuF-tLYYlbAaSMIDBsqZhB7eEwQvl4sNVU_kIJiqAs9o_gTDVhXqI6dMYxBtj7LorHzf_2VYBtqAF34ZaXX-kTnR6SfJxnBqP_1B3mUX9-RdUXoxHOC-SX6h2Gy5JRupv-3qlTSzj433VeTDdEtRRhYd2YmS3kT64ViEkUmgajePKZ3E9rFeyLr5npJ_9B4pgU8Fgajwi7wrf7aOnxjuOjzwE0Is6hiUDu9PBJcuTXGCKVc6cKGTLiK97NXvjGJve_8sDxu-A"/>
              <span className="font-body-base text-body-base text-on-surface font-semibold">Sign in with Google</span>
            </button>

            <button 
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-gradient-to-r from-primary/10 to-secondary-container/10 hover:from-primary/20 hover:to-secondary-container/20 rounded-lg border border-primary/30 hover:border-primary/80 hover:neon-glow-primary disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 group shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">bolt</span>
              <span className="font-body-base text-body-base text-primary font-semibold">Instant Demo Login</span>
            </button>
          </div>  

          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="px-4 font-label-sm text-label-sm text-outline-variant">OR EMAIL IDENTITY</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <form onSubmit={handleCredentialsLogin} className="space-y-4 mb-6">
            <div>
              <label className="text-label-sm text-on-surface-variant mb-1 block uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full bg-surface-container/50 border border-white/10 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary disabled:opacity-50" 
                placeholder="developer@coachme.com" 
                required 
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-semibold shadow-lg hover:neon-glow-primary disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-all cursor-pointer"
            >
              {isLoading ? "Authenticating..." : "Connect Session"}
            </button>
          </form>
          
          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="px-4 font-label-sm text-label-sm text-outline-variant">OR BIOMETRIC</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>
          
          <div className="flex justify-center gap-6">
            <button className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-primary hover:bg-white/5 transition-all active:scale-90 border border-primary/20" title="Biometric Login" type="button">
              <span className="material-symbols-outlined text-[32px]">fingerprint</span>
            </button>
            <button className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-primary hover:bg-white/5 transition-all active:scale-90 border border-primary/20" title="Face ID" type="button">
              <span className="material-symbols-outlined text-[32px]">face</span>
            </button>
          </div>
          
          <p className="mt-10 text-center font-body-base text-body-base text-on-surface-variant">
            Don't have an account? <Link className="text-secondary hover:underline underline-offset-4 font-semibold" href="/signup">Join the Elite</Link>
          </p>
        </GlassCard>
      </main>
    </>
  );
}

