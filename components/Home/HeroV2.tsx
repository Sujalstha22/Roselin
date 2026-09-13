import Image from "next/image";

export default function HeroV2() {
    return (
        <section className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-black text-ivory select-none">
            {/* Editorial Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/images/hero/herov2-bg .jpeg"
                    alt="Where Style Speaks Volumes - Editorial Fashion"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center md:object-[65%_center]"
                />
                {/* Vignette & Gradients for contrast and mood */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* Influenced People Badge (Right) */}
            <div className="absolute right-4 sm:right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 flex items-center gap-3 bg-black/35 backdrop-blur-md px-3.5 py-2.5 rounded-full border border-white/15 shadow-xl">
                {/* Avatars Stack */}
                <div className="flex -space-x-3 items-center">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-rose-red ring-1 ring-black">
                        <Image
                            src="/images/about/abt-1.jpg"
                            alt="Community member"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-rose-red ring-1 ring-black">
                        <Image
                            src="/images/about/abt-2.jpg"
                            alt="Community member"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-rose-red ring-1 ring-black">
                        <Image
                            src="/images/about/abt-3.jpg"
                            alt="Community member"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="pr-1">
                    <div className="text-xl md:text-2xl font-bold leading-none tracking-tight text-white font-poppins">
                        320k
                    </div>
                    <div className="text-[11px] font-light text-ivory/75 tracking-wide">
                        Influenced people
                    </div>
                </div>
            </div>

            {/* Main Bottom Section */}
            <div className="absolute inset-x-0 bottom-0 z-20 px-6 sm:px-10 md:px-16 pb-8 sm:pb-12 md:pb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
                {/* Headline & Description */}
                <div className="max-w-3xl">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[5rem] font-bold tracking-tight leading-[0.95] text-white">
                        Where Style<br />
                        Speaks Volumes.
                    </h1>

                    <div className="mt-6 sm:mt-8 flex items-start gap-4">
                        <div className="w-8 sm:w-10 h-[1.5px] bg-white/60 mt-2.5 shrink-0" />
                        <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed max-w-md font-poppins font-light">
                            Discover a curated selection that fuses cutting-edge style with enduring quality, designed for the modern individual.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
