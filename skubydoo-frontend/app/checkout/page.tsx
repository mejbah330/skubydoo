"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const STEPS = ["Customer Info", "Shipping", "Review", "Order"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, removeItem, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [certNumber, setCertNumber] = useState("");

  const shippingCost = subtotal >= 2999 ? 0 : 199;
  const total = subtotal + shippingCost;

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 0) return form.name && form.email && form.phone;
    if (step === 1) return form.address && form.city && form.state && form.pincode;
    return true;
  };

  const handlePlaceOrder = () => {
    const ordNum = `SD-20260617-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
    const cert = `SD-2026-${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`;
    setOrderNumber(ordNum);
    setCertNumber(cert);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[80vh] flex items-center justify-center px-4"
      >
        <div className="glass-gold rounded-3xl p-8 md:p-16 text-center max-w-lg w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-[#00D26A]/20 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-[#00D26A]" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-black mb-2">Order Confirmed</h2>
          <p className="text-[#B0B0B0] mb-6">Your order has been placed successfully.</p>
          <div className="glass rounded-2xl p-4 mb-4">
            <p className="text-xs text-[#B0B0B0] mb-1">Order Number</p>
            <p className="text-lg font-bold">{orderNumber}</p>
          </div>
          <div className="glass rounded-2xl p-4 mb-6">
            <p className="text-xs text-[#B0B0B0] mb-1">Digital Certificate</p>
            <p className="text-lg font-bold text-[#D4AF37]">{certNumber}</p>
          </div>
          <Button variant="gold" size="md" onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
        </div>
      </motion.div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <ShieldCheck className="w-16 h-16 text-[#D4AF37] mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-[#B0B0B0] mb-6">Add some premium pieces to get started.</p>
        <Button variant="gold" size="md" onClick={() => router.push("/drops")}>
          Browse Drops
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pb-24 md:pb-0 max-w-4xl mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-center gap-2 mb-12">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                i <= step ? "bg-[#D4AF37] text-black" : "bg-white/5 text-[#B0B0B0]"
              }`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`hidden sm:block ml-2 text-xs tracking-wider ${
                i <= step ? "text-white" : "text-[#B0B0B0]"
              }`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px mx-2 ${i < step ? "bg-[#D4AF37]" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="customer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-2xl p-6 md:p-10"
          >
            <h2 className="text-xl font-bold mb-6">Customer Information</h2>
            <div className="space-y-4">
              {[
                { label: "Full Name", field: "name", type: "text" },
                { label: "Email", field: "email", type: "email" },
                { label: "Phone", field: "phone", type: "tel" },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="text-xs text-[#B0B0B0] uppercase tracking-wider block mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => updateForm(field, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder={label}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="shipping"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-2xl p-6 md:p-10"
          >
            <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
            <div className="space-y-4">
              {[
                { label: "Address", field: "address", type: "text", full: true as const },
                { label: "City", field: "city", type: "text" },
                { label: "State", field: "state", type: "text" },
                { label: "PIN Code", field: "pincode", type: "text" },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="text-xs text-[#B0B0B0] uppercase tracking-wider block mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => updateForm(field, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder={label}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="glass rounded-2xl p-6 md:p-10 mb-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.variationId} className="flex items-center gap-4 pb-4 border-b border-white/5">
                    <div
                      className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex-1">
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-[#B0B0B0]">
                        {item.color} / {item.size} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#B0B0B0]">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#B0B0B0]">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/5">
                  <span>Total</span><span className="text-[#D4AF37]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 md:p-10">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="glass-gold rounded-xl p-4 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-black" />
                </div>
                <div>
                  <p className="text-sm font-bold">Cash on Delivery</p>
                  <p className="text-xs text-[#B0B0B0]">Pay when you receive your order</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-8">
        <Button variant="ghost" size="md" onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        {step < 2 ? (
          <Button variant="gold" size="md" onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}>
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="gold" size="lg" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        )}
      </div>
    </motion.div>
  );
}
