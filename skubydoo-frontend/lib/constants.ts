export const COLORS = {
  background: "#050505",
  secondary: "#0F0F0F",
  card: "#111111",
  gold: "#D4AF37",
  goldLight: "#F4D37A",
  white: "#FFFFFF",
  gray: "#B0B0B0",
  success: "#00D26A",
  danger: "#FF4444",
} as const;

export const WORLDS = [
  {
    slug: "rebel",
    name: "REBEL WORLD",
    description: "Dark aggressive designs for those who break rules.",
    accent: "#FF4444",
  },
  {
    slug: "future",
    name: "FUTURE WORLD",
    description: "Cyberpunk designs from tomorrow's creators.",
    accent: "#00D26A",
  },
  {
    slug: "legacy",
    name: "LEGACY WORLD",
    description: "Luxury gold collection. Timeless prestige.",
    accent: "#D4AF37",
  },
  {
    slug: "chaos",
    name: "CHAOS WORLD",
    description: "Experimental limited editions. Unknown territory.",
    accent: "#F4D37A",
  },
] as const;

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
