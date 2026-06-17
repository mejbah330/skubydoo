"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { Button } from "@/components/ui/Button";

export default function SecretPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (code.toLowerCase() === "midnight" || code === "SD-SECRET-001") {
      router.push("/drops");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <GoldParticles count={40} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]" />

      <div className="glass-gold rounded-3xl p-8 md:p-16 max-w-md w-full text-center relative z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6"
        >
          <Lock className="w-10 h-10 text-[#D4AF37]" />
        </motion.div>

        <h2 className="text-2xl font-black mb-2">SECRET COLLECTION</h2>
        <p className="text-sm text-[#B0B0B0] mb-8">
          This area is restricted. Enter the code to unlock exclusive content.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="Enter secret code"
            className={`w-full bg-white/5 border rounded-xl px-5 py-3 text-sm text-white text-center placeholder:text-[#B0B0B0] focus:outline-none transition-colors ${
              error ? "border-[#FF4444]" : "border-white/10 focus:border-[#D4AF37]/50"
            }`}
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-[#FF4444]"
            >
              Invalid code. Try again.
            </motion.p>
          )}

          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleUnlock}
            disabled={!code}
          >
            Unlock <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <p className="text-[10px] text-[#B0B0B0] mt-6">
          Hint: Found through QR codes, community rewards, and special links.
        </p>
      </div>
    </motion.div>
  );
}
