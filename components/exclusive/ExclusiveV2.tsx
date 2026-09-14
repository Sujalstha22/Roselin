"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Rose images - add more entries here to extend the composition
const roseImages = [
    { src: "/images/about/about-rose.png", alt: "Rose bloom accent" },
    // { src: "/images/about/rose-2.png", alt: "Rose petal accent" },
];

const mainProducts = [
    {
        name: "Roselin Velvet Sculpt",
        subtitle: "Long-Wear Lip Colour",
        desc: "Richly pigmented velvet finish. Stays luminous from first light to final hour.",
        tag: "EXCLUSIVE",
        src: "/images/exclusive/1.png",
    },
    {
        name: "Roselin Luxe Satin",
        subtitle: "Satin Glow Collection",
        desc: "Silken colour meets all-day comfort. A shade made to be noticed and remembered.",
        tag: "LIMITED EDITION",
        src: "/images/exclusive/2.png",
    },
];

const secondaryProducts = [
    { src: "/images/exclusive/3.png", alt: "Roselin Crystal Shine" },
    { src: "/images/exclusive/4.png", alt: "Roselin Silk Blur" },
    { src: "/images/exclusive/5.png", alt: "Roselin Couture Cream" },
];

export default function ExclusiveV2() {
    const sectionRef = useRef<HTMLElement>(null);

    const roseTopLeftRef = useRef<HTMLDivElement>(null);
    const roseMidRightRef = useRef<HTMLDivElement>(null);
    const roseBottomRef = useRef<HTMLDivElement>(null);

    const product1Ref = useRef<HTMLDivElement>(null);
    const product2Ref = useRef<HTMLDivElement>(null);

    const secProd1Ref = useRef<HTMLDivElement>(null);
    const secProd2Ref = useRef<HTMLDivElement>(null);
    const secProd3Ref = useRef<HTMLDivElement>(null);

    const headlineRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const isMobile = () => window.innerWidth < 768;

            // Entrance animations (fire once on scroll-in, not scrubbed)
            gsap.fromTo(
                headlineRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            gsap.fromTo(
                taglineRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            // One main ScrollTrigger timeline for all parallax
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                },
            });

            const roseSpeed = isMobile() ? 0.5 : 1;
            tl.to(roseTopLeftRef.current, { y: -80 * roseSpeed, rotate: -6 }, 0);
            tl.to(roseMidRightRef.current, { y: 60 * roseSpeed, rotate: 8, scale: 1.06 }, 0);
            tl.to(roseBottomRef.current, { y: -40 * roseSpeed, rotate: -4 }, 0);

            const prodSpeed = isMobile() ? 0.6 : 1;
            tl.to(product1Ref.current, { y: -120 * prodSpeed }, 0);
            tl.to(product2Ref.current, { y: -60 * prodSpeed }, 0);

            const secSpeed = isMobile() ? 0.4 : 1;
            tl.to(secProd1Ref.current, { y: -90 * secSpeed }, 0);
            tl.to(secProd2Ref.current, { y: -50 * secSpeed, x: 10 }, 0);
            tl.to(secProd3Ref.current, { y: -140 * secSpeed, x: -8 }, 0);

            const cardSpeed = isMobile() ? 0.3 : 1;
            tl.to(card1Ref.current, { y: -70 * cardSpeed }, 0);
            tl.to(card2Ref.current, { y: -100 * cardSpeed }, 0);
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section
            ref={sectionRef}
            aria-label="Exclusive Roselin Collection"
            className="relative w-full overflow-hidden bg-background"

        >
            {/* Sticky canvas: fills viewport while page scrolls through 200vh */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">





                {/* Rose top-left, large */}
                <div
                    ref={roseTopLeftRef}
                    data-layer="about-rose"
                    aria-hidden="true"
                    className="pointer-events-none absolute z-[2]"
                    style={{ top: "-8%", left: "-4%", width: "clamp(220px, 38vw, 540px)" }}
                >
                    <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                        <Image
                            src={roseImages[0].src}
                            alt={roseImages[0].alt}
                            fill
                            sizes="(max-width: 768px) 55vw, 38vw"
                            className="object-contain drop-shadow-xl"
                        />
                    </div>
                </div>

                {/* Rose mid-right, flipped */}
                <div
                    ref={roseMidRightRef}
                    data-layer="about-rose"
                    aria-hidden="true"
                    className="pointer-events-none absolute z-[2]"
                    style={{ top: "35%", right: "-6%", width: "clamp(160px, 26vw, 380px)" }}
                >
                    <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                        <Image
                            src={roseImages[0].src}
                            alt={roseImages[0].alt}
                            fill
                            sizes="(max-width: 768px) 40vw, 26vw"
                            className="object-contain drop-shadow-lg opacity-85"
                            style={{ transform: "scaleX(-1)" }}
                        />
                    </div>
                </div>

                {/* Rose bottom-left, small */}
                <div
                    ref={roseBottomRef}
                    data-layer="about-rose"
                    aria-hidden="true"
                    className="pointer-events-none absolute z-[2]"
                    style={{ bottom: "4%", left: "8%", width: "clamp(100px, 16vw, 220px)" }}
                >
                    <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                        <Image
                            src={roseImages[0].src}
                            alt={roseImages[0].alt}
                            fill
                            sizes="(max-width: 768px) 28vw, 16vw"
                            className="object-contain opacity-60"
                        />
                    </div>
                </div>

                {/* ===== SECONDARY PRODUCT ACCENTS ===== */}

                {/* Secondary top-right */}
                <div
                    ref={secProd1Ref}
                    aria-hidden="true"
                    className="pointer-events-none absolute z-[5]"
                    style={{ top: "5%", right: "14%", width: "clamp(60px, 9vw, 130px)", opacity: 0.55 }}
                >
                    <div className="relative w-full" style={{ aspectRatio: "1/2.4" }}>
                        <Image src={secondaryProducts[0].src} alt={secondaryProducts[0].alt} fill sizes="(max-width: 768px) 14vw, 9vw" className="object-contain" />
                    </div>
                </div>

                {/* Secondary lower-left leaning */}
                <div
                    ref={secProd2Ref}
                    aria-hidden="true"
                    className="pointer-events-none absolute z-[5]"
                    style={{ bottom: "22%", left: "32%", width: "clamp(55px, 7.5vw, 110px)", opacity: 0.50, transform: "rotate(-12deg)" }}
                >
                    <div className="relative w-full" style={{ aspectRatio: "1/2.4" }}>
                        <Image src={secondaryProducts[1].src} alt={secondaryProducts[1].alt} fill sizes="(max-width: 768px) 12vw, 7.5vw" className="object-contain" />
                    </div>
                </div>

                {/* Secondary top-center behind headline */}
                <div
                    ref={secProd3Ref}
                    aria-hidden="true"
                    className="pointer-events-none absolute z-[3]"
                    style={{ top: "12%", left: "43%", width: "clamp(48px, 6vw, 90px)", opacity: 0.35, transform: "rotate(8deg)" }}
                >
                    <div className="relative w-full" style={{ aspectRatio: "1/2.4" }}>
                        <Image src={secondaryProducts[2].src} alt={secondaryProducts[2].alt} fill sizes="(max-width: 768px) 10vw, 6vw" className="object-contain" />
                    </div>
                </div>

                {/* ===== HEADLINE ===== */}
                <div
                    ref={headlineRef}
                    className="absolute z-20 text-center"
                    style={{ top: "6%", left: "50%", transform: "translateX(-50%)", width: "min(90vw, 680px)" }}
                >
                    <p className="font-poppins uppercase tracking-[0.28em] text-burgundy" style={{ fontSize: "clamp(9px, 1.1vw, 13px)" }}>
                        Roselin -- Exclusive Collection
                    </p>
                    <h2 className="font-astoria uppercase text-near-black leading-[0.92] mt-[0.6vw]" style={{ fontSize: "clamp(32px, 6.5vw, 96px)" }}>
                        Rare. Refined.
                        <br />
                        <span className="italic text-burgundy">Yours.</span>
                    </h2>
                </div>

                <div
                    ref={taglineRef}
                    className="absolute z-20 text-center"
                    style={{ top: "28%", left: "50%", transform: "translateX(-50%)", width: "min(80vw, 420px)" }}
                >
                    <p className="font-poppins text-mocha leading-relaxed" style={{ fontSize: "clamp(11px, 1.05vw, 15px)" }}>
                        Two shades. One philosophy.
                        <br />
                        Colour that earns its place.
                    </p>
                    <div
                        className="mx-auto mt-[1.4vw]"
                        style={{ width: "clamp(28px, 3vw, 44px)", height: "1px", background: "var(--color-burgundy)", opacity: 0.45 }}
                    />
                </div>

                {/* ===== MAIN PRODUCT 1 (left, large) ===== */}
                <div
                    ref={product1Ref}
                    className="absolute z-[10]"
                    style={{ bottom: "-2%", left: "clamp(16px, 5vw, 80px)", width: "clamp(140px, 22vw, 320px)" }}
                >
                    <div className="relative w-full" style={{ aspectRatio: "1/2.6" }}>
                        <Image src={mainProducts[0].src} alt={mainProducts[0].name} fill sizes="(max-width: 768px) 38vw, 22vw" className="object-contain drop-shadow-2xl" />
                    </div>
                </div>

                {/* Product 1 info card (light frosted) */}
                <div
                    ref={card1Ref}
                    className="absolute z-[15]"
                    style={{ bottom: "14%", left: "clamp(16px, 28vw, 420px)" }}
                >
                    <div
                        className="rounded-[1.2vw] px-[1.4vw] py-[1.1vw]"
                        style={{
                            background: "rgba(255,249,245,0.72)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            border: "1px solid rgba(201,24,74,0.14)",
                            boxShadow: "0 8px 40px rgba(74,16,36,0.10)",
                            width: "clamp(150px, 18vw, 260px)",
                        }}
                    >
                        <span className="font-poppins uppercase tracking-[0.22em] text-rose-red block" style={{ fontSize: "clamp(8px, 0.72vw, 10px)" }}>
                            {mainProducts[0].tag}
                        </span>
                        <h3 className="font-astoria text-near-black mt-[0.3vw] leading-tight" style={{ fontSize: "clamp(14px, 1.6vw, 22px)" }}>
                            {mainProducts[0].name}
                        </h3>
                        <p className="font-poppins text-mocha mt-[0.25vw]" style={{ fontSize: "clamp(8px, 0.72vw, 11px)" }}>
                            {mainProducts[0].subtitle}
                        </p>
                        <div style={{ height: "1px", background: "var(--color-blush)", margin: "clamp(6px, 0.7vw, 10px) 0" }} />
                        <p className="font-poppins text-mocha leading-relaxed" style={{ fontSize: "clamp(8px, 0.68vw, 10px)" }}>
                            {mainProducts[0].desc}
                        </p>

                    </div>
                </div>

                {/* ===== MAIN PRODUCT 2 (right, slightly smaller) ===== */}
                <div
                    ref={product2Ref}
                    className="absolute z-[9]"
                    style={{ bottom: "8%", right: "clamp(16px, 4vw, 70px)", width: "clamp(120px, 18vw, 270px)" }}
                >
                    <div className="relative w-full" style={{ aspectRatio: "1/2.6" }}>
                        <Image src={mainProducts[1].src} alt={mainProducts[1].name} fill sizes="(max-width: 768px) 32vw, 18vw" className="object-contain drop-shadow-2xl" />
                    </div>
                </div>

                {/* Product 2 info card (dark) */}
                <div
                    ref={card2Ref}
                    className="absolute z-[15]"
                    style={{ bottom: "38%", right: "clamp(16px, 23vw, 350px)" }}
                >
                    <div
                        className="rounded-[1.2vw] px-[1.4vw] py-[1.1vw]"
                        style={{
                            background: "rgba(74,16,36,0.78)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            border: "1px solid rgba(244,194,204,0.18)",
                            boxShadow: "0 8px 40px rgba(74,16,36,0.22)",
                            width: "clamp(150px, 18vw, 260px)",
                        }}
                    >
                        <span className="font-poppins uppercase tracking-[0.22em] text-blush block" style={{ fontSize: "clamp(8px, 0.72vw, 10px)" }}>
                            {mainProducts[1].tag}
                        </span>
                        <h3 className="font-astoria text-ivory mt-[0.3vw] leading-tight" style={{ fontSize: "clamp(14px, 1.6vw, 22px)" }}>
                            {mainProducts[1].name}
                        </h3>
                        <p className="font-poppins text-champagne mt-[0.25vw]" style={{ fontSize: "clamp(8px, 0.72vw, 11px)" }}>
                            {mainProducts[1].subtitle}
                        </p>
                        <div style={{ height: "1px", background: "rgba(244,194,204,0.3)", margin: "clamp(6px, 0.7vw, 10px) 0" }} />
                        <p className="font-poppins text-ivory/70 leading-relaxed" style={{ fontSize: "clamp(8px, 0.68vw, 10px)" }}>
                            {mainProducts[1].desc}
                        </p>

                    </div>
                </div>

            </div>
        </section>
    );
}