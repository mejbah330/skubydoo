"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const VAULT_ITEMS = [
  { id: "1", name: "Origin Tee", editionSize: 50, released: "2025-09-15", soldOut: "2025-09-16", highlight: true },
  { id: "2", name: "Midnight Protocol", editionSize: 75, released: "2025-10-01", soldOut: "2025-10-03", highlight: false },
  { id: "3", name: "Gold Standard", editionSize: 30, released: "2025-11-15", soldOut: "2025-11-15", highlight: false },
];

export default function AdminVault() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">Vault</h1>
        <Button variant="gold" size="sm">Add to Vault</Button>
      </div>

      <div className="space-y-4">
        {VAULT_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card glow={item.highlight} className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold">{item.name}</h3>
                  {item.highlight && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#B0B0B0] mt-1">
                  Edition: {item.editionSize} · Released: {item.released} · Sold Out: {item.soldOut}
                </p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
