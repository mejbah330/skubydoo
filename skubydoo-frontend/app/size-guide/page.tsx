"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { GoldParticles } from "@/components/effects/GoldParticles";

const GUIDE = [
  { size: "S", chest: "38\"", length: "28\"", shoulder: "17\"" },
  { size: "M", chest: "40\"", length: "29\"", shoulder: "18\"" },
  { size: "L", chest: "42\"", length: "30\"", shoulder: "19\"" },
  { size: "XL", chest: "44\"", length: "31\"", shoulder: "20\"" },
  { size: "XXL", chest: "46\"", length: "32\"", shoulder: "21\"" },
];

export default function SizeGuidePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 py-20"
    >
      <GoldParticles count={15} />
      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-[#B0B0B0] hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back
        </Link>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display mb-8">
          SIZE <span className="gold-text">GUIDE</span>
        </h1>

        <Card className="overflow-x-auto p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-[#D4AF37] uppercase tracking-wider text-xs">Size</th>
                <th className="text-left py-3 text-[#D4AF37] uppercase tracking-wider text-xs">Chest</th>
                <th className="text-left py-3 text-[#D4AF37] uppercase tracking-wider text-xs">Length</th>
                <th className="text-left py-3 text-[#D4AF37] uppercase tracking-wider text-xs">Shoulder</th>
              </tr>
            </thead>
            <tbody>
              {GUIDE.map((row) => (
                <tr key={row.size} className="border-b border-white/5">
                  <td className="py-3 font-bold">{row.size}</td>
                  <td className="py-3">{row.chest}</td>
                  <td className="py-3">{row.length}</td>
                  <td className="py-3">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <p className="mt-6 text-xs text-[#B0B0B0]">
          All measurements are in inches. Our tees fit oversized. Size down for a regular fit.
        </p>
      </div>
    </motion.div>
  );
}
