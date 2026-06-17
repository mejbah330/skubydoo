"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, TrendingUp, Package } from "lucide-react";
import { Card } from "@/components/ui/Card";

const STATS = [
  { label: "Total Revenue", value: "₹1,24,500", icon: DollarSign, change: "+12%", positive: true },
  { label: "Total Orders", value: "347", icon: ShoppingBag, change: "+8%", positive: true },
  { label: "Visitors Today", value: "1,204", icon: Users, change: "+24%", positive: true },
  { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, change: "+0.5%", positive: true },
];

const RECENT_ORDERS = [
  { orderNumber: "SD-20260617-0001", customer: "Rahul S.", total: "₹2,499", status: "confirmed" },
  { orderNumber: "SD-20260617-0002", customer: "Priya K.", total: "₹4,999", status: "printing" },
  { orderNumber: "SD-20260617-0003", customer: "Arjun M.", total: "₹2,999", status: "shipped" },
  { orderNumber: "SD-20260617-0004", customer: "Neha G.", total: "₹3,499", status: "pending" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-500",
  confirmed: "bg-blue-500/20 text-blue-500",
  printing: "bg-purple-500/20 text-purple-500",
  packed: "bg-orange-500/20 text-orange-500",
  shipped: "bg-green-500/20 text-green-500",
  delivered: "bg-emerald-500/20 text-emerald-500",
};

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-black mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span
                  className={`text-xs font-bold ${stat.positive ? "text-[#00D26A]" : "text-[#FF4444]"}`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-xs text-[#B0B0B0] mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {RECENT_ORDERS.map((order) => (
              <div key={order.orderNumber} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm font-mono">{order.orderNumber}</p>
                  <p className="text-xs text-[#B0B0B0]">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{order.total}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Inventory Alerts</h3>
          <div className="space-y-3">
            {[
              { item: "Shadow King - Black M", stock: 8, alert: true },
              { item: "Shadow King - Black L", stock: 4, alert: true },
              { item: "Golden Crown - White M", stock: 2, alert: true },
              { item: "Neon Protocol - Black S", stock: 15, alert: false },
              { item: "Anomaly X - Black XL", stock: 20, alert: false },
            ].map(({ item, stock, alert }) => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm">{item}</span>
                <span className={`text-sm font-bold ${alert ? "text-[#FF4444]" : "text-[#00D26A]"}`}>
                  {stock} left
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
