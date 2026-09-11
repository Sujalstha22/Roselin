import Image from "next/image";
import RevealText from "../UI/RevealText";
import TextDivider from "../UI/TextDivider";

const Hero = () => {
  return (
    <>
      <section className="relative h-[120vh] w-full overflow-hidden">
        <Image
          src="/images/about/about-hero.jpeg"
          alt="Hero"
          fill
          priority
          className="object-cover"
          sizes="120vw"
        />
        <div className="absolute bottom-0 left-0 h-[10%] w-full bg-linear-to-b from-transparent via-burgundy/60 to-burgundy" />
        <div className="absolute top-30 left-0 z-10 w-full px-6">
          <h1 className="text-4xl font-medium font-astoria tracking-tight text-white text-center md:text-6xl">
            <RevealText
              text=" Reveal your"
              className="font-astoria text-ivory"
            />
          </h1>
          <h1 className="text-4xl font-medium font-astoria tracking-tight text-white text-center md:text-6xl">
            <RevealText text=" Radiance " className="font-astoria text-ivory" />
          </h1>
        </div>
      </section>

      <TextDivider text="A touch of color can change everything and \n signature shade can become unforgettable." />
    </>
  );
};

export default Hero;
