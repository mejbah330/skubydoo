"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminSettings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 className="text-2xl font-black mb-8">Settings</h1>

      <Card className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Store Information</h3>
        <div className="space-y-4">
          {[
            { label: "Store Name", value: "SKUBYDOO" },
            { label: "Tagline", value: "Wear The Unseen" },
            { label: "Email", value: "contact@skubydoo.com" },
            { label: "Currency", value: "INR (₹)" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-[#B0B0B0]">{label}</span>
              <span className="text-sm font-medium">{value}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="mt-4">Edit Settings</Button>
      </Card>

      <Card className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">AI Configuration</h3>
        <div className="space-y-4">
          {[
            { label: "AI Description Generator", value: "Enabled" },
            { label: "AI Naming Suggestions", value: "Enabled" },
            { label: "Demand Prediction", value: "Enabled" },
            { label: "Inventory Forecasting", value: "Enabled" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-[#B0B0B0]">{label}</span>
              <span className="text-sm text-[#00D26A]">{value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <Button variant="outline" size="sm" className="text-[#F4D37A] border-[#F4D37A]/30 w-full">
            Export All Data
          </Button>
          <Button variant="outline" size="sm" className="text-[#FF4444] border-[#FF4444]/30 w-full">
            Reset Store
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
