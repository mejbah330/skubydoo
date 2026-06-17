"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { GoldParticles } from "@/components/effects/GoldParticles";

export default function TrackOrderPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[80vh] flex items-center justify-center px-4 py-20"
    >
      <GoldParticles count={20} />
      <Card glow className="max-w-md w-full text-center relative z-10 p-10">
        <h2 className="text-xl font-bold mb-6">Track Your Order</h2>
        <input
          placeholder="Enter order number (e.g. SD-...)"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white text-center placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#D4AF37]/50 transition-colors mb-4"
        />
        <button className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-bold text-sm tracking-wider uppercase hover:bg-[#F4D37A] transition-colors">
          Track
        </button>
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-[#B0B0B0] hover:text-white mt-6 transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to store
        </Link>
      </Card>
    </motion.div>
  );
}
