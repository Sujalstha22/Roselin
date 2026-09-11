import Image from "next/image";
import RevealText from "../UI/RevealText";
import TextDivider from "../UI/TextDivider";

const Hero = () => {
    return (
        <>
            <section className="relative flex h-svh items-end justify-center overflow-hidden select-none bg-black p-0 pb-[17vh] xl:h-dvh xl:pb-[13vh]">
                <Image src="/images/gallery/hero.png"
                    alt="Gallery Hero"
                    fill
                    className="object-cover object-center"
                />

                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

                {/* Hero Title */}
                <div className="pointer-events-none relative z-20 flex w-full justify-center">
                    <h1 className="text-[2.5vh] tracking-tight md:text-[4vh] xl:text-[6vh] text-center">
                        <RevealText
                            text="Soft enough for every day. \n Beautiful enough to make every day feel special."
                            className="font-astoria text-white "
                        />
                    </h1>
                </div>
            </section>

            <TextDivider text="Every shade tells a different story." />
        </>
    );
};

export default Hero;
