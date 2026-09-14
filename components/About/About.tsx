import Image from "next/image";
import TransitionLink from "../UI/TransitionLink";

const About = () => {
  return (
    <section className="relative w-full overflow-hidden bg-ivory">
      <header className="w-full px-4 py-10 sm:px-8 sm:py-14 lg:max-w-none lg:px-[5vw] lg:py-[4.2vw]">
        <h2 className="font-astoria w-full text-[8vw] leading-[0.95] font-medium tracking-tight text-near-black uppercase sm:text-5xl lg:max-w-none lg:text-[3.2vw]">
          A true shade
          <br />
          holds its ground
        </h2>
      </header>

      <div className="grid w-full lg:grid-cols-2">
        <article className="flex flex-col justify-center bg-ivory px-4 py-10 sm:px-8 sm:py-14 lg:px-[5vw] lg:py-[4vw]">
          <p className="font-astoria text-lg italic leading-none text-burgundy sm:text-xl lg:text-[1.35vw]">
            time-honored
          </p>
          <h3 className="font-astoria mt-1 text-[7vw] leading-[1.05] tracking-tight text-near-black uppercase sm:text-4xl lg:mt-[0.4vw] lg:text-[2.4vw]">
            The Formula
          </h3>
          <p className="font-poppins mt-4 text-[3.4vw] leading-relaxed font-medium tracking-[0.08em] text-burgundy uppercase sm:mt-5 sm:text-xs lg:mt-[1.2vw] lg:text-[0.75vw] lg:tracking-[0.14em]">
            Pigment you can trust. Finish you can feel.
          </p>
          <p className="font-poppins mt-4 w-full text-[3.5vw] leading-7 text-mocha sm:mt-5 sm:text-sm md:text-base md:leading-8 lg:mt-[1.4vw] lg:max-w-none lg:text-[0.85vw] lg:leading-[1.85]">
            Every Roselin shade is blended for even color and a composed wear.
            No rush, no excess — only a measured formula that sits true on the
            lip and remains faithful through the day.
          </p>
          <TransitionLink
            href="/products"
            className="font-poppins mt-8 inline-block w-fit text-[3vw] tracking-[0.22em] text-burgundy uppercase underline decoration-burgundy/40 underline-offset-8 transition-opacity hover:opacity-70 sm:mt-10 sm:text-[10px] lg:mt-[2vw] lg:text-[0.75vw] lg:underline-offset-[0.6vw]"
          >
            Discover the range
          </TransitionLink>
        </article>

        <div className="relative h-[72vw] w-full overflow-hidden sm:h-[62vw] lg:h-auto lg:min-h-[42vw]">
          <Image
            src="/images/about/about-1.png"
            alt="Roselin color in full bloom"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="grid w-full lg:grid-cols-2">
        <div className="relative h-[72vw] w-full overflow-hidden sm:h-[62vw] lg:order-1 lg:h-auto lg:min-h-[42vw]">
          <Image
            src="/images/about/about-2.2.jpeg"
            alt="A composed lip, ready for the hours ahead"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <article className="relative flex flex-col justify-center overflow-hidden bg-near-black px-4 py-10 text-ivory sm:px-8 sm:py-14 lg:order-2 lg:px-[5vw] lg:py-[4vw]">
          <p className="font-astoria text-lg italic leading-none text-soft-gold sm:text-xl lg:text-[1.35vw]">
            steadfast
          </p>
          <h3 className="font-astoria mt-1 text-[7vw] leading-[1.05] tracking-tight text-ivory uppercase sm:text-4xl lg:mt-[0.4vw] lg:text-[2.4vw]">
            The Wear
          </h3>
          <p className="font-poppins mt-4 text-[3.4vw] leading-relaxed font-medium tracking-[0.08em] text-champagne uppercase sm:mt-5 sm:text-xs lg:mt-[1.2vw] lg:text-[0.75vw] lg:tracking-[0.14em]">
            From first light to last word.
          </p>
          <p className="font-poppins mt-4 w-full text-[3.5vw] leading-7 text-ivory/75 sm:mt-5 sm:text-sm md:text-base md:leading-8 lg:mt-[1.4vw] lg:max-w-none lg:text-[0.85vw] lg:leading-[1.85]">
            A lipstick should not ask to be remembered. It should simply remain
            — smooth, certain, and calm — so you can move through the hours
            without a second thought.
          </p>
          <TransitionLink
            href="/products"
            className="font-poppins mt-8 inline-block w-fit text-[3vw] tracking-[0.22em] text-soft-gold uppercase underline decoration-soft-gold/40 underline-offset-8 transition-opacity hover:opacity-70 sm:mt-10 sm:text-[10px] lg:mt-[2vw] lg:text-[0.75vw] lg:underline-offset-[0.6vw]"
          >
            Explore shades
          </TransitionLink>

          <span
            aria-hidden="true"
            className="font-astoria pointer-events-none absolute right-[-4vw] bottom-[-8vw] select-none text-[42vw] leading-none text-ivory/8 sm:text-[28vw] lg:right-[-1.5vw] lg:bottom-[-4vw] lg:text-[18vw]"
          >
            R
          </span>
        </article>
      </div>
    </section>
  );
};

export default About;
