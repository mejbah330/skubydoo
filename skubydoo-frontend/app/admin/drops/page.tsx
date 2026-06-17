"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const DROPS = [
  { id: "1", name: "Shadow King", dropDate: "2026-06-01", notifyCount: 234, status: "live" },
  { id: "2", name: "Neon Protocol", dropDate: "2026-06-10", notifyCount: 189, status: "live" },
  { id: "3", name: "Cyber Bloom", dropDate: "2026-06-30", notifyCount: 567, status: "upcoming" },
  { id: "4", name: "Midnight Marble", dropDate: "2026-07-15", notifyCount: 312, status: "upcoming" },
];

export default function AdminDrops() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">Drops</h1>
        <Button variant="gold" size="sm">New Drop</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DROPS.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{d.name}</h3>
                  <p className="text-xs text-[#B0B0B0] mt-1">
                    Drops: {new Date(d.dropDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Badge variant={d.status === "live" ? "success" : "gold"}>
                  {d.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#B0B0B0]">
                  <span className="text-[#D4AF37] font-bold">{d.notifyCount}</span> on waitlist
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-[#FF4444]">Cancel</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
