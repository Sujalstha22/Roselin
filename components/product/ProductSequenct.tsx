"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const FRAME_COUNT = 200;

const ProductSequenct = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useGSAP(
        () => {
            const section = sectionRef.current;
            const canvas = canvasRef.current;


            if (!section || !canvas) return;

            const context = canvas.getContext("2d");
            if (!context) return;

            /* =====================================================
               IMAGE SEQUENCE PRELOADING & CACHING
               ===================================================== */
            const images: HTMLImageElement[] = new Array(FRAME_COUNT);
            let currentFrameIndex = 0;

            // Draw helper function (immediate synchronous render for instant 60fps tracking)
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

                // Fallback: if exact frame is loading, render the closest loaded neighbor
                for (let offset = 1; offset < 30; offset++) {
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

            // Load all 200 frames
            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                const frameNumber = String(i + 1).padStart(3, "0");
                img.src = `/images/product/product-sequence/frame_${frameNumber}.jpg`;

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
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
               MAIN SCROLL TIMELINE (200 FRAMES)
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
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const frame = Math.round(self.progress * (FRAME_COUNT - 1));
                        renderFrame(frame);
                    },
                },
            });

            // Frame animation from 0 to 199
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



            // Refresh ScrollTrigger to calculate accurate coordinates
            ScrollTrigger.refresh();

            /* =====================================================
               CLEANUP
               ===================================================== */
            return () => {
                window.removeEventListener("resize", resizeCanvas);

            };
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-burgundy will-change-transform"
        >
            {/* 200-Frame Sequence Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full block"
            />

            {/* Ambient Dark Burgundy Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-burgundy/10" />

        </section>
    );
};

export default ProductSequenct;
