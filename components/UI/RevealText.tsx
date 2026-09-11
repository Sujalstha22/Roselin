"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const RevealText = ({ text, className = "", delay = 0 }: RevealTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const letters = container.querySelectorAll<HTMLElement>(".reveal-letter");
      if (!letters.length) return;

      // Set initial hidden state in GSAP
      gsap.set(letters, {
        y: -15,
        opacity: 0,
      });

      const playReveal = () => {
        gsap.to(letters, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: delay,
          stagger: 0.02,
          ease: "power2.out",
        });
      };

      // Check if container is already in the viewport (e.g. Hero on page load)
      const rect = container.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (inViewport) {
        // Run directly without waiting for a scroll event
        playReveal();
      } else {
        // Use ScrollTrigger for elements further down the page
        ScrollTrigger.create({
          trigger: container,
          start: "top 90%",
          once: true,
          onEnter: () => playReveal(),
        });
      }

      // Safety fallback: ensure letters become visible even if animations/scroll fail
      const fallbackTimer = setTimeout(() => {
        gsap.to(letters, { opacity: 1, y: 0, duration: 0.3 });
      }, (delay + 1.5) * 1000);

      return () => clearTimeout(fallbackTimer);
    },
    { scope: containerRef }
  );

  // Normalize both literal '\n' and raw newline characters
  const normalizedText = text.replace(/\\n/g, "\n");
  const lines = normalizedText.split("\n");

  return (
    <span ref={containerRef} className={`reveal-text ${className}`}>
      {lines.map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line.split("").map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className="reveal-letter inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
};

export default RevealText;
