"use client";

import React from "react";
import Image from "next/image";

interface ContactHeroProps {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
}

export default function ContactHero({
    title = "LET’S SPEAK OF RADIANCE",
    subtitle = "Your skincare journey is unique. Whether you seek product guidance or want to share your experience, we are here to support your daily ritual.",
    backgroundImage = "/images/contact/hero.png",
}: ContactHeroProps) {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden  pt-20">

            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt="Contact Roselin Radiance"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center brightness-75 contrast-125"
                />

            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-16 sm:py-24 flex flex-col items-center">
                <h1 className="font-astoria text-3xl sm:text-5xl md:text-[5vh] text-ivory uppercase tracking-[0.15em] font-normal leading-tight ">
                    {title}
                </h1>
                <p className="mt-5 sm:mt-6 text-xs sm:text-sm md:text-base text-ivory/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
                    {subtitle}
                </p>
            </div>

            {/* Subtle Bottom Border Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent" />
        </section>
    );
}
