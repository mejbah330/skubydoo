"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-[0.3em] font-display gold-text"
          >
            SHUBYDOO
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["worlds", "drops", "vault", "community"].map((path) => (
            <Link
              key={path}
              href={`/${path}`}
              className="text-xs tracking-[0.2em] uppercase text-[#B0B0B0] hover:text-white transition-colors duration-300"
            >
              {path}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/checkout"
            className="relative p-2 text-[#B0B0B0] hover:text-white transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#B0B0B0] hover:text-white"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 glass"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {["worlds", "drops", "vault", "community"].map((path) => (
                <Link
                  key={path}
                  href={`/${path}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-[0.2em] uppercase text-[#B0B0B0] hover:text-white transition-colors"
                >
                  {path}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
