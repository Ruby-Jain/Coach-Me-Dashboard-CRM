import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "primary" | "secondary" | "tertiary" | "none";
}

export function GlassCard({
  children,
  className = "",
  glow = "none",
  ...props
}: GlassCardProps) {
  const glowClass =
    glow !== "none" ? `neon-glow-${glow}` : "";

  return (
    <div
      className={`glass-panel rounded-xl ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
