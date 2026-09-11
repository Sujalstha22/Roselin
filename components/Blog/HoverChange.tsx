"use client";

import React, { useState } from "react";
import Image from "next/image";

interface HoverChangeProps {
    beforeImage?: string;
    afterImage?: string;
    title?: string;
    subtitle?: string;
    beforeLabel?: string;
    afterLabel?: string;
    instructionLabel?: string;
    ratingText?: string;
}

export default function HoverChange({
    beforeImage = "/images/blog/before.png",
    afterImage = "/images/blog/after.png",
    title = "The Difference You Can Feel",
    subtitle = "Transformation isn't about becoming someone else. It's about revealing the healthiest version of your skin through patience, consistency, and thoughtful care.",
    beforeLabel = "BEFORE",
    afterLabel = "AFTER",
    instructionLabel = "HOVER OR TAP",
    ratingText = "4.9/5",
}: HoverChangeProps) {
    const [isActive, setIsActive] = useState<boolean>(false);

    const toggleActive = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <section className="w-full py-12 md:py-20 flex flex-col items-center">
            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto px-4 mb-10 md:mb-12">
                <h2 className="font-astoria text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-wide">
                    {title}
                </h2>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/70 font-light leading-relaxed tracking-wide">
                    {subtitle}
                </p>
            </div>

            {/* Comparison Image Container */}
            <div className="w-full max-w-md sm:max-w-lg px-4 flex flex-col items-center">
                <div
                    onClick={toggleActive}
                    onMouseEnter={() => setIsActive(true)}
                    onMouseLeave={() => setIsActive(false)}
                    className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-neutral-900 select-none cursor-pointer group border border-white/10"
                >
                    {/* Base Layer: Before Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={beforeImage}
                            alt="Before skincare transformation"
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            priority
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Top Layer: After Image with Clip Path animated on Hover / Tap */}
                    <div
                        className="absolute inset-0 w-full h-full transition-[clip-path] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        style={{
                            clipPath: isActive
                                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                                : "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
                        }}
                    >
                        <Image
                            src={afterImage}
                            alt="After skincare transformation"
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            priority
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Wipe Line with Soft Glowing Gradient Transition Overlay */}
                    <div
                        className="absolute top-0 bottom-0 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10"
                        style={{
                            left: isActive ? "100%" : "0%",
                            opacity: isActive ? 0.9 : 0.4,
                        }}
                    >
                        {/* Ambient Soft Gradient Glow attached to the line */}
                        <div className="absolute inset-y-0 -left-8 w-16 bg-gradient-to-r from-transparent via-burgundy/25 to-transparent blur-sm pointer-events-none" />
                        <div className="absolute inset-y-0 -left-3 w-6 bg-gradient-to-r from-transparent via-burgundy/50 to-transparent pointer-events-none" />

                        {/* Clean Thin Line */}
                        <div className="w-[1.5px] h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                    </div>

                    {/* Bottom Badges */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
                        {/* State Tag */}
                        <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-medium tracking-widest text-white/90 bg-black/70 backdrop-blur-md border border-white/15 rounded-sm uppercase transition-colors duration-300">
                            {isActive ? afterLabel : beforeLabel}
                        </span>

                        {/* Instruction Tag */}
                        <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-light tracking-widest text-white/80 bg-black/70 backdrop-blur-md border border-white/15 rounded-sm uppercase">
                            {instructionLabel}
                        </span>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="mt-5 flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-white tracking-widest">
                        {ratingText}
                    </span>
                </div>
            </div>
        </section>
    );
}
