"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const CUSTOMERS = [
  { id: "1", name: "Rahul Sharma", email: "rahul@email.com", orders: 5, spent: 12495, joined: "2026-01-15" },
  { id: "2", name: "Priya Kapoor", email: "priya@email.com", orders: 3, spent: 8997, joined: "2026-02-20" },
  { id: "3", name: "Arjun Mehta", email: "arjun@email.com", orders: 8, spent: 21992, joined: "2025-12-10" },
  { id: "4", name: "Neha Gupta", email: "neha@email.com", orders: 2, spent: 5998, joined: "2026-03-05" },
  { id: "5", name: "Vikram Patel", email: "vikram@email.com", orders: 4, spent: 10996, joined: "2026-01-28" },
];

export default function AdminCustomers() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 className="text-2xl font-black mb-8">Customers</h1>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-[#B0B0B0]">
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Customer</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Email</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Orders</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Total Spent</th>
              <th className="text-left py-4 px-6 text-xs uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-4 px-6 font-medium">{c.name}</td>
                <td className="py-4 px-6 text-[#B0B0B0]">{c.email}</td>
                <td className="py-4 px-6">{c.orders}</td>
                <td className="py-4 px-6 font-bold text-[#D4AF37]">₹{c.spent.toLocaleString()}</td>
                <td className="py-4 px-6 text-[#B0B0B0]">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </motion.div>
  );
}
