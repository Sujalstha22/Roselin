import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="relative bg-burgundy text-ivory px-5 sm:px-10 md:px-16 xl:px-20 py-10 sm:py-14 md:py-16">
      {/* ROW 1 — Image left, text right */}
      <div className="mx-auto grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20 mb-12 sm:mb-16 lg:mb-20">
        {/* Image */}
        <div className="relative h-[55vw] sm:h-[60vw] md:h-[70vh] lg:h-[90vh] w-full overflow-hidden">
          <Image
            src="/images/about/about-1.png"
            alt="Lumina beauty"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-0 left-0 h-[10%] w-full bg-linear-to-b from-transparent via-burgundy/60 to-burgundy" />
        </div>

        <div className="w-full flex flex-col justify-center">
          <h2 className="font-astoria leading-[1.05] tracking-tight text-[7.5vw] sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl max-w-xl">
            An Expression of Timeless Elegance
          </h2>

          <div className="mt-5 sm:mt-8">
            <p className="font-poppins text-[3.5vw] sm:text-sm md:text-base leading-7 md:leading-8 text-ivory/80">
              The finest beauty is effortless. It asks for nothing more than
              thoughtful care and uncompromising quality. LUMINA embraces this
              philosophy, crafting rituals that celebrate the purity of nature
              while elevating skincare into an experience of timeless
              sophistication.
            </p>

            <p className="mt-4 sm:mt-5 font-poppins text-[3.5vw] sm:text-sm md:text-base leading-7 md:leading-8 text-ivory/80">
              From the first touch to the final glow, every detail is carefully
              considered to create a ritual that feels deeply personal. A quiet
              luxury that lives beyond the surface, revealing beauty with
              authenticity and enduring grace.
            </p>
          </div>
        </div>
      </div>

      {/* ROW 2 — Text left, image right (image moves below text on mobile) */}
      <div className="mx-auto grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Text — order-2 on mobile so image always leads */}
        <div className="w-full flex flex-col justify-center order-2 lg:order-1">
          <h2 className="font-astoria leading-[1.05] tracking-tight text-[7.5vw] sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl max-w-xl">
            An Expression of Timeless Elegance
          </h2>

          <div className="mt-5 sm:mt-8">
            <p className="font-poppins text-[3.5vw] sm:text-sm md:text-base leading-7 md:leading-8 text-ivory/80">
              The finest beauty is effortless. It asks for nothing more than
              thoughtful care and uncompromising quality. LUMINA embraces this
              philosophy, crafting rituals that celebrate the purity of nature
              while elevating skincare into an experience of timeless
              sophistication.
            </p>

            <p className="mt-4 sm:mt-5 font-poppins text-[3.5vw] sm:text-sm md:text-base leading-7 md:leading-8 text-ivory/80">
              From the first touch to the final glow, every detail is carefully
              considered to create a ritual that feels deeply personal. A quiet
              luxury that lives beyond the surface, revealing beauty with
              authenticity and enduring grace.
            </p>
          </div>
        </div>

        {/* Image — order-1 on mobile so it appears first */}
        <div className="relative h-[55vw] sm:h-[60vw] md:h-[70vh] lg:h-[90vh] w-full overflow-hidden order-1 lg:order-2">
          <Image
            src="/images/about/about-1.png"
            alt="Lumina beauty"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-0 left-0 h-[10%] w-full bg-linear-to-b from-transparent via-burgundy/60 to-burgundy" />
        </div>
      </div>
    </section>
  );
};

export default About;
