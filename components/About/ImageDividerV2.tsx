"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ImageDividerV2() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const textWrapRef = useRef<HTMLDivElement>(null);
    const cardsWrapRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                // Drift image smoothly
                gsap.fromTo(
                    imageWrapRef.current,
                    { opacity: 0, x: -60, scale: 0.95 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1.4,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                        },
                    }
                );

                gsap.to(imageWrapRef.current, {
                    y: -30,
                    scale: 1.15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.4,
                    },
                });

                // Overlapping Text Reveal
                gsap.fromTo(
                    textWrapRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: 0.15,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                        },
                    }
                );

                // Top Right Glass Cards Reveal
                gsap.fromTo(
                    cardsWrapRef.current,
                    { opacity: 0, x: 40, scale: 0.95 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: 0.3,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                        },
                    }
                );
            });

            mm.add("(max-width: 767px)", () => {
                gsap.fromTo(
                    imageWrapRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                        },
                    }
                );

                gsap.fromTo(
                    textWrapRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        delay: 0.1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                        },
                    }
                );

                gsap.fromTo(
                    cardsWrapRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                        },
                    }
                );
            });

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen min-h-[600px] overflow-hidden select-none flex items-center justify-between"
            style={{
                background:
                    "radial-gradient(ellipse at 70% 35%, #5a142c 0%, #440e21 40%, #260613 75%, #17020a 100%)",
            }}
        >

            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[15vh] z-0"
                style={{
                    background:
                        "linear-gradient(to bottom, #ededed 0%, #ededed 45%, transparent 100%)",
                }}
            />

            {/* Background lighting & textures */}

            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                    background:
                        "radial-gradient(circle at 80% 25%, rgba(244, 194, 204, 0.15) 0%, transparent 50%)",
                }}
            />



            {/* ── BACKGROUND / OVERLAPPING TYPOGRAPHY (Lower z-index z-10) ── */}
            <div
                ref={textWrapRef}
                className="
                    absolute z-10 pointer-events-none
                    left-[25vw] sm:left-[24vw] md:left-[28vw] lg:left-[32vw] xl:left-[42vw]
                    bottom-[8vh] sm:bottom-[10vh] md:bottom-[12vh] lg:bottom-[14vh]
                    max-w-[78vw] sm:max-w-[70vw] md:max-w-[62vw] lg:max-w-[55vw]
                "
            >
                <h2
                    className="
                        font-astoria uppercase font-bold text-white
                        tracking-wide leading-[1.08]
                        text-[clamp(1.5rem,4.2vw,4.5rem)]
                        drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]
                    "
                    style={{
                        letterSpacing: "0.03em",
                    }}
                >
                    ... Our lipsticks are crafted where luxury meets artistry, blending rich pigment
                </h2>
            </div>

            <div
                ref={imageWrapRef}
                className="
                    absolute 
                    bottom-0 
                    w-[100vw] sm:w-[85vw] md:w-[75vw] lg:w-[68vw] xl:w-[62vw]
                    h-full z-20 pointer-events-none
                    flex items-end md:items-center justify-start
                "
                style={{
                    filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6))",
                }}
            >
                <div className="relative w-full h-[85vh] sm:h-[90vh] md:h-[95vh] lg:h-[98vh] max-h-screen">
                    <Image
                        src="/images/about/divider-image-v2.png"
                        alt="Hydrating Toner with Botanical Extracts"
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 65vw"
                        className="object-contain object-bottom md:object-left-center"
                    />
                </div>
            </div>
        </section>
    );
}
