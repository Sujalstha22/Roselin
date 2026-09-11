"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 136;

const SequenceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const firstText = firstTextRef.current;
      const secondText = secondTextRef.current;

      if (!section || !canvas || !firstText || !secondText) return;

      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      /* =====================================================
         IMAGE SEQUENCE PRELOADING & CACHING
         ===================================================== */
      const images: HTMLImageElement[] = new Array(FRAME_COUNT);
      let currentFrameIndex = 0;
      let hasDrawn = false;

      const drawImageToCanvas = (image: HTMLImageElement) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        if (!canvasWidth || !canvasHeight) return;

        const imageRatio = image.naturalWidth / image.naturalHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let width: number;
        let height: number;
        let x: number;
        let y: number;

        if (imageRatio > canvasRatio) {
          height = canvasHeight;
          width = height * imageRatio;
          x = (canvasWidth - width) / 2;
          y = 0;
        } else {
          width = canvasWidth;
          height = width / imageRatio;
          x = 0;
          y = (canvasHeight - height) / 2;
        }

        context.drawImage(image, x, y, width, height);
        hasDrawn = true;
      };

      const renderFrame = (index: number) => {
        const targetIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
        currentFrameIndex = targetIndex;
        const image = images[targetIndex];

        if (image && image.complete && image.naturalWidth > 0) {
          drawImageToCanvas(image);
          return;
        }

        // Fallback: search outward for ANY loaded frame so canvas is NEVER blank
        for (let offset = 1; offset < FRAME_COUNT; offset++) {
          const prev = images[targetIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            drawImageToCanvas(prev);
            return;
          }
          const next = images[targetIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            drawImageToCanvas(next);
            return;
          }
        }
      };

      /* =====================================================
         LOAD FIRST FRAME IMMEDIATELY (HIGH PRIORITY)
         ===================================================== */
      const firstFrame = new Image();
      firstFrame.src = "/images/home/frames/frame_001.jpg";
      firstFrame.onload = () => {
        images[0] = firstFrame;
        drawImageToCanvas(firstFrame);
      };

      // Load remaining frames with priority around the start
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (i === 0) continue;
        const img = new Image();
        const frameNumber = String(i + 1).padStart(3, "0");
        img.src = `/images/home/frames/frame_${frameNumber}.jpg`;

        img.onload = () => {
          if (!hasDrawn || i === currentFrameIndex) {
            renderFrame(currentFrameIndex);
          }
        };

        images[i] = img;
      }

      /* =====================================================
         CANVAS RESIZE
         ===================================================== */
      const resizeCanvas = () => {
        const isMobile = window.innerWidth < 768;
        // Cap DPR at 1.5 on mobile to conserve GPU memory
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        renderFrame(currentFrameIndex);
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas, { passive: true });

      /* =====================================================
         TEXT ANIMATION SETUP (MOBILE-RESILIENT)
         ===================================================== */
      const isMobile = window.innerWidth < 768;
      const firstHeading = firstText.querySelector("h2");
      const firstParagraph = firstText.querySelector("p");
      const secondHeading = secondText.querySelector("h2");
      const secondParagraph = secondText.querySelector("p");

      const firstElements = [firstHeading, firstParagraph].filter(Boolean) as HTMLElement[];
      const secondElements = [secondHeading, secondParagraph].filter(Boolean) as HTMLElement[];

      gsap.set(firstElements, { opacity: 1, x: 0 });
      gsap.set(secondElements, { opacity: 0, x: isMobile ? 25 : 45 });
      gsap.set(secondText, { opacity: 1 });

      /* =====================================================
         MAIN SCROLL TIMELINE
         ===================================================== */
      const frameObject = { frame: 0 };
      const scrollDistance = isMobile ? window.innerHeight * 2.5 : window.innerHeight * 4;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const frame = Math.round(self.progress * (FRAME_COUNT - 1));
            renderFrame(frame);
          },
        },
      });

      tl.to(
        frameObject,
        {
          frame: FRAME_COUNT - 1,
          ease: "none",
          duration: 10,
          onUpdate: () => {
            renderFrame(Math.round(frameObject.frame));
          },
        },
        0
      );

      // Fade out first text
      tl.to(
        firstElements,
        {
          opacity: 0,
          x: isMobile ? 30 : 60,
          stagger: 0.1,
          duration: 1.6,
          ease: "power2.inOut",
        },
        2.5
      );

      // Fade in second text
      tl.to(
        secondElements,
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 1.6,
          ease: "power2.out",
        },
        5.5
      );

      ScrollTrigger.refresh();

      /* =====================================================
         CLEANUP
         ===================================================== */
      return () => {
        window.removeEventListener("resize", resizeCanvas);
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black"
    >
      {/* Fallback image: instantly visible before JS or canvas loads */}
      <img
        src="/images/home/frames/frame_001.jpg"
        alt="Roselin experience"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full block"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/15" />

      {/* FIRST TEXT — top-left on mobile, vertically-centered left on md+ */}
      <div
        ref={firstTextRef}
        className="
          absolute left-0 z-10 pointer-events-none
          top-[12%] w-full px-6
          sm:top-[10%] sm:px-12
          md:top-1/2 md:w-1/2 md:-translate-y-1/2 md:px-[6vw]
        "
      >
        <h2
          className="
            mb-3 font-astoria font-medium leading-[0.95] tracking-tight text-white
            text-[8.5vw]
            sm:text-5xl sm:mb-4
            md:text-6xl md:mb-6
            lg:text-7xl
          "
        >
          Built for
          <br />
          something greater.
        </h2>
        <p
          className="
            font-poppins leading-relaxed text-white/70
            text-[3.5vw] max-w-[85vw]
            sm:text-base sm:max-w-md
            md:text-lg
          "
        >
          Every detail is carefully designed to create an experience that feels
          considered, refined, and unmistakably different.
        </p>
      </div>

      {/* SECOND TEXT — bottom-left on mobile, vertically-centered right on md+ */}
      <div
        ref={secondTextRef}
        className="
          absolute left-0 z-10 pointer-events-none
          bottom-[10%] w-full px-6
          sm:bottom-[8%] sm:px-12
          md:bottom-auto md:right-0 md:left-auto md:top-1/2 md:w-1/2 md:-translate-y-1/2 md:px-[6vw]
        "
      >
        <h2
          className="
            mb-3 font-astoria font-medium leading-[0.95] tracking-tight text-white
            text-[8.5vw]
            sm:text-5xl sm:mb-4
            md:text-6xl md:mb-6
            lg:text-7xl
          "
        >
          Designed to
          <br />
          move forward.
        </h2>
        <p
          className="
            font-poppins leading-relaxed text-white/70
            text-[3.5vw] max-w-[85vw]
            sm:text-base sm:max-w-md
            md:text-lg
          "
        >
          From the first moment to the last, every transition is part of the
          story. Nothing is accidental.
        </p>
      </div>
    </section>
  );
};

export default SequenceSection;
