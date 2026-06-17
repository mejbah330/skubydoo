"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { GoldParticles } from "@/components/effects/GoldParticles";

export default function VerifyCertificatePage() {
  const { cert } = useParams<{ cert: string }>();

  const isValid = cert?.startsWith("SD-");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[80vh] flex items-center justify-center px-4 py-20"
    >
      <GoldParticles count={20} />

      <Card glow className="max-w-md w-full text-center relative z-10 p-10">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6">
          {isValid ? (
            <CheckCircle className="w-8 h-8 text-[#00D26A]" />
          ) : (
            <XCircle className="w-8 h-8 text-[#FF4444]" />
          )}
        </div>

        <h2 className="text-xl font-bold mb-2">
          {isValid ? "Authentic Certificate" : "Invalid Certificate"}
        </h2>

        <p className="text-3xl font-black gold-text my-4 font-mono">
          {cert}
        </p>

        {isValid ? (
          <>
            <div className="glass rounded-xl p-4 mb-4 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#B0B0B0]">Product</span>
                <span className="text-white">Shadow King</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#B0B0B0]">Edition</span>
                <span className="text-white">SD-001</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#B0B0B0]">Issued</span>
                <span className="text-white">June 17, 2026</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#B0B0B0]">Status</span>
                <span className="text-[#00D26A]">Verified</span>
              </div>
            </div>
            <p className="text-xs text-[#B0B0B0]">
              This certificate guarantees the authenticity of a genuine ShubyDoo piece.
            </p>
          </>
        ) : (
          <p className="text-sm text-[#B0B0B0]">
            This certificate number was not found in our system. Please verify and try again.
          </p>
        )}
      </Card>
    </motion.div>
  );
}
