"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const INVENTORY = [
  { product: "Shadow King", color: "Black", size: "S", stock: 12, sku: "SD-BLK-S-001", status: "ok" },
  { product: "Shadow King", color: "Black", size: "M", stock: 8, sku: "SD-BLK-M-001", status: "ok" },
  { product: "Shadow King", color: "Black", size: "L", stock: 4, sku: "SD-BLK-L-001", status: "low" },
  { product: "Shadow King", color: "Black", size: "XL", stock: 0, sku: "SD-BLK-XL-001", status: "out" },
  { product: "Shadow King", color: "White", size: "M", stock: 2, sku: "SD-WHT-M-001", status: "low" },
  { product: "Neon Protocol", color: "Black", size: "S", stock: 15, sku: "SD-NP-BLK-S", status: "ok" },
  { product: "Neon Protocol", color: "Black", size: "M", stock: 5, sku: "SD-NP-BLK-M", status: "low" },
  { product: "Golden Crown", color: "White", size: "M", stock: 2, sku: "SD-GC-WHT-M", status: "low" },
  { product: "Golden Crown", color: "White", size: "L", stock: 1, sku: "SD-GC-WHT-L", status: "low" },
  { product: "Anomaly X", color: "Black", size: "L", stock: 20, sku: "SD-AX-BLK-L", status: "ok" },
];

export default function AdminInventory() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 className="text-2xl font-black mb-8">Inventory</h1>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-[#B0B0B0]">
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Product</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Color</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Size</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Stock</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">SKU</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {INVENTORY.map((item, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 px-6 font-medium">{item.product}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ background: item.color === "Black" ? "#1a1a1a" : "#f5f5f5" }}
                    />
                    {item.color}
                  </div>
                </td>
                <td className="py-4 px-6 font-bold">{item.size}</td>
                <td className="py-4 px-6">
                  <span
                    className={`font-bold text-sm ${
                      item.stock === 0 ? "text-[#FF4444]" :
                      item.stock <= 5 ? "text-[#F4D37A]" : "text-[#00D26A]"
                    }`}
                  >
                    {item.stock}
                  </span>
                </td>
                <td className="py-4 px-6 font-mono text-xs text-[#B0B0B0]">{item.sku}</td>
                <td className="py-4 px-6">
                  <Badge
                    variant={
                      item.status === "out" ? "danger" :
                      item.status === "low" ? "gold" : "success"
                    }
                  >
                    {item.status === "out" ? "Out of Stock" : item.status === "low" ? "Low Stock" : "In Stock"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </motion.div>
  );
}
