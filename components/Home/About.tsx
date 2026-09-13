"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const centerImgRef = useRef<HTMLDivElement>(null);
    const rightImgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                gsap.fromTo(
                    headingRef.current,
                    { y: 40 },
                    {
                        y: -40,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.2,
                        },
                    }
                );

                gsap.fromTo(
                    centerImgRef.current,
                    { y: 60 },
                    {
                        y: -60,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5,
                        },
                    }
                );

                gsap.fromTo(
                    rightImgRef.current,
                    { y: 30 },
                    {
                        y: -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.0,
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
            className="relative overflow-hidden bg-black py-16 md:py-24"
        >


            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.1fr_1fr] md:gap-4 lg:gap-6">

                    <div ref={headingRef} className="flex flex-col justify-between gap-8">
                        <div>
                            <h2
                                className="font-astoria text-2xl leading-[1.1] font-bold md:text-[2rem] lg:text-[2.5rem]"
                                style={{ color: "var(--color-ivory)" }}
                            >
                                Color that speaks,{" "}
                                <span className="italic">Confidence that lingers</span>
                            </h2>

                            <p
                                className="mt-4 text-xs font-light font-poppins tracking-[0.2em]"
                                style={{ color: "var(--color-ivory)" }}
                            >
                                Discover your signature shade
                                Leave an impression, long after the moment
                            </p>
                        </div>

                        <div
                            className="relative overflow-hidden rounded-2xl"
                            style={{ background: "var(--color-rose-mist)" }}
                        >
                            <div className="relative h-[40vh] w-full md:h-[50vh] lg:h-[55vh]">
                                <Image
                                    src="/images/home/abt-1.1.jpg"
                                    alt="Favourite Foaming Cleanser"
                                    fill
                                    sizes="(max-width: 767px) 90vw, 33vw"
                                    className="object-cover object-center"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            "linear-gradient(160deg, rgba(249,231,234,0.45) 0%, transparent 70%)",
                                    }}
                                />
                            </div>

                        </div>
                    </div>

                    <div
                        className="relative overflow-hidden rounded-2xl"
                        style={{ background: "var(--color-black)" }}
                    >
                        <div
                            ref={centerImgRef}
                            className="relative h-[420px] w-full md:h-[50vh] lg:h-[86vh]"
                        >
                            <Image
                                src="/images/home/abt-2.jpg"
                                alt="abt-2"
                                fill
                                sizes="(max-width: 767px) 100vw, 36vw"
                                className="object-cover object-top"
                                priority
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(249,231,234,0.3) 0%, transparent 50%)",
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div
                            ref={rightImgRef}
                            className="relative flex-1 overflow-hidden rounded-2xl"
                            style={{ minHeight: "300px" }}
                        >
                            <Image
                                src="/images/home/abt-3.jpg"
                                alt="Skincare lifestyle portrait"
                                fill
                                sizes="(max-width: 767px) 90vw, 33vw"
                                className="object-cover object-top"
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(180deg, transparent 55%, rgba(74,16,36,0.12) 100%)",
                                }}
                            />
                        </div>

                        <div className="px-1">
                            <p
                                className="text-[10px] font-astoria uppercase tracking-[0.22em]"
                                style={{ color: "var(--color-white)" }}
                            >
                                WEAR YOUR CONFIDENCE
                            </p>
                            <p
                                className="mt-1 text-xs leading-relaxed font-poppins"
                                style={{ color: "var(--color-ivory)" }}
                            >
                                A perfected formula that glides effortlessly, stays beautifully in place, and turns every expression into a statement.
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div
                    ref={bottomRowRef}
                    className="mt-10 grid grid-cols-1 gap-6 border-t md:grid-cols-3 md:gap-4"
                    style={{ borderColor: "var(--color-blush)" }}
                >
                    {products.map((p) => (
                        <div key={p.name} className="pt-6">
                            <p
                                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                                style={{ color: "var(--color-burgundy)" }}
                            >
                                {p.name}
                            </p>
                            <p
                                className="mt-1.5 text-xs leading-relaxed"
                                style={{ color: "var(--color-mocha)" }}
                            >
                                {p.desc}
                            </p>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>
    );
}
