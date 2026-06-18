"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { GoldParticles } from "@/components/effects/GoldParticles";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid credentials";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[90vh] flex items-center justify-center px-4 py-20"
    >
      <GoldParticles count={25} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_70%)]" />

      <div className="glass-gold rounded-3xl p-8 md:p-12 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <span className="text-2xl font-black tracking-[0.3em] font-display gold-text">
              SKUBYDOO
            </span>
          </motion.div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-[#B0B0B0] mt-2">
            Sign in to access your orders and the Vault
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs text-[#B0B0B0] uppercase tracking-wider block mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0B0B0]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-[#B0B0B0] uppercase tracking-wider block mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0B0B0]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B0B0B0] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-[#FF4444] text-center"
            >
              {error}
            </motion.p>
          )}

          <Button
            variant="gold"
            size="lg"
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center">
            <p className="text-xs text-[#B0B0B0]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[#D4AF37] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>

          <div className="glass rounded-xl p-4 text-center">
            <p className="text-[10px] text-[#B0B0B0] uppercase tracking-wider mb-1">Demo Credentials</p>
            <p className="text-xs text-[#B0B0B0]">
              <span className="text-white">Admin:</span> admin@skubydoo.com / admin123
            </p>
            <p className="text-xs text-[#B0B0B0]">
              <span className="text-white">Customer:</span> demo@skubydoo.com / demo123
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
