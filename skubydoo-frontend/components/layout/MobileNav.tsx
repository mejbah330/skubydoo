"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Globe, Clock, Vault, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/worlds", icon: Globe, label: "Worlds" },
  { href: "/next-drop", icon: Clock, label: "Drop" },
  { href: "/vault", icon: Vault, label: "Vault" },
  { href: "/checkout", icon: ShoppingBag, label: "Cart" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-1 relative transition-colors duration-300",
                active ? "text-[#D4AF37]" : "text-[#B0B0B0]"
              )}
            >
              {href === "/checkout" && itemCount > 0 && (
                <span className="absolute -top-1 right-1 w-4 h-4 bg-[#D4AF37] text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
