"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { LuxuryLoader } from "@/components/loading/LuxuryLoader";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { WorldCard } from "@/components/worlds/WorldCard";
import { DropCard } from "@/components/drops/DropCard";
import { Button } from "@/components/ui/Button";
import { WORLDS } from "@/lib/constants";

const FEATURED_DROPS = [
  {
    name: "Shadow King",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    editionNumber: "SD-001",
    price: 2499,
    remaining: 24,
    total: 100,
    worldName: "REBEL WORLD",
  },
  {
    name: "Neon Protocol",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    editionNumber: "SD-002",
    price: 2999,
    remaining: 8,
    total: 75,
    worldName: "FUTURE WORLD",
  },
  {
    name: "Golden Crown",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    editionNumber: "SD-003",
    price: 4999,
    remaining: 3,
    total: 50,
    worldName: "LEGACY WORLD",
  },
  {
    name: "Anomaly X",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    editionNumber: "SD-004",
    price: 3499,
    remaining: 12,
    total: 60,
    worldName: "CHAOS WORLD",
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  return (
    <>
      <LuxuryLoader />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          <GoldParticles count={50} />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_70%)]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10"
          >
            <p className="text-xs md:text-sm tracking-[0.5em] text-[#B0B0B0] uppercase mb-6">
              Premium Streetwear
            </p>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-[12vw] md:text-[8rem] font-black leading-none tracking-tighter font-display text-white">
                  SKUBY<span className="gold-text">DOO</span>
                </h1>
              </motion.div>

              <div className="absolute -top-4 -right-4 md:top-0 md:right-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-[#D4AF37]/20"
                />
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-4xl md:text-7xl font-black tracking-tight mb-4"
            >
              NOT MADE FOR
              <br />
              <span className="text-stroke">EVERYONE.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg md:text-xl text-[#B0B0B0] tracking-wider uppercase mb-10"
            >
              Wear The Unseen
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="gold" size="lg">
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                View Next Drop
                <Sparkles className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="absolute bottom-8"
          >
            <div className="flex flex-col items-center gap-2 text-[#B0B0B0]">
              <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent"
              />
            </div>
          </motion.div>
        </section>
      </motion.div>

      <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">
            Choose Your Universe
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display">
            EXPLORE <span className="gold-text">WORLDS</span>
          </h2>
          <p className="mt-4 text-[#B0B0B0] max-w-xl mx-auto text-sm">
            Not categories. Worlds. Each with its own identity, energy, and
            exclusive designs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORLDS.map((world, index) => (
            <motion.div
              key={world.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/world/${world.slug}`}>
                <WorldCard
                  name={world.name}
                  slug={world.slug}
                  description={world.description}
                  accent={world.accent}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">
            Limited Availability
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display">
            FEATURED <span className="gold-text">DROPS</span>
          </h2>
          <p className="mt-4 text-[#B0B0B0] max-w-xl mx-auto text-sm">
            Each piece is a numbered edition. Once gone, it lives only in the
            Vault.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_DROPS.map((drop, index) => (
            <motion.div
              key={drop.editionNumber}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/drop/${drop.editionNumber?.toLowerCase().replace("-", "-")}`}>
                <DropCard {...drop} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/drops">
            <Button variant="outline" size="md">
              View All Drops
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_50%)]" />
        <GoldParticles count={20} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
              The Brand
            </p>
            <h2 className="text-3xl md:text-6xl font-black tracking-tight font-display mb-8">
              BORN FROM <span className="gold-text">MIDNIGHT</span>
              <br />
              CREATORS
            </h2>
            <p className="text-[#B0B0B0] text-lg leading-relaxed max-w-2xl mx-auto">
              Building dreams while the world sleeps. Every SkubyDoo piece is a
              statement. Not fast fashion. Not mass produced. Limited editions
              crafted for those who understand the culture.
            </p>
            <div className="mt-10 flex items-center justify-center gap-8">
              {["Limited", "Premium", "Authentic"].map((value) => (
                <div key={value} className="text-center">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  </div>
                  <p className="text-xs tracking-widest uppercase text-[#B0B0B0]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-gold rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

          <div className="relative z-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
              Next Drop Incoming
            </p>
            <h2 className="text-3xl md:text-6xl font-black tracking-tight font-display mb-6">
              THE NEXT
              <br />
              <span className="gold-text">ERA BEGINS</span>
            </h2>
            <p className="text-[#B0B0B0] max-w-lg mx-auto mb-8">
              Be first in line for the next collection. Join the waitlist and
              get notified before anyone else.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
              <Button variant="gold" size="md" className="w-full sm:w-auto flex-shrink-0">
                Notify Me
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
