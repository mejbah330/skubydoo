"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const ORDERS = [
  { id: "1", orderNumber: "SD-20260617-0001", customer: "Rahul S.", email: "rahul@email.com", items: 1, total: 2499, status: "confirmed", date: "2026-06-17" },
  { id: "2", orderNumber: "SD-20260617-0002", customer: "Priya K.", email: "priya@email.com", items: 2, total: 4999, status: "printing", date: "2026-06-17" },
  { id: "3", orderNumber: "SD-20260617-0003", customer: "Arjun M.", email: "arjun@email.com", items: 1, total: 2999, status: "shipped", date: "2026-06-16" },
  { id: "4", orderNumber: "SD-20260617-0004", customer: "Neha G.", email: "neha@email.com", items: 3, total: 8497, status: "pending", date: "2026-06-17" },
  { id: "5", orderNumber: "SD-20260616-0001", customer: "Vikram P.", email: "vikram@email.com", items: 1, total: 2499, status: "delivered", date: "2026-06-16" },
  { id: "6", orderNumber: "SD-20260615-0003", customer: "Ananya R.", email: "ananya@email.com", items: 1, total: 5999, status: "cancelled", date: "2026-06-15" },
];

const STATUS_OPTIONS = ["all", "pending", "confirmed", "printing", "packed", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 className="text-2xl font-black mb-8">Orders</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-xs tracking-wider uppercase rounded-full transition-all ${
              filter === s ? "bg-[#D4AF37] text-black font-bold" : "glass text-[#B0B0B0]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-[#B0B0B0]">
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Order</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Customer</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Items</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Total</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Status</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-mono text-xs">{order.orderNumber}</td>
                <td className="py-4 px-6">
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-xs text-[#B0B0B0]">{order.email}</p>
                </td>
                <td className="py-4 px-6">{order.items}</td>
                <td className="py-4 px-6 font-bold">₹{order.total.toLocaleString()}</td>
                <td className="py-4 px-6">
                  <Badge
                    variant={
                      order.status === "delivered" ? "success" :
                      order.status === "cancelled" ? "danger" : "gold"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-[#B0B0B0]">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </motion.div>
  );
}
