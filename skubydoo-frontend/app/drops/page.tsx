"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { DropCard } from "@/components/drops/DropCard";
import { Button } from "@/components/ui/Button";

const ALL_DROPS = [
  { name: "Shadow King", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", editionNumber: "SD-001", price: 2499, remaining: 24, total: 100, worldName: "REBEL WORLD" },
  { name: "Neon Protocol", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", editionNumber: "SD-002", price: 2999, remaining: 8, total: 75, worldName: "FUTURE WORLD" },
  { name: "Golden Crown", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80", editionNumber: "SD-003", price: 4999, remaining: 3, total: 50, worldName: "LEGACY WORLD" },
  { name: "Anomaly X", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", editionNumber: "SD-004", price: 3499, remaining: 12, total: 60, worldName: "CHAOS WORLD" },
  { name: "Nightfall", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80", editionNumber: "SD-005", price: 2799, remaining: 15, total: 80, worldName: "REBEL WORLD" },
  { name: "Cyber Pulse", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", editionNumber: "SD-006", price: 3299, remaining: 5, total: 60, worldName: "FUTURE WORLD" },
  { name: "Royal Crest", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80", editionNumber: "SD-007", price: 5999, remaining: 7, total: 30, worldName: "LEGACY WORLD" },
  { name: "Void Walker", image: "https://images.unsplash.com/photo-1503341733017-1901578f9f1a?w=600&q=80", editionNumber: "SD-008", price: 3899, remaining: 18, total: 45, worldName: "CHAOS WORLD" },
];

export default function DropsPage() {
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
            Limited Editions
          </p>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight font-display">
            ALL <span className="gold-text">DROPS</span>
          </h1>
        </div>
      </section>

      <section className="pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALL_DROPS.map((d, i) => (
            <motion.div
              key={d.editionNumber}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/drop/${d.editionNumber?.toLowerCase()}`}>
                <DropCard {...d} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
