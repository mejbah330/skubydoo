"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { GoldParticles } from "@/components/effects/GoldParticles";

const FAQS = [
  { q: "What is SkubyDoo?", a: "Premium limited-edition streetwear. Every piece is numbered, authentic, and exclusive." },
  { q: "How do drops work?", a: "Each design is released as a limited drop. Once sold out, it moves to the Vault." },
  { q: "What is the Vault?", a: "Our archive of retired collections. The history of SkubyDoo." },
  { q: "Can I return items?", a: "Returns accepted within 7 days. Items must be unworn with tags attached." },
  { q: "How does the certificate work?", a: "Every order receives a unique digital certificate (SD-YYYY-NNNNNN). You can verify it on our site." },
  { q: "What payment methods are available?", a: "Currently we support Cash on Delivery. Stripe and PayPal coming soon." },
];

export default function FAQPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 py-20"
    >
      <GoldParticles count={15} />
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display mb-12 text-center">
          FAQ
        </h1>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <h3 className="font-bold text-sm mb-2 text-white">{faq.q}</h3>
                <p className="text-xs text-[#B0B0B0] leading-relaxed">{faq.a}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
