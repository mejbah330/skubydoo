"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { Button } from "@/components/ui/Button";

export default function NextDropPage() {
  const dropDate = new Date("2026-06-30T20:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = dropDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <GoldParticles count={50} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]" />

        <div className="relative z-10 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-8"
          >
            The Next Era
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black tracking-tight font-display mb-8"
          >
            THE NEXT
            <br />
            <span className="gold-text">DROP</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 md:gap-8 mb-12"
          >
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="glass w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-2">
                  <span className="text-2xl md:text-4xl font-black text-[#D4AF37]">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#B0B0B0]">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#B0B0B0] mb-10 text-lg"
          >
            June 30, 2026 — 8:00 PM IST
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {notified ? (
              <div className="glass-gold rounded-2xl px-6 py-4 text-[#D4AF37]">
                You're on the list. We'll notify you before the drop.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                />
                <Button
                  variant="gold"
                  size="md"
                  className="w-full sm:w-auto flex-shrink-0"
                  onClick={() => email && setNotified(true)}
                >
                  <Bell className="w-4 h-4 mr-2" /> Notify Me
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
