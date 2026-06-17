"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  children: React.ReactNode;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", magnetic = true, children, className, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer";

    const variants = {
      primary:
        "bg-white text-black hover:bg-gray-200 active:bg-gray-300",
      gold: "bg-[#D4AF37] text-black hover:bg-[#F4D37A] active:bg-[#D4AF37] gold-glow",
      outline:
        "border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] bg-transparent",
      ghost:
        "text-[#B0B0B0] hover:text-white bg-transparent",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs tracking-widest",
      md: "px-6 py-3 text-sm tracking-[0.2em]",
      lg: "px-10 py-4 text-base tracking-[0.3em]",
    };

    const Component = motion.button as typeof motion.button;

    return (
      <Component
        ref={ref as any}
        whileHover={magnetic ? { scale: 1.05 } : undefined}
        whileTap={magnetic ? { scale: 0.95 } : undefined}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
