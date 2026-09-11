import Image from "next/image";

import TextDivider from "../UI/TextDivider";

const Hero = () => {
    return (
        <>
            {/* HERO */}
            <section className="relative flex h-svh items-end justify-center overflow-hidden select-none bg-black p-0 pb-[17vh] xl:h-dvh xl:pb-[13vh]">

                {/* Background Image */}
                <Image
                    src="/images/review/hero.jpeg"
                    alt="Roselin beauty"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />

                {/* Image Overlay */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

                {/* Hero Title */}
                <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center md:items-center md:justify-end px-0 pb-35 md:pb-0 md:px-16 lg:px-24">
                    <div className="w-full max-w-[90vw] sm:max-w-[60vw] md:max-w-[30vw] lg:max-w-[25vw] text-left">
                        <h1 className="text-[6vw] sm:text-3xl md:text-2xl lg:text-3xl font-astoria text-white md:text-burgundy tracking-tight leading-tight">
                            Confidence Leaves an Impression
                        </h1>

                        <p className="mt-3 text-[3.5vw] sm:text-sm leading-relaxed text-white md:text-burgundy/80 md:text-base">
                            Discover the experiences, confidence, and quiet moments of beauty
                            shared by those who have made LUMINA part of their daily ritual.
                        </p>
                    </div>
                </div>
            </section>
            <TextDivider text="Make your entrance without saying a word." />
        </>
    );
};

export default Hero;