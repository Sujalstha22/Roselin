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

      const letters = container.querySelectorAll(".reveal-letter");
      if (!letters.length) return;

      gsap.fromTo(
        letters,
        {
          y: -20,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          delay,
          stagger: 0.025,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
          },
        }
      );
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
              style={{ opacity: 0 }}
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
