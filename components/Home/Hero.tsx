import RevealText from "../UI/RevealText";
import TextDivider from "../UI/TextDivider";

const Hero = () => {
  return (
    <>
      <section className="relative flex h-svh items-end justify-center overflow-hidden select-none bg-black p-0 pb-[17vh] xl:h-dvh xl:pb-[13vh]">
        <video
          src="/videos/hero-video-optimized.mp4"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 h-[10%] w-full bg-linear-to-b from-transparent via-burgundy/60 to-burgundy" />



        {/* Hero Title */}
        <div className="pointer-events-none relative z-20 flex w-full justify-center">
          <h1 className="text-4xl tracking-tight md:text-7xl xl:text-[4vw]">
            <RevealText
              text="Welcome to Roselin"
              className="font-astoria text-white"
              delay={8}
            />
          </h1>
        </div>
      </section>

      <TextDivider text="Beauty Never Fades, it simply waits to be revealed" />
    </>
  );
};

export default Hero;
