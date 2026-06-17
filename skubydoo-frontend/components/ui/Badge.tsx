"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "danger" | "success" | "default";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    gold: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20",
    danger: "bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/20",
    success: "bg-[#00D26A]/10 text-[#00D26A] border-[#00D26A]/20",
    default: "bg-white/5 text-[#B0B0B0] border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider uppercase border rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
