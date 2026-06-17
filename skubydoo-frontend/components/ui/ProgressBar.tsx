"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  variant?: "gold" | "danger";
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  className,
  variant = "gold",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const gradients = {
    gold: "from-[#D4AF37] to-[#F4D37A]",
    danger: "from-[#FF4444] to-[#FF6666]",
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-xs text-[#B0B0B0] uppercase tracking-wider">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-xs text-[#D4AF37] font-semibold">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            gradients[variant]
          )}
        />
      </div>
    </div>
  );
}
