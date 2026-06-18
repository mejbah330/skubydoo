"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  Users,
  BarChart3,
  Clock,
  Vault,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminGuard from "@/components/admin/AdminGuard";
import { useAuth } from "@/context/AuthContext";

const SIDEBAR_LINKS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/inventory", icon: Boxes, label: "Inventory" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/drops", icon: Clock, label: "Drops" },
  { href: "/admin/vault", icon: Vault, label: "Vault" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex flex-col w-64 bg-[#0F0F0F] border-r border-white/5 fixed inset-y-0 left-0 z-40">
          <div className="p-6 border-b border-white/5">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-[0.3em] font-display gold-text">
                SKUBYDOO
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {SIDEBAR_LINKS.map(({ href, icon: Icon, label }) => {
              const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all duration-200",
                    active
                      ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "text-[#B0B0B0] hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5 space-y-2">
            {user && (
              <div className="px-3 py-2 rounded-xl bg-white/5 mb-2">
                <p className="text-xs text-white font-medium truncate">{user.email}</p>
                <p className="text-[10px] text-[#B0B0B0] uppercase tracking-wider">Admin</p>
              </div>
            )}
            <div className="flex gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 text-xs text-[#B0B0B0] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-3 h-3" /> Store
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs text-[#B0B0B0] hover:text-[#FF4444] transition-colors ml-auto"
              >
                <LogOut className="w-3 h-3" /> Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 lg:ml-64 p-6 md:p-10 pb-24 lg:pb-10">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
