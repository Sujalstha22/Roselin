"use client";

import { useEffect, useState } from "react";

type Particle = {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
};

type SparklesProps = {
  className?: string;
  count?: number;
  minSize?: number;
  maxSize?: number;
  color?: string;
};

const Sparkle = ({
  className = "",
  count = 40,
  minSize = 1,
  maxSize = 3,
  color = "#ffffff",
}: SparklesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const items: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * (maxSize - minSize) + minSize,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.7,
    }));
    setParticles(items);
  }, [count, minSize, maxSize]);

  if (particles.length === 0) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: color,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Sparkle;