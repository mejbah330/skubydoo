"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
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
            SKUBYDOO
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

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={user.role === "admin" ? "/admin" : "/profile"}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-gold text-xs text-[#B0B0B0] hover:text-white transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="truncate max-w-[100px]">{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-[#B0B0B0] hover:text-[#FF4444] transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#B0B0B0] hover:text-white transition-colors"
            >
              <User className="w-4 h-4" /> Sign In
            </Link>
          )}

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
              <div className="border-t border-white/5 pt-4">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm text-white">
                      <User className="w-4 h-4 text-[#D4AF37]" />
                      {user.username}
                    </div>
                    <Link
                      href={user.role === "admin" ? "/admin" : "/profile"}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#F4D37A] transition-colors"
                    >
                      {user.role === "admin" ? "Dashboard" : "My Profile"}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="text-sm tracking-[0.2em] uppercase text-[#FF4444] hover:text-red-400 transition-colors text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#F4D37A] transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
