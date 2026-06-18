"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, ShoppingBag, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GoldParticles } from "@/components/effects/GoldParticles";
import Link from "next/link";

const MOCK_ORDERS = [
  {
    id: "SD-20260617-0001",
    product: "Shadow King",
    color: "Black",
    size: "M",
    price: 2499,
    status: "confirmed",
    cert: "SD-2026-000001",
    date: "June 17, 2026",
  },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-500",
  confirmed: "bg-blue-500/20 text-blue-500",
  printing: "bg-purple-500/20 text-purple-500",
  packed: "bg-orange-500/20 text-orange-500",
  shipped: "bg-green-500/20 text-green-500",
  delivered: "bg-[#00D26A]/20 text-[#00D26A]",
  cancelled: "bg-[#FF4444]/20 text-[#FF4444]",
};

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/profile");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 py-10 md:py-20 max-w-4xl mx-auto"
    >
      <GoldParticles count={15} />

      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
              <User className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-2xl font-black">
                {user.full_name || user.username}
              </h1>
              <p className="text-sm text-[#B0B0B0] flex items-center gap-2">
                <Mail className="w-3 h-3" /> {user.email}
                {user.role === "admin" && (
                  <Badge variant="gold">Admin</Badge>
                )}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { logout(); router.push("/"); }}>
            <LogOut className="w-3 h-3 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Orders", value: MOCK_ORDERS.length.toString(), icon: ShoppingBag },
          { label: "Certificates", value: MOCK_ORDERS.length.toString(), icon: ShieldCheck },
          { label: "Member Since", value: "June 2026", icon: User },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-[#B0B0B0]">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>
        {MOCK_ORDERS.length === 0 ? (
          <Card className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-[#B0B0B0] mx-auto mb-4" />
            <p className="text-[#B0B0B0] mb-4">No orders yet</p>
            <Link href="/drops">
              <Button variant="gold" size="sm">Start Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <Card key={order.id}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-mono text-sm">{order.id}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm">
                      {order.product} — {order.color} / {order.size}
                    </p>
                    <p className="text-xs text-[#B0B0B0] mt-1">
                      {order.date} · Cert: {order.cert}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-[#D4AF37]">
                      ₹{order.price.toLocaleString()}
                    </span>
                    <Link href={`/verify/${order.cert}`}>
                      <Button variant="outline" size="sm">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Verify
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
