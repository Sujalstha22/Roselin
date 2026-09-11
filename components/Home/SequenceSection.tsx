"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

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

      const context = canvas.getContext("2d");
      if (!context) return;

      /* =====================================================
         IMAGE SEQUENCE PRELOADING & CACHING
         ===================================================== */
      const images: HTMLImageElement[] = new Array(FRAME_COUNT);
      let currentFrameIndex = 0;

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

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(image, x, y, width, height);
      };

      const renderFrame = (index: number) => {
        const targetIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
        currentFrameIndex = targetIndex;
        const image = images[targetIndex];

        if (image && image.complete && image.naturalWidth > 0) {
          drawImageToCanvas(image);
          return;
        }

        // Fallback to closest loaded frame
        for (let offset = 1; offset < 25; offset++) {
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

      // Load 136 frames from /images/home/frames/
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameNumber = String(i + 1).padStart(3, "0");
        img.src = `/images/home/frames/frame_${frameNumber}.jpg`;

        img.onload = () => {
          if (i === currentFrameIndex || (currentFrameIndex === 0 && i === 0)) {
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
        // Cap DPR at 1.5 on mobile to reduce GPU/memory pressure
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        renderFrame(currentFrameIndex);
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas, { passive: true });

      /* =====================================================
         SPLIT TEXT SETUP
         ===================================================== */
      const firstHeading = firstText.querySelector("h2");
      const firstParagraph = firstText.querySelector("p");
      const secondHeading = secondText.querySelector("h2");
      const secondParagraph = secondText.querySelector("p");

      let firstHeadingSplit: SplitText | null = null;
      let firstParagraphSplit: SplitText | null = null;
      let secondHeadingSplit: SplitText | null = null;
      let secondParagraphSplit: SplitText | null = null;

      let firstLines: HTMLElement[] = [];
      let secondLines: HTMLElement[] = [];

      try {
        if (firstHeading && firstParagraph && secondHeading && secondParagraph) {
          firstHeadingSplit = new SplitText(firstHeading, { type: "lines" });
          firstParagraphSplit = new SplitText(firstParagraph, { type: "lines" });
          secondHeadingSplit = new SplitText(secondHeading, { type: "lines" });
          secondParagraphSplit = new SplitText(secondParagraph, { type: "lines" });

          firstLines = [
            ...(firstHeadingSplit.lines as HTMLElement[]),
            ...(firstParagraphSplit.lines as HTMLElement[]),
          ];
          secondLines = [
            ...(secondHeadingSplit.lines as HTMLElement[]),
            ...(secondParagraphSplit.lines as HTMLElement[]),
          ];
        }
      } catch (err) {
        firstLines = [firstHeading, firstParagraph].filter(Boolean) as HTMLElement[];
        secondLines = [secondHeading, secondParagraph].filter(Boolean) as HTMLElement[];
      }

      const isMobile = window.innerWidth < 768;
      const slideDistance = isMobile ? 20 : 40;

      gsap.set(firstLines, { opacity: 1, x: 0 });
      gsap.set(secondLines, { opacity: 0, x: slideDistance });
      gsap.set(secondText, { opacity: 1 });

      /* =====================================================
         MAIN SCROLL TIMELINE
         ===================================================== */
      const frameObject = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          refreshPriority: 5,
          anticipatePin: 1,
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

      tl.to(
        firstLines,
        {
          opacity: 0,
          x: isMobile ? 30 : 60,
          stagger: { each: 0.05, from: "start" },
          duration: 1.5,
          ease: "power2.inOut",
        },
        3
      );

      tl.to(
        secondLines,
        {
          opacity: 1,
          x: 0,
          stagger: { each: 0.05, from: "start" },
          duration: 1.5,
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

        firstHeadingSplit?.revert();
        firstParagraphSplit?.revert();
        secondHeadingSplit?.revert();
        secondParagraphSplit?.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black will-change-transform"
    >
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
