"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 4 full-height images for the center scrolling column (pure visuals, no text overlay)
const CENTER_IMAGES = [
    {
        src: "/images/about/abt-1.jpg",
        alt: "Lumina Skincare Ritual",
    },
    {
        src: "/images/about/about-hero.jpeg",
        alt: "Lumina Architectural Essence",
    },
    {
        src: "/images/about/abt-5.jpg",
        alt: "Lumina Night Serum",
    },

];

// 4 images for the left column (slight overflow & upward parallax)
const LEFT_IMAGES = [
    {
        src: "/images/about/abt-4.jpg",
        alt: "Lumina Crystal Ritual Left 1",
    },
    {
        src: "/images/home/exp-1.jpg",
        alt: "Lumina Botanical Left 2",
    },
    {
        src: "/images/about/abt-2.jpg",
        alt: "Lumina Bloom Left 3",
    },
    {
        src: "/images/home/exp-3.jpg",
        alt: "Lumina Glass Left 4",
    },
];

// 4 images for the right column (slight overflow & upward parallax)
const RIGHT_IMAGES = [
    {
        src: "/images/about/abt-3.jpg",
        alt: "Lumina Strapped Gown Right 1",
    },
    {
        src: "/images/home/exp-2.jpg",
        alt: "Lumina Texture Right 2",
    },
    {
        src: "/images/about/about-1.jpeg",
        alt: "Lumina Editorial Form Right 3",
    },
    {
        src: "/images/home/exp-4.jpg",
        alt: "Lumina Silhouette Right 4",
    },
];

const PhotoGallery: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const leftEl = leftRef.current;
            const rightEl = rightRef.current;
            const centerEl = centerRef.current;

            if (!section || !leftEl || !rightEl || !centerEl) return;

            const isMobile = window.innerWidth < 768;

            gsap.set(centerEl, { y: 0 });

            // Skip side-column animations on mobile (columns are hidden)
            if (!isMobile) {
                gsap.set(leftEl, {
                    y: 0,
                    xPercent: -15,
                    scale: 0.92,
                    opacity: 0.85,
                    transformOrigin: "left center",
                });

                gsap.set(rightEl, {
                    y: 0,
                    xPercent: 15,
                    scale: 0.92,
                    opacity: 0.85,
                    transformOrigin: "right center",
                });
            }

            // Timeline scrubbed to page scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                },
            });

            if (!isMobile) {
                // Left column: moves upwards faster, scales up, and shifts inwards
                tl.to(
                    leftEl,
                    {
                        y: -650,
                        xPercent: 20,
                        scale: 1.03,
                        opacity: 1,
                        ease: "none",
                    },
                    0
                );

                // Right column: moves upwards faster, scales up, and shifts inwards
                tl.to(
                    rightEl,
                    {
                        y: -580,
                        xPercent: 0,
                        scale: 1.03,
                        opacity: 1,
                        ease: "none",
                    },
                    0
                );
            }

            // Center column: slow counter-scroll
            tl.to(
                centerEl,
                {
                    y: isMobile ? 120 : 320,
                    ease: "none",
                },
                0
            );
        },
        { scope: sectionRef }
    );

    const handleScrollDown = () => {
        window.scrollBy({
            top: window.innerHeight * 0.9,
            behavior: "smooth",
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative md:h-[380vh] w-full bg-burgundy text-white select-none overflow-clip  "
        >
            {/* 3-Column Grid System */}
            <div className="relative w-full grid grid-cols-1 md:grid-cols-12 min-h-screen">
                {/* ================= LEFT SECTION (4 IMAGES, UPWARD PARALLAX & INWARD GSAP) ================= */}
                <aside className="hidden md:block md:col-span-3 z-10 overflow-visible pointer-events-none">
                    <div
                        ref={leftRef}
                        className="flex flex-col gap-24 lg:gap-32 pt-16 pb-32 w-full items-start will-change-transform"
                    >
                        {LEFT_IMAGES.map((img, idx) => (
                            <div
                                key={idx}
                                className="relative -ml-16 lg:-ml-34 xl:-ml-38 w-[75%] lg:w-[130%] h-[80vh] lg:h-[95vh] max-h-[720px] overflow-hidden rounded-xs shadow-2xl border border-white/10 group"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 1024px) 35vw, 30vw"
                                    priority={idx === 0}
                                    className="object-cover object-center filter grayscale contrast-115 brightness-90 group-hover:scale-103 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/50 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </aside>

                {/* ================= CENTER COLUMN (4 IMAGES OF H-SVH, VERY SLOW SCROLL) ================= */}
                <div
                    ref={centerRef}
                    className="col-span-1 md:col-span-6 flex flex-col items-center w-full z-20 will-change-transform"
                >
                    {CENTER_IMAGES.map((img, idx) => (
                        <div
                            key={idx}
                            id={`gallery-item-${idx}`}
                            className="relative w-full flex flex-col items-center justify-center py-6 sm:py-8 md:py-10"
                        >
                            {/* 9:16 Portrait Frame */}
                            <div
                                className="
                                    relative
                                    w-[92vw] sm:w-[70vw] md:w-[38vw] lg:w-[34vw] xl:w-[30vw]
                                    aspect-[9/16]
                                    overflow-hidden rounded-sm
                                    shadow-[0_25px_60px_rgba(0,0,0,0.95)]
                                    border border-white/15
                                    group
                                "
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 640px) 92vw, (max-width: 768px) 70vw, (max-width: 1024px) 38vw, 30vw"
                                    priority={idx === 0}
                                    className="object-cover object-center filter contrast-115 brightness-95 group-hover:scale-103 transition-transform duration-1000 ease-out"
                                />
                                {/* Subtle dark vignette */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= RIGHT SECTION (4 IMAGES, UPWARD PARALLAX & INWARD GSAP) ================= */}
                <aside className="hidden md:block md:col-span-3 z-10 overflow-visible pointer-events-none">
                    <div
                        ref={rightRef}
                        className="flex flex-col gap-24 lg:gap-32 pt-16 pb-32 w-full items-end will-change-transform"
                    >
                        {RIGHT_IMAGES.map((img, idx) => (
                            <div
                                key={idx}
                                className="relative -mr-16 lg:-mr-24 xl:-mr-28 w-[75%] lg:w-[130%] h-[80vh] lg:h-[95vh] max-h-[720px] overflow-hidden rounded-xs shadow-2xl border border-white/10 group"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 1024px) 35vw, 30vw"
                                    priority={idx === 0}
                                    className="object-cover object-center filter grayscale contrast-115 brightness-90 group-hover:scale-103 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/50 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default PhotoGallery;
