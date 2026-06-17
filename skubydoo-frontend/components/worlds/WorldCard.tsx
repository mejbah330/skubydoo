"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WorldCardProps {
  name: string;
  slug: string;
  description: string;
  accent: string;
  onClick?: () => void;
}

export function WorldCard({ name, slug, description, accent, onClick }: WorldCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      onClick={onClick}
      className="glass rounded-3xl p-8 cursor-pointer relative overflow-hidden group"
      style={{ borderColor: `${accent}20` }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accent}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center"
          style={{ background: `${accent}15` }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: accent }} />
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-wider font-display text-white group-hover:gold-text transition-all duration-500">
          {name}
        </h3>

        <p className="mt-3 text-sm text-[#B0B0B0] leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span
            className="text-xs tracking-[0.3em] uppercase font-semibold"
            style={{ color: accent }}
          >
            Explore World
          </span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: accent }}
          >
            →
          </motion.span>
        </div>
      </div>

      <div
        className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: accent }}
      />
    </motion.div>
  );
}
