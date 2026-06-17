"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { WorldCard } from "@/components/worlds/WorldCard";
import { WORLDS } from "@/lib/constants";

export default function WorldsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <section className="relative py-32 px-4 text-center overflow-hidden">
        <GoldParticles count={30} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
            Choose Your Universe
          </p>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight font-display">
            <span className="gold-text">WORLDS</span>
          </h1>
          <p className="mt-4 text-[#B0B0B0] max-w-xl mx-auto">
            Not categories. Not collections. Worlds. Each with its own identity.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORLDS.map((w, i) => (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/world/${w.slug}`}>
                <WorldCard {...w} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
