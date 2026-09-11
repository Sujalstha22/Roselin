"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// import { usePreloader } from "@/providers/PreloaderProvider";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const exclusiveLists = [
    {
        name: "Roselin Velvet Sculpt Lipstick",
        image: "/images/exclusive/1.png",
    },
    {
        name: "Roselin Luxe Satin Lipstick",
        image: "/images/exclusive/2.png",
    },
    {
        name: "Roselin Crystal Shine Lipstick",
        image: "/images/exclusive/3.png",
    },
    {
        name: "Roselin Silk Blur Lipstick",
        image: "/images/exclusive/4.png",
    },
    {
        name: "Roselin Couture Cream Lipstick",
        image: "/images/exclusive/5.png",
    },
    {
        name: "Roselin Signature Lipstick",
        image: "/images/exclusive/6.png",
    },
];
// Fixed x-position based on product index: even = left (30%), odd = right (70%)
const getProductX = (index: number) => (index % 2 === 0 ? 30 : 70);

// Depth slots (no x — that's per-product)
const DEPTHS = [
    // Slot 0 — Front (resting on water surface)
    { y: 58, z: 0, scale: 1, opacity: 1 },
    // Slot 1 — Middle (receded towards horizon, lowered to keep base on water)
    { y: 61.5, z: -250, scale: 0.72, opacity: 0.55 },
    // Slot 2 — Back (deep near horizon, lowered to keep base on water)
    { y: 65, z: -500, scale: 0.45, opacity: 0.3 },
];

// Exit: flies FORWARD past the camera
const DEPTH_EXIT = { y: 55, z: 400, scale: 1.25, opacity: 0 };

// Enter: materialises from deep near the horizon
const DEPTH_ENTER = { y: 66.5, z: -750, scale: 0.15, opacity: 0 };

type DepthCfg = typeof DEPTH_EXIT;

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function lerpDepth(a: DepthCfg, b: DepthCfg, t: number): DepthCfg {
    return {
        y: lerp(a.y, b.y, t),
        z: lerp(a.z, b.z, t),
        scale: lerp(a.scale, b.scale, t),
        opacity: lerp(a.opacity, b.opacity, t),
    };
}

const NUM_VISIBLE = 3;
const TOTAL_PRODUCTS = exclusiveLists.length;

function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

function getRelativePos(i: number, progress: number): number {
    let diff = mod(i - progress, TOTAL_PRODUCTS);
    if (diff >= TOTAL_PRODUCTS - 1) diff -= TOTAL_PRODUCTS;
    return diff;
}

const ExclusiveSection = () => {
    //   const { isPreloaderDone } = usePreloader();
    const sectionRef = useRef<HTMLElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const productRefs = useRef<(HTMLDivElement | null)[]>([]);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !sceneRef.current) return;

            const els = productRefs.current;
            const START_P = TOTAL_PRODUCTS * 100; // 600 (multiple of 6, starting at index 0)
            let targetP = START_P;
            let currentP = START_P;
            let targetMouseX = 0;
            let currentMouseX = 0;

            /* ── core: map scroll progress + mouse parallax → product transforms ── */
            const update = (progress: number, mouseX: number) => {
                els.forEach((el, i) => {
                    if (!el) return;

                    // Modular relative distance from front slot
                    const rel = getRelativePos(i, progress);

                    // Off-screen guard
                    if (rel <= -1 || rel >= NUM_VISIBLE) {
                        el.style.visibility = "hidden";
                        return;
                    }

                    el.style.visibility = "visible";
                    let depth: DepthCfg;

                    if (rel < 0) {
                        // Exiting forward (front → past camera)
                        const t = -rel;
                        depth = lerpDepth(DEPTHS[0], DEPTH_EXIT, t * t);
                    } else if (rel < 1) {
                        // Between front and middle
                        depth = lerpDepth(DEPTHS[0], DEPTHS[1], rel);
                    } else if (rel < 2) {
                        // Between middle and back
                        depth = lerpDepth(DEPTHS[1], DEPTHS[2], rel - 1);
                    } else {
                        // Entering from deep back
                        const t = rel - 2;
                        depth = lerpDepth(DEPTHS[2], DEPTH_ENTER, t * t);
                    }

                    // Depth parallax multiplier: front product moves slightly more than back product
                    const clampRel = Math.min(Math.max(rel, 0), 2);
                    const depthMultiplier = lerp(0.85, 0.25, clampRel / 2);

                    // Mouse left (mouseX < 0) → products move right (positive shift)
                    // Mouse right (mouseX > 0) → products move left (negative shift)
                    const parallaxShift = -mouseX * 2.0 * depthMultiplier;

                    const baseX = getProductX(i);
                    const posX = baseX + parallaxShift;

                    // Hardware-accelerated translate3d transforms (no top/left reflow triggers)
                    el.style.transform = `translate3d(calc(${posX}vw - 50%), calc(${depth.y}vh - 50%), ${depth.z}px) scale(${depth.scale})`;
                    el.style.opacity = `${Math.max(0, depth.opacity)}`;
                    el.style.zIndex = `${100 - Math.round(rel * 10)}`;
                });

                // ── Camera tracking: shift perspectiveOrigin towards front product ──
                const sceneEl = sceneRef.current;
                if (sceneEl) {
                    const frontIdxRaw = Math.floor(progress);
                    const frac = progress - frontIdxRaw;
                    const currentFrontIdx = mod(frontIdxRaw, TOTAL_PRODUCTS);
                    const nextFrontIdx = mod(frontIdxRaw + 1, TOTAL_PRODUCTS);

                    // Get the x-position of the current and next front products
                    const currentX = getProductX(currentFrontIdx);
                    const nextX = getProductX(nextFrontIdx);

                    // Smoothly interpolate the camera x-position between current and next front product
                    const cameraX = lerp(currentX, nextX, frac);

                    // Map product x (30-70) to a subtle perspectiveOrigin shift (42%-58%)
                    const perspX = lerp(42, 58, (cameraX - 30) / 40);
                    sceneEl.style.perspectiveOrigin = `${perspX}% 48%`;
                }

                // ── HUD updates ──
                const frontRaw = Math.round(progress);
                const frontIdx = mod(frontRaw, TOTAL_PRODUCTS);

                // Product name with smooth crossfade (fades to 0 at midpoint dist = 0.5 instead of 0.25)
                if (nameRef.current) {
                    nameRef.current.textContent = exclusiveLists[frontIdx].name;
                    const dist = Math.abs(progress - Math.round(progress));
                    nameRef.current.style.opacity = `${Math.max(0, 1 - dist * 2)}`;
                }

                // Counter
                if (counterRef.current) {
                    counterRef.current.textContent = `${String(frontIdx + 1).padStart(2, "0")} / ${String(TOTAL_PRODUCTS).padStart(2, "0")}`;
                }

                // Progress bar
                if (barRef.current) {
                    const loopProgress = mod(progress, TOTAL_PRODUCTS) / TOTAL_PRODUCTS;
                    barRef.current.style.transform = `scaleX(${loopProgress})`;
                }
            };

            // Render initial state
            update(START_P, 0);

            // Smooth lerp loop on GSAP ticker with idle check for high efficiency
            const tick = () => {
                const deltaP = Math.abs(targetP - currentP);
                const deltaM = Math.abs(targetMouseX - currentMouseX);

                if (deltaP > 0.0001 || deltaM > 0.001) {
                    const isMobileOrTablet = window.innerWidth < 1024;
                    const lerpFactor = isMobileOrTablet ? 0.16 : 0.08;
                    currentP += (targetP - currentP) * lerpFactor;
                    currentMouseX += (targetMouseX - currentMouseX) * lerpFactor;
                    update(currentP, currentMouseX);
                }
            };

            gsap.ticker.add(tick);

            // Mousemove listener scoped to section
            const handleMouseMove = (e: MouseEvent) => {
                targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            };

            // Wheel listener scoped to section
            const handleWheel = (e: WheelEvent) => {
                const delta = e.deltaY * 0.0015;
                targetP += delta;
            };

            // Touch handlers for mobile devices
            let touchStartY = 0;
            const handleTouchStart = (e: TouchEvent) => {
                touchStartY = e.touches[0].clientY;
            };

            const handleTouchMove = (e: TouchEvent) => {
                const touchY = e.touches[0].clientY;
                const deltaY = touchStartY - touchY;
                touchStartY = touchY;
                const isMobileOrTablet = window.innerWidth < 1024;
                const touchSensitivity = isMobileOrTablet ? 0.008 : 0.003;
                targetP += deltaY * touchSensitivity;
            };

            const sectionEl = sectionRef.current;
            sectionEl.addEventListener("wheel", handleWheel, { passive: true });
            sectionEl.addEventListener("touchstart", handleTouchStart, {
                passive: true,
            });
            sectionEl.addEventListener("touchmove", handleTouchMove, {
                passive: true,
            });
            sectionEl.addEventListener("mousemove", handleMouseMove, {
                passive: true,
            });

            return () => {
                gsap.ticker.remove(tick);
                sectionEl.removeEventListener("wheel", handleWheel);
                sectionEl.removeEventListener("touchstart", handleTouchStart);
                sectionEl.removeEventListener("touchmove", handleTouchMove);
                sectionEl.removeEventListener("mousemove", handleMouseMove);
            };
        },
        {
            scope: sectionRef,
            dependencies: [],
        },
    );

    return (
        <section ref={sectionRef} className="p-0 h-dvh relative overflow-hidden">
            <div className="absolute inset-0">
                <video
                    src={"/videos/exclusive-video.mp4"}
                    preload="none"
                    loop
                    autoPlay
                    muted
                    playsInline
                    className="object-cover w-full h-full pointer-events-none"
                />
            </div>
            <div className="absolute top-[14vh] left-0 right-0 text-center z-20 pointer-events-none">
                <h2 className="text-2xl md:text-4xl xl:text-[3vw] tracking-tight font-astoria">
                    Exclusive Collection
                </h2>

                <span
                    ref={counterRef}
                    className="text-[10px] md:text-xs xl:text-[0.8vw] tracking-widest text-foreground/80 font-mono tabular-nums"
                >
                    01 / {String(exclusiveLists.length).padStart(2, "0")}
                </span>
            </div>

            <div
                ref={sceneRef}
                className="absolute inset-0"
                style={{
                    perspective: "1200px",
                    perspectiveOrigin: "50% 48%",
                    zIndex: 10,
                }}
            >
                <div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {exclusiveLists.map((product, index) => (
                        <div
                            key={product.name}
                            ref={(el) => {
                                productRefs.current[index] = el;
                            }}
                            className="absolute group"
                            style={{
                                width: "clamp(180px, 25vw, 340px)",
                                transformStyle: "preserve-3d",
                                willChange: "transform, opacity, filter",
                                visibility: "hidden",
                            }}
                        >
                            <div
                                className="relative w-full xl:min-w-[20vw] aspect-square transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                                style={{
                                    WebkitBoxReflect:
                                        "below 4px linear-gradient(transparent 25%, rgba(0, 0, 0, 0.35))",
                                }}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-[15vh] left-0 right-0 z-20 pointer-events-none">
                <div className="text-center">
                    <h3 ref={nameRef} className="text-xl font-astoria md:text-3xl xl:text-[2.5vw]">
                        {exclusiveLists[0].name}
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default ExclusiveSection;