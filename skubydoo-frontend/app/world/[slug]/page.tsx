"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { DropCard } from "@/components/drops/DropCard";
import { Button } from "@/components/ui/Button";
import { WORLDS } from "@/lib/constants";

const MOCK_PRODUCTS: Record<string, Array<{
  name: string;
  image: string;
  editionNumber: string;
  price: number;
  remaining: number;
  total: number;
}>> = {
  rebel: [
    { name: "Shadow King", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", editionNumber: "SD-001", price: 2499, remaining: 24, total: 100 },
    { name: "Nightfall", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80", editionNumber: "SD-005", price: 2799, remaining: 15, total: 80 },
    { name: "Rebel Storm", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80", editionNumber: "SD-009", price: 2199, remaining: 32, total: 90 },
  ],
  future: [
    { name: "Neon Protocol", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", editionNumber: "SD-002", price: 2999, remaining: 8, total: 75 },
    { name: "Cyber Pulse", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", editionNumber: "SD-006", price: 3299, remaining: 5, total: 60 },
  ],
  legacy: [
    { name: "Golden Crown", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80", editionNumber: "SD-003", price: 4999, remaining: 3, total: 50 },
    { name: "Royal Crest", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80", editionNumber: "SD-007", price: 5999, remaining: 7, total: 30 },
  ],
  chaos: [
    { name: "Anomaly X", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", editionNumber: "SD-004", price: 3499, remaining: 12, total: 60 },
    { name: "Void Walker", image: "https://images.unsplash.com/photo-1503341733017-1901578f9f1a?w=600&q=80", editionNumber: "SD-008", price: 3899, remaining: 18, total: 45 },
  ],
};

export default function WorldPage() {
  const { slug } = useParams<{ slug: string }>();
  const world = WORLDS.find((w) => w.slug === slug);
  const products = MOCK_PRODUCTS[slug as string] || [];

  if (!world) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-[#B0B0B0]">World not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <section className="relative min-h-[50vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <GoldParticles count={30} />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse_at_center, ${world.accent}10, transparent 70%)`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: world.accent }}>
            {world.slug} universe
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight font-display">
            <span style={{ color: world.accent }}>{world.name}</span>
          </h1>
          <p className="mt-6 text-[#B0B0B0] max-w-xl text-lg">
            {world.description}
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.editionNumber}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/drop/${p.editionNumber?.toLowerCase()}`}>
                <DropCard
                  name={p.name}
                  image={p.image}
                  editionNumber={p.editionNumber}
                  price={p.price}
                  remaining={p.remaining}
                  total={p.total}
                  worldName={world.name}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
