import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { MobileNav } from "@/components/layout/MobileNav";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SKUBYDOO | Wear The Unseen",
  description:
    "Premium limited-edition streetwear. Not made for everyone. Wear the unseen.",
  keywords: ["streetwear", "premium", "limited edition", "fashion", "skubydoo"],
  openGraph: {
    title: "SKUBYDOO | Wear The Unseen",
    description: "Premium limited-edition streetwear. Not made for everyone.",
    siteName: "SKUBYDOO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
