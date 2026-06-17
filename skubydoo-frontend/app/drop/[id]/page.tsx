"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, Check, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

const MOCK_PRODUCT = {
  id: "p1",
  name: "Shadow King",
  editionNumber: "SD-001",
  price: 2499,
  description: "Dark aggressive design from the Rebel World. Premium 280 GSM cotton with reinforced stitching and a raw hem.",
  story: "Born from midnight creators building dreams while the world sleeps. Every Shadow King represents rebellion against fast fashion.",
  fabric: "280 GSM Premium Combed Cotton. Enzyme washed. Reactive dyed. Bio-polished finish.",
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80",
  ],
  total: 100,
  sold: 76,
  variations: [
    { color: "Black", colorHex: "#1a1a1a", size: "S", stock: 12, id: "b1" },
    { color: "Black", colorHex: "#1a1a1a", size: "M", stock: 8, id: "b2" },
    { color: "Black", colorHex: "#1a1a1a", size: "L", stock: 4, id: "b3" },
    { color: "Black", colorHex: "#1a1a1a", size: "XL", stock: 0, id: "b4" },
    { color: "White", colorHex: "#f5f5f5", size: "M", stock: 2, id: "w1" },
    { color: "White", colorHex: "#f5f5f5", size: "L", stock: 6, id: "w2" },
  ],
};

export default function DropPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const product = MOCK_PRODUCT;

  const availableSizes = product.variations.filter(
    (v) => v.color === selectedColor
  );

  const selectedVariation = product.variations.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const handleAdd = () => {
    if (!selectedVariation || selectedVariation.stock <= 0) return;
    addItem({
      productId: product.id,
      variationId: selectedVariation.id,
      name: product.name,
      color: selectedVariation.color,
      size: selectedVariation.size,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pb-24 md:pb-0"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/world/rebel" className="inline-flex items-center gap-2 text-xs text-[#B0B0B0] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-3 h-3" />
          REBEL WORLD
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass mb-4">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${product.images[activeImage]})` }}
              />
              <Badge variant="gold" className="absolute top-4 left-4">
                #{product.editionNumber}
              </Badge>
            </div>

            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === activeImage ? "border-[#D4AF37]" : "border-transparent"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-2">
              REBEL WORLD
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-[#D4AF37] mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="mb-6">
              <ProgressBar
                value={product.sold}
                max={product.total}
                label="Edition Progress"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-[#B0B0B0]">
                  Produced: <span className="text-white">{product.total}</span>
                </span>
                <span className="text-xs text-[#B0B0B0]">
                  Sold: <span className="text-[#D4AF37]">{product.sold}</span>
                </span>
                <span className="text-xs text-[#B0B0B0]">
                  Remaining: <span className="text-[#FF4444]">{product.total - product.sold}</span>
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase text-white mb-3">
                Color: <span className="text-[#D4AF37]">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {["Black", "White"].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedColor(c); setSelectedSize(""); }}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === c ? "border-[#D4AF37] scale-110" : "border-white/20"
                    }`}
                    style={{ background: c === "Black" ? "#1a1a1a" : "#f5f5f5" }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs tracking-wider uppercase text-white mb-3">
                Size
              </p>
              <div className="flex flex-wrap gap-3">
                {availableSizes.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => v.stock > 0 && setSelectedSize(v.size)}
                    disabled={v.stock === 0}
                    className={`w-14 h-14 rounded-xl text-sm font-bold transition-all ${
                      selectedSize === v.size
                        ? "bg-[#D4AF37] text-black"
                        : v.stock === 0
                        ? "bg-white/5 text-[#333] cursor-not-allowed"
                        : "glass text-white hover:border-[#D4AF37]"
                    }`}
                  >
                    <div>{v.size}</div>
                    <div className="text-[10px] opacity-60">
                      {v.stock === 0 ? "OOS" : v.stock}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="w-full mb-4"
              onClick={handleAdd}
              disabled={!selectedSize || !selectedVariation || selectedVariation.stock <= 0}
            >
              {added ? (
                <><Check className="w-4 h-4 mr-2" /> Added</>
              ) : !selectedSize ? (
                "Select Size"
              ) : selectedVariation?.stock === 0 ? (
                "Sold Out"
              ) : (
                "Add to Cart"
              )}
            </Button>

            <div className="flex items-center gap-4 text-xs text-[#B0B0B0] justify-center mb-8">
              <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Cash on Delivery</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Certificate</span>
            </div>

            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-2">
                The Story
              </h3>
              <p className="text-sm text-[#B0B0B0] leading-relaxed">
                {product.story}
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-2">
                Fabric & Care
              </h3>
              <p className="text-sm text-[#B0B0B0] leading-relaxed">
                {product.fabric}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
