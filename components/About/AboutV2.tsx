"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutV2() {
    const sectionRef = useRef<HTMLElement>(null);

    const portraitRef = useRef<HTMLDivElement>(null);
    const productThumbRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);

    const midWrapRef = useRef<HTMLDivElement>(null);
    const midTextRef = useRef<HTMLDivElement>(null);

    const bottomRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                const mm = gsap.matchMedia();

                mm.add("(min-width: 768px)", () => {
                    gsap.fromTo(
                        portraitRef.current,
                        {
                            clipPath: "inset(8% 0% 8% 0% round 18px)",
                            opacity: 0,
                        },
                        {
                            clipPath: "inset(0% 0% 0% 0% round 18px)",
                            opacity: 1,
                            duration: 1.3,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: portraitRef.current,
                                start: "top 90%",
                            },
                        }
                    );

                    gsap.fromTo(
                        productThumbRef.current,
                        {
                            opacity: 0,
                            scale: 0.82,
                            y: -18,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "back.out(1.7)",
                            delay: 0.35,
                            scrollTrigger: {
                                trigger: portraitRef.current,
                                start: "top 88%",
                            },
                        }
                    );

                    gsap.fromTo(
                        headlineRef.current,
                        {
                            opacity: 0,
                            y: 30,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power3.out",
                            delay: 0.15,
                            scrollTrigger: {
                                trigger: headlineRef.current,
                                start: "top 92%",
                            },
                        }
                    );
                });

                mm.add("(max-width: 767px)", () => {
                    gsap.fromTo(
                        portraitRef.current,
                        {
                            clipPath: "inset(7% 0% 7% 0% round 16px)",
                            opacity: 0,
                        },
                        {
                            clipPath: "inset(0% 0% 0% 0% round 16px)",
                            opacity: 1,
                            duration: 1.1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: portraitRef.current,
                                start: "top 90%",
                            },
                        }
                    );

                    gsap.fromTo(
                        productThumbRef.current,
                        {
                            opacity: 0,
                            scale: 0.85,
                            y: -12,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "back.out(1.6)",
                            scrollTrigger: {
                                trigger: portraitRef.current,
                                start: "top 82%",
                            },
                        }
                    );

                    gsap.fromTo(
                        headlineRef.current,
                        {
                            opacity: 0,
                            y: 22,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: headlineRef.current,
                                start: "top 90%",
                            },
                        }
                    );
                });

                gsap.fromTo(
                    midWrapRef.current,
                    {
                        opacity: 0,
                        y: 40,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: midWrapRef.current,
                            start: "top 88%",
                        },
                    }
                );

                gsap.to(midWrapRef.current, {
                    y: -40,
                    ease: "none",
                    scrollTrigger: {
                        trigger: midWrapRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.4,
                    },
                });

                gsap.fromTo(
                    midTextRef.current,
                    {
                        opacity: 0,
                        x: 24,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: midWrapRef.current,
                            start: "top 82%",
                        },
                    }
                );

                gsap.fromTo(
                    bottomRef.current,
                    {
                        opacity: 0,
                        y: 28,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: bottomRef.current,
                            start: "top 90%",
                        },
                    }
                );

                return () => mm.revert();
            }, sectionRef);

            return () => ctx.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-background mt-4"
        >
            <div className="absolute h-screen bg-blush/20 top-1/4 w-full" />

            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10">
                <div
                    className="
                        relative
                        h-[430px]
                        sm:h-[520px]
                        md:h-[600px]
                        lg:h-[680px]
                        xl:h-[720px]
                    "
                >
                    {/* =================================================
                        PORTRAIT
                    ================================================= */}

                    <div
                        ref={portraitRef}
                        className="
                            absolute
                            overflow-hidden
                            rounded-xl
                            md:rounded-2xl
                        "
                        style={{
                            width: "40vw",
                            maxWidth: "560px",
                            height: "72%",
                            minHeight: "310px",
                            left: "clamp(12px, 3vw, 48px)",
                            top: "4%",
                            opacity: 0,
                        }}
                    >
                        <Image
                            src="/images/about/jisoo.jpeg"
                            alt="Make a statement with scarlet shades"
                            fill
                            priority
                            sizes="40vw"
                            className="object-cover object-top"
                        />

                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(200deg, rgba(201,24,74,0.05) 0%, transparent 55%)",
                            }}
                        />
                    </div>

                    {/* =================================================
                        PRODUCT IMAGE
                    ================================================= */}

                    <div
                        ref={productThumbRef}
                        className="
                            absolute
                            overflow-hidden
                            rounded-xl
                            md:rounded-2xl
                        "
                        style={{
                            width: "15vw",
                            maxWidth: "330px",
                            minWidth: "150px",
                            aspectRatio: "0.78",
                            right: "clamp(10px, 2vw, 30px)",
                            top: "6%",
                            opacity: 0,
                            boxShadow:
                                "0 10px 40px rgba(74,16,36,0.13)",
                        }}
                    >
                        <Image
                            src="/images/product/Artboard 13.jpg"
                            alt="Scarlet lip product"
                            fill
                            sizes="25vw"
                            className="object-cover object-center"
                        />
                    </div>

                    {/* =================================================
                        HEADLINE
                    ================================================= */}

                    <div
                        ref={headlineRef}
                        className=" absolute z-10 /* mobile */ left-0 bottom-0 w-[90%] /* desktop */ md:left-[34%] md:bottom-[5%] md:w-[58%] lg:left-[36%] lg:w-[55%] xl:left-[37%] xl:w-[53%]
                        "
                        style={{
                            opacity: 0,
                        }}
                    >
                        <p
                            className=" mb-2 text-[8px] text-rose-red font-semibold uppercase tracking-[0.25em] sm:text-[9px] md:mb-3 md:text-[10px] md:tracking-[0.3em]"
                        >
                            Trend Alert
                        </p>

                        <h2
                            className=" max-w-[50vw]  text-burgundy font-astoria text-[27px] font-bold leading-[0.96] sm:max-w-[50vw] sm:text-4xl md:max-w-[70vw] md:text-4xl lg:text-5xl xl:text-[clamp(48px,4.5vw,68px)] "
                        >
                            Make a Statement
                            <br />
                            with Scarlet Shades
                        </h2>

                        <div
                            className="
                                mt-4
                                h-px
                                w-10
                                md:mt-6
                                md:w-14
                            "
                            style={{
                                background:
                                    "var(--color-rose-red)",
                                opacity: 0.4,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* =========================================================
                RED EDIT IMAGE
            ========================================================= */}

            <div
                className=" relative mt-4 flex justify-center sm:mt-8 md:mt-10 "
            >
                <div
                    ref={midWrapRef}
                    className="
                        relative
                        overflow-hidden
                        rounded-xl
                        md:rounded-2xl
                    "
                    style={{
                        width: "80vw",
                        maxWidth: "1100px",
                        height: "clamp(250px, 44vw, 560px)",
                        opacity: 0,
                    }}
                >
                    <Image
                        src="/images/about/about-2.2.jpeg"
                        alt="The Red Edit — bold lip shades"
                        fill
                        sizes="80vw"
                        className="object-cover object-center"
                    />

                    <div
                        ref={midTextRef}
                        className=" absolute right-0 top-1/4 w-[42%] -translate-y-1/2 p-4 opacity-0 sm:w-[38%] sm:p-6 md:w-[32%] md:p-8 lg:w-[30%] lg:p-10 "
                    >
                        <h3
                            className=" font-astoria text-sm font-bold uppercase leading-none tracking-[0.08em] sm:text-base md:text-xl lg:text-[1.5vw] text-burgundy ">
                            The Roselin Factor
                        </h3>

                        <div className=" my-2 h-px w-6 color-rose-red opacity-0.38 md:my-2.5 md:w-8 " />

                        <p className=" font-poppins text-[8px] leading-[1.5] sm:text-[0.5vw] md:text-[1vw] text-mocha md:leading-relaxed ">
                            From deep wine shades to classic reds,
                            these bold pairings elevate any look
                            with instant confidence.
                        </p>
                    </div>
                </div>
            </div>



            <div
                ref={bottomRef}
                className="
                    mx-auto
                    mt-10
                    w-[80vw]
                    pb-16

                    sm:mt-12
                    sm:pb-20

                    md:mt-16
                    md:pb-24
                "
                style={{
                    opacity: 0,
                }}
            >
                <div
                    className="mb-6 h-px w-full md:mb-8 bg-blush"

                />

                <p
                    className="mb-6 max-w-2xl font-poppins text-[9px] leading-[1.8] sm:text-[10px] md:mb-8 md:text-sm md:leading-[1.9]
    "
                    style={{
                        color: "var(--color-mocha)",
                    }}
                >
                    At{" "}
                    <span
                        className="font-semibold"
                        style={{
                            color: "var(--color-burgundy)",
                        }}
                    >
                        Roselin
                    </span>{" "}
                    beauty is more than a shade — it is a reflection of
                    confidence, individuality, and expression. Created for
                    those who leave an impression, every Roselin color is
                    crafted to bring elegance, character, and effortless
                    confidence to every look.
                </p>
            </div>
        </section>
    );
}