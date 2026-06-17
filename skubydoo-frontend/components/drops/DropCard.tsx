"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface DropCardProps {
  name: string;
  image: string;
  editionNumber?: string;
  price: number;
  remaining: number;
  total: number;
  worldName?: string;
  onClick?: () => void;
}

export function DropCard({
  name,
  image,
  editionNumber,
  price,
  remaining,
  total,
  worldName,
  onClick,
}: DropCardProps) {
  const sold = total - remaining;
  const progress = (sold / total) * 100;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className="glass rounded-2xl overflow-hidden cursor-pointer group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

        {editionNumber && (
          <Badge variant="gold" className="absolute top-3 left-3">
            #{editionNumber}
          </Badge>
        )}

        {remaining <= 10 && remaining > 0 && (
          <Badge variant="danger" className="absolute top-3 right-3">
            Almost Gone
          </Badge>
        )}

        {remaining === 0 && (
          <Badge variant="default" className="absolute top-3 right-3">
            Sold Out
          </Badge>
        )}
      </div>

      <div className="p-5">
        {worldName && (
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#B0B0B0] mb-1">
            {worldName}
          </p>
        )}

        <h3 className="text-lg font-bold text-white group-hover:gold-text transition-colors duration-300">
          {name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-[#D4AF37]">
            {formatPrice(price)}
          </span>
          <span className="text-xs text-[#B0B0B0]">
            {remaining} left
          </span>
        </div>

        <div className="mt-3">
          <ProgressBar
            value={sold}
            max={total}
            variant={remaining <= 10 ? "danger" : "gold"}
          />
        </div>
      </div>
    </motion.div>
  );
}
