"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const VAULT_ITEMS = [
  {
    id: "v1",
    name: "Origin Tee",
    releaseDate: "2025-09-15",
    editionSize: 50,
    soldOutDate: "2025-09-16",
    designerNotes: "The one that started it all. 50 pieces. Sold in 24 hours. The birth of ShubyDoo.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    highlight: true,
  },
  {
    id: "v2",
    name: "Midnight Protocol",
    releaseDate: "2025-10-01",
    editionSize: 75,
    soldOutDate: "2025-10-03",
    designerNotes: "Inspired by late-night creation sessions. Cyberpunk aesthetics meet street culture.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    highlight: false,
  },
  {
    id: "v3",
    name: "Gold Standard",
    releaseDate: "2025-11-15",
    editionSize: 30,
    soldOutDate: "2025-11-15",
    designerNotes: "The most premium drop to date. 30 pieces vanished in under 3 hours.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
    highlight: false,
  },
  {
    id: "v4",
    name: "Chaos Theory",
    releaseDate: "2025-12-01",
    editionSize: 45,
    soldOutDate: "2025-12-02",
    designerNotes: "Experimental techniques. Each piece slightly different. True chaos.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    highlight: false,
  },
];

export default function VaultPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <section className="relative py-32 px-4 text-center overflow-hidden">
        <GoldParticles count={40} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
            Design Archive
          </p>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight font-display">
            THE <span className="gold-text">VAULT</span>
          </h1>
          <p className="mt-4 text-[#B0B0B0] max-w-xl mx-auto">
            Retired collections. Sold out masterpieces. The history of ShubyDoo.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 max-w-5xl mx-auto">
        <div className="space-y-8">
          {VAULT_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card glow={item.highlight} className="flex flex-col md:flex-row gap-6 items-start">
                <div
                  className="w-full md:w-48 aspect-square rounded-xl bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-xs text-[#B0B0B0] mt-1">
                        Released: {new Date(item.releaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#B0B0B0] uppercase tracking-wider">Edition Size</p>
                      <p className="text-lg font-bold text-[#D4AF37]">{item.editionSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-xs text-[#B0B0B0]">
                    <span>Sold out: {new Date(item.soldOutDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</span>
                  </div>

                  <p className="mt-4 text-sm text-[#B0B0B0] leading-relaxed italic border-l-2 border-[#D4AF37]/30 pl-4">
                    "{item.designerNotes}"
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
