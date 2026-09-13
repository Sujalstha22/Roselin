"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: 1,
        src: "/images/product/Artboard 5.jpg",
        name: "Velvet Rouge",
        subtitle: "Long-wear Lip Colour",
        desc: "A richly pigmented formula that glides on with effortless precision — delivering bold, velvety colour that stays luminous from morning to midnight.",
        tag: "BESTSELLER",
    },
    {
        id: 2,
        src: "/images/product/Artboard 9.jpg",
        name: "Dew Veil Serum",
        subtitle: "Luminising Skin Serum",
        desc: "Infused with micro-actives and radiance boosters, this lightweight serum blurs pores and bathes skin in a lit-from-within glow.",
        tag: "NEW ARRIVAL",
    },
    {
        id: 3,
        src: "/images/product/Artboard 10.jpg",
        name: "Petal Blush",
        subtitle: "Sheer Cheek Tint",
        desc: "A whisper-light powder with buildable bloom — sculpt your glow from a barely-there flush to a sun-kissed radiance.",
        tag: "EDITORIAL PICK",
    },
    {
        id: 4,
        src: "/images/product/Artboard 12.jpg",
        name: "Silk Glaze",
        subtitle: "High-gloss Lip Treatment",
        desc: "Plump, protect, and perfect. This nourishing gloss delivers mirror-finish shine while conditioning your lips with every application.",
        tag: "TRENDING",
    },
    {
        id: 5,
        src: "/images/product/Artboard 16.jpg",
        name: "Noir Obsession",
        subtitle: "Defining Eye Liner",
        desc: "Precision meets drama. An ultra-fine, smudge-proof formula that draws the sharpest lines and stays flawless through every close-up.",
        tag: "CULT FAVOURITE",
    },
    {
        id: 6,
        src: "/images/product/Artboard 18.jpg",
        name: "Rose Elixir",
        subtitle: "Reviving Face Oil",
        desc: "A rare-rose infused face oil that melts into skin, replenishing moisture barriers and restoring a dewy, youthful suppleness overnight.",
        tag: "LUXE CARE",
    },
];

export default function Collections() {
    const [active, setActive] = useState(2); // default: artboard 10 (index 2)
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const prevActiveRef = useRef(active);

    // Animate info panel on active change
    const animateInfo = useCallback(() => {
        if (!infoRef.current) return;
        gsap.fromTo(
            infoRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
    }, []);

    useEffect(() => {
        if (prevActiveRef.current !== active) {
            prevActiveRef.current = active;
            animateInfo();
        }
    }, [active, animateInfo]);

    useGSAP(
        () => {
            // Title entrance
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Track entrance
            gsap.fromTo(
                trackRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Initial info animate
            animateInfo();
        },
        { scope: sectionRef }
    );

    const handlePrev = () =>
        setActive((p) => (p - 1 + products.length) % products.length);
    const handleNext = () => setActive((p) => (p + 1) % products.length);

    const getRelativeIndex = (idx: number) => {
        const diff = idx - active;
        const half = products.length / 2;
        if (diff > half) return diff - products.length;
        if (diff < -half) return diff + products.length;
        return diff;
    };

    const current = products[active];

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-background py-20 md:py-28"
        >
            {/* Subtle dot watermark */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, var(--color-burgundy) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                }}
            />

            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

                {/* ── TITLE ── */}
                <h2
                    ref={titleRef}
                    className="font-astoria text-burgundy mb-16 font-bold text-center text-6xl tracking-[0.35em] md:text-7xl lg:text-8xl uppercase"
                >
                    Collections
                </h2>

                {/* ── CAROUSEL TRACK + INFO ROW ── */}
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-0">

                    {/* ── CAROUSEL ── */}
                    <div
                        ref={trackRef}
                        className="relative flex w-full flex-1 items-end justify-center"
                        style={{ height: "420px", minHeight: "340px" }}
                    >
                        {products.map((product, idx) => {
                            const rel = getRelativeIndex(idx);
                            const isActive = rel === 0;
                            const absRel = Math.abs(rel);

                            // Only render visible range (-2 to +2)
                            if (absRel > 2) return null;

                            const xOffset = rel * 155;
                            const scale = isActive ? 1 : absRel === 1 ? 0.82 : 0.65;
                            const opacity = isActive ? 1 : absRel === 1 ? 0.75 : 0.4;
                            const zIndex = isActive ? 30 : absRel === 1 ? 20 : 10;
                            const translateY = isActive ? 0 : absRel === 1 ? 30 : 55;
                            const width = isActive ? 280 : absRel === 1 ? 170 : 140;
                            const height = isActive ? 380 : absRel === 1 ? 270 : 210;

                            return (
                                <button
                                    key={product.id}
                                    onClick={() => setActive(idx)}
                                    className="absolute bottom-0 flex flex-col items-center focus:outline-none"
                                    style={{
                                        transform: `translateX(${xOffset}px) translateY(${translateY}px) scale(${scale})`,
                                        opacity,
                                        zIndex,
                                        transition:
                                            "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease",
                                        width: `${width}px`,
                                        transformOrigin: "bottom center",
                                    }}
                                    aria-label={`View ${product.name}`}
                                >
                                    {/* Product image card */}
                                    <div
                                        className="relative overflow-hidden rounded-xl"
                                        style={{
                                            width: `${width}px`,
                                            height: `${height}px`,
                                            boxShadow: isActive
                                                ? "0 24px 60px rgba(74,16,36,0.18)"
                                                : "none",
                                            background: "var(--color-rose-mist)",
                                            transition: "box-shadow 0.45s ease, width 0.55s cubic-bezier(0.34,1.56,0.64,1), height 0.55s cubic-bezier(0.34,1.56,0.64,1)",
                                        }}
                                    >
                                        <Image
                                            src={product.src}
                                            alt={product.name}
                                            fill
                                            sizes="220px"
                                            className="object-cover object-center"
                                        />
                                        {/* Active frame accent */}
                                        {isActive && (
                                            <div
                                                className="pointer-events-none absolute inset-0 rounded-xl"
                                                style={{
                                                    boxShadow: "inset 0 0 0 2px rgba(74,16,36,0.2)",
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Name below non-active cards */}
                                    {!isActive && absRel <= 2 && (
                                        <p
                                            className="mt-2 truncate text-center text-[10px] font-medium uppercase tracking-[0.18em]"
                                            style={{ color: "var(--color-mocha)", maxWidth: `${width}px` }}
                                        >
                                            {product.name}
                                        </p>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* ── ACTIVE INFO PANEL ── */}
                    <div
                        ref={infoRef}
                        className="flex w-full flex-col justify-center lg:w-[30vw] lg:shrink-0 lg:pl-12"
                    >

                        {/* Product name */}
                        <h3
                            className="font-astoria text-4xl leading-tight md:text-5xl"
                            style={{ color: "var(--color-burgundy)" }}
                        >
                            {current.name}
                        </h3>

                        {/* Subtitle */}
                        <p
                            className="mt-1 text-xs font-semibold uppercase tracking-[0.2em]"
                            style={{ color: "var(--color-mocha)" }}
                        >
                            {current.subtitle}
                        </p>

                        {/* Divider */}
                        <div
                            className="my-4 h-px w-12"
                            style={{ background: "var(--color-blush)" }}
                        />

                        {/* Description */}
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--color-mocha)" }}
                        >
                            {current.desc}
                        </p>


                        {/* Pagination dots */}
                        <div className="mt-8 flex items-center gap-2">
                            {products.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActive(idx)}
                                    className="rounded-full transition-all duration-300"
                                    style={{
                                        width: active === idx ? "24px" : "6px",
                                        height: "6px",
                                        background:
                                            active === idx
                                                ? "var(--color-burgundy)"
                                                : "var(--color-blush)",
                                    }}
                                    aria-label={`Go to ${products[idx].name}`}
                                />
                            ))}
                        </div>

                        {/* Prev / Next arrows */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={handlePrev}
                                className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:bg-burgundy hover:text-white"
                                style={{
                                    borderColor: "var(--color-burgundy)",
                                    color: "var(--color-burgundy)",
                                }}
                                aria-label="Previous product"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M9 2L4 7L9 12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:bg-burgundy hover:text-white"
                                style={{
                                    borderColor: "var(--color-burgundy)",
                                    color: "var(--color-burgundy)",
                                }}
                                aria-label="Next product"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M5 2L10 7L5 12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
