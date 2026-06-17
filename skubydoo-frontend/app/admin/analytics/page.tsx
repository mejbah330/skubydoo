"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

const MONTHLY_DATA = [
  { month: "Jan", revenue: 18500, orders: 42 },
  { month: "Feb", revenue: 22300, orders: 56 },
  { month: "Mar", revenue: 19800, orders: 48 },
  { month: "Apr", revenue: 28500, orders: 71 },
  { month: "May", revenue: 32100, orders: 82 },
  { month: "Jun", revenue: 36500, orders: 91 },
];

const TOP_PRODUCTS = [
  { name: "Shadow King", revenue: 64974, percentage: 35 },
  { name: "Neon Protocol", revenue: 38985, percentage: 21 },
  { name: "Golden Crown", revenue: 29994, percentage: 16 },
  { name: "Anomaly X", revenue: 27992, percentage: 15 },
  { name: "Nightfall", revenue: 23996, percentage: 13 },
];

const TOP_SIZES = [
  { size: "M", quantity: 145, percentage: 38 },
  { size: "L", quantity: 118, percentage: 31 },
  { size: "S", quantity: 65, percentage: 17 },
  { size: "XL", quantity: 42, percentage: 11 },
  { size: "XXL", quantity: 11, percentage: 3 },
];

const maxRevenue = Math.max(...MONTHLY_DATA.map((d) => d.revenue));

export default function AdminAnalytics() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 className="text-2xl font-black mb-8">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Monthly Revenue</h3>
          <div className="flex items-end gap-2 h-48">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-full bg-gradient-to-t from-[#D4AF37] to-[#F4D37A] rounded-t-md min-h-[4px]"
                />
                <span className="text-[10px] text-[#B0B0B0]">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Monthly Orders</h3>
          <div className="flex items-end gap-2 h-48">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.orders / 100) * 100}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="w-full bg-gradient-to-t from-[#D4AF37]/50 to-[#F4D37A]/50 rounded-t-md min-h-[4px]"
                />
                <span className="text-[10px] text-[#B0B0B0]">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Top Products</h3>
          <div className="space-y-4">
            {TOP_PRODUCTS.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{p.name}</span>
                  <span className="text-[#D4AF37]">₹{p.revenue.toLocaleString()}</span>
                </div>
                <ProgressBar value={p.percentage} max={40} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Top Sizes</h3>
          <div className="space-y-4">
            {TOP_SIZES.map((s) => (
              <div key={s.size}>
                <div className="flex justify-between text-xs mb-1">
                  <span>Size {s.size}</span>
                  <span className="text-[#B0B0B0]">{s.quantity} sold ({s.percentage}%)</span>
                </div>
                <ProgressBar value={s.percentage} max={40} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
