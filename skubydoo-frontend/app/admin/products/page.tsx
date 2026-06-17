"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const PRODUCTS = [
  { id: "1", name: "Shadow King", edition: "SD-001", world: "REBEL", price: 2499, stock: 24, status: "active" },
  { id: "2", name: "Neon Protocol", edition: "SD-002", world: "FUTURE", price: 2999, stock: 8, status: "active" },
  { id: "3", name: "Golden Crown", edition: "SD-003", world: "LEGACY", price: 4999, stock: 3, status: "active" },
  { id: "4", name: "Anomaly X", edition: "SD-004", world: "CHAOS", price: 3499, stock: 12, status: "active" },
  { id: "5", name: "Nightfall", edition: "SD-005", world: "REBEL", price: 2799, stock: 0, status: "sold_out" },
];

export default function AdminProducts() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">Products</h1>
        <Button variant="gold" size="sm">Add Product</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-3">
                <Badge variant="gold">{p.edition}</Badge>
                <Badge variant={p.status === "active" ? "success" : "danger"}>
                  {p.status === "active" ? "Active" : "Sold Out"}
                </Badge>
              </div>
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-xs text-[#B0B0B0] mt-1">{p.world} WORLD</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-[#D4AF37]">₹{p.price.toLocaleString()}</span>
                <span className={`text-sm ${p.stock <= 5 ? "text-[#FF4444]" : "text-[#00D26A]"}`}>
                  {p.stock} in stock
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button variant="ghost" size="sm" className="flex-1 text-[#FF4444]">Archive</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
