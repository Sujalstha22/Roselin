"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHeroV2() {
    const sectionRef = useRef<HTMLElement>(null);
    const imgWrapRef = useRef<HTMLDivElement>(null);
    const imgInnerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            // Image wrapper clip-reveal on load
            gsap.fromTo(
                imgWrapRef.current,
                { clipPath: "inset(10% 10% 10% 10% round 24px)", opacity: 0 },
                {
                    clipPath: "inset(0% 0% 0% 0% round 24px)",
                    opacity: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    },
                }
            );

            // Parallax — inner image drifts up as user scrolls down
            gsap.fromTo(
                imgInnerRef.current,
                { y: 0 },
                {
                    y: -80,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.4,
                    },
                }
            );

            // Title entrance
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                }
            );

            // Paragraph entrance
            gsap.fromTo(
                paraRef.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.55,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-background select-none"
        >
            {/* ── HERO IMAGE (rounded, parallax inner) ── */}
            <div
                ref={imgWrapRef}
                className="relative mx-4 mt-2 overflow-hidden sm:mx-6 md:mx-10 lg:mx-4"
                style={{
                    borderRadius: "24px",
                    height: "clamp(320px, 70vh, 680px)",
                    opacity: 0, // GSAP will animate this in
                }}
            >
                {/* Inner div drifts for parallax */}
                <div
                    ref={imgInnerRef}
                    className="absolute inset-[-80px] w-[calc(100%+0px)] overflow-hidden"
                    style={{ top: "-80px", bottom: "-80px", left: 0, right: 0 }}
                >
                    <Image
                        src="/images/about/heroV2.jpeg"
                        alt="Our Essence — Roselin"
                        fill
                        priority
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 80vw"
                        className="object-cover object-top"
                    />
                    {/* Subtle vignette bottom fade into bg-background */}
                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                        style={{
                            background:
                                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15))",
                        }}
                    />
                </div>

                {/* Thin burgundy inset border on image */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        borderRadius: "24px",
                        boxShadow: "inset 0 0 0 1.5px rgba(74,16,36,0.12)",
                    }}
                />
            </div>

            {/* ── EDITORIAL TEXT BLOCK ── */}
            <div
                className="
                    mx-4 mt-2 flex flex-col items-start gap-0
                    sm:mx-6
                    md:mx-10 md:flex-row md:items-end md:justify-between
                    lg:mx-14
                "
            >
                {/* Giant title — left anchored */}
                <h1
                    ref={titleRef}
                    className="
                        text-[clamp(4rem,14vw,10rem)]

                        text-burgundy
                        opacity-0
                        leading-[0.88]
                        tracking-tight
                        md:text-[clamp(4rem,8vw,8rem)]
                        lg:text-[clamp(5rem,7.5vw,7.5rem)]
                    "

                >
                    Our <br /> Essence
                </h1>

                {/* Right-side paragraph + thin divider */}
                <div
                    ref={paraRef}
                    className="
                        mb-3 flex max-w-xs flex-col gap-3
                        opacity-0
                        md:mb-6 md:max-w-[280px]
                        lg:max-w-sm lg:mb-8
                    "

                >
                    {/* Horizontal rule accent */}
                    <div
                        className="h-px w-10 text-burgundy opacity-0.35"

                    />
                    <p
                        className="font-poppins text-md leading-relaxed text-mocha"

                    >
                        Roselin is where refined color meets effortless confidence.
                        Each shade is thoughtfully crafted to celebrate individuality,
                        elevate every expression, and leave a lasting impression.
                    </p>
                </div>
            </div>
        </section>
    );
}
