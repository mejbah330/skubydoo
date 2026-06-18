"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="hidden md:block border-t border-white/5 bg-[#0F0F0F] pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-white mb-4">
              SKUBYDOO
            </h3>
            <p className="text-xs text-[#B0B0B0] leading-relaxed">
              Wear The Unseen. Premium limited-edition streetwear for the
              fearless.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-white mb-3">
              EXPLORE
            </h4>
            <div className="flex flex-col gap-2">
              {["Worlds", "Drops", "Vault", "Community"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="text-xs text-[#B0B0B0] hover:text-white transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-white mb-3">
              SUPPORT
            </h4>
            <div className="flex flex-col gap-2">
              {["Track Order", "Verify Certificate", "Size Guide", "FAQ"].map(
                (link) => (
                  <Link
                    key={link}
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-xs text-[#B0B0B0] hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-white mb-3">
              LEGAL
            </h4>
            <div className="flex flex-col gap-2">
              {["Privacy", "Terms", "Refunds"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="text-xs text-[#B0B0B0] hover:text-white transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-[#B0B0B0] tracking-widest uppercase">
            &copy; {new Date().getFullYear()} SkubyDoo. Wear The Unseen.
          </p>
        </div>
      </div>
    </footer>
  );
}
