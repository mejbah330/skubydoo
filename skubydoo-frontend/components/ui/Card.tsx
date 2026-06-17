"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, glow = false, hover = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-500",
        glow && "gold-glow gold-glow-hover",
        hover && "cursor-pointer card-hover",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
