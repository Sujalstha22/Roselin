"use client";

import Image from "next/image";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/home/exp-1.jpg",
    alt: "Pollution",
  },
  {
    src: "/images/home/exp-2.jpg",
    alt: "Stress",
  },
  {
    src: "/images/home/exp-3.jpg",
    alt: "Sun Exposure",
  },
  {
    src: "/images/home/exp-4.jpg",
    alt: "Sleepless Night",
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;

      if (!section || !video) return;

      const panels = gsap.utils.toArray<HTMLElement>(".image-panel");

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { desktop, mobile } = context.conditions!;

          gsap.set(panels, {
            xPercent: desktop ? (index) => [-40, -20, 20, 40][index] : 0,
            scale: desktop ? 0.85 : 1,
            opacity: 1,
          });

          gsap.set(video, {
            opacity: 0,
            scale: desktop ? 1.06 : 1.03,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: desktop ? "+=200%" : "+=150%",
              pin: true,
              scrub: desktop ? 1.5 : 0.8,
              pinSpacing: true,
              invalidateOnRefresh: true,
              refreshPriority: 10,
            },
          });

          /* PANELS */
          tl.to(panels, {
            xPercent: 0,
            scale: 1,
            duration: desktop ? 4 : 2.5,
            stagger: {
              each: desktop ? 0.18 : 0.1,
              from: "center",
            },
            ease: "none",
          });

          /* HOLD */
          tl.to({}, {
            duration: desktop ? 1.5 : 0.75,
          });

          /* CROSSFADE */
          tl.to(
            panels,
            {
              opacity: 0,
              scale: 1,
              duration: desktop ? 4 : 2.5,
              stagger: {
                each: desktop ? 0.12 : 0.08,
                from: "center",
              },
              ease: "power1.inOut",
            },
            "+=0",
          );

          tl.to(
            video,
            {
              opacity: 1,
              scale: 1,
              duration: desktop ? 4 : 2.5,
              ease: "power1.inOut",
            },
            "<",
          );

          /* VIDEO HOLD */
          tl.to({}, {
            duration: desktop ? 2 : 1,
          });

          return () => {
            tl.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] bg-burgundy md:h-dvh"
    >
      <div
        className="
          mx-auto
          flex
          h-full
          w-full
          max-w-[90vw]
          flex-col
          items-center
          justify-center
          gap-5
          py-6

          md:gap-5
          md:py-8
        "
      >
        {/* MEDIA FRAME */}

        <div
          className="
            relative
            mx-auto
            aspect-[4/3]
            w-full
            max-w-[95vw]
            shrink-0
            select-none

            md:aspect-[4/3]
            md:h-[60vh]
            md:w-auto

            xl:aspect-video
            xl:h-[65vh]
          "
        >
          {/* VIDEO */}

          <div
            ref={videoRef}
            className="
              pointer-events-none
              absolute
              inset-0
              z-0
              h-full
              w-full
              overflow-hidden
            "
          >
            <video
              src="/videos/exp-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          </div>

          {/* IMAGE PANELS */}

          <div className="absolute inset-0 z-10 flex h-full w-full overflow-hidden">
            {images.map((image) => (
              <div
                key={image.alt}
                className="
                  image-panel
                  relative
                  h-full
                  w-1/4
                  overflow-hidden
                "
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 25vw, 25vw"
                  className="pointer-events-none object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mx-auto
            max-w-[90vw]
            text-center
            font-poppins
            text-xs
            leading-relaxed

            sm:text-sm

            md:max-w-3xl
            md:text-[1vh]

            xl:max-w-[70vw]
            xl:text-[1.3vw]
          "
        >
          Over time, everyday moments can soften your skin&apos;s natural
          radiance, leaving it looking dull and tired. But beauty doesn&apos;t
          disappear. Sometimes, it simply becomes hidden beneath everything
          your skin has experienced.
        </p>
      </div>
    </section>
  );
};

export default ExperienceSection;