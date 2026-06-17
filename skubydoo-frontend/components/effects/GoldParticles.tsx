"use client";

import { useEffect, useRef } from "react";

interface GoldParticlesProps {
  count?: number;
  className?: string;
}

export function GoldParticles({ count = 30, className }: GoldParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 4 + 1;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle-float ${Math.random() * 4 + 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
        opacity: ${Math.random() * 0.5 + 0.2};
      `;
      container.appendChild(particle);
    }

    const style = document.createElement("style");
    style.textContent = `
      @keyframes particle-float {
        0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
        25% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 0.5; }
        50% { transform: translateY(-10px) translateX(-10px) scale(0.8); opacity: 0.3; }
        75% { transform: translateY(-30px) translateX(5px) scale(1.1); opacity: 0.4; }
      }
    `;
    container.appendChild(style);

    return () => {
      container.innerHTML = "";
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className || ""}`}
      aria-hidden="true"
    />
  );
}
