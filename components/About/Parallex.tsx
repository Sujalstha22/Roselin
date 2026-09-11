"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const images = [
  "/images/about/abt-1.jpg",
  "/images/about/abt-2.jpg",
  "/images/about/abt-3.jpg",
  "/images/about/abt-4.jpg",
  "/images/about/abt-5.jpg",
  "/images/about/abt-6.jpg",
];

const TOTAL_IMAGES = images.length;
const ANGLE = 360 / TOTAL_IMAGES;
const RADIUS = 500;

const ParallaxCarousel = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(180);

  useEffect(() => {
    const ring = ringRef.current;

    if (!ring) return;

    const items = gsap.utils.toArray<HTMLElement>(".parallax-item");

    // --------------------------------
    // INITIAL 3D POSITION
    // --------------------------------

    items.forEach((item, index) => {
      gsap.set(item, {
        rotationY: index * -ANGLE,
        transformOrigin: `50% 50% ${RADIUS}px`,
        z: -RADIUS,
        backfaceVisibility: "hidden",
      });
    });

    gsap.set(ring, {
      rotationY: 180,
      cursor: "grab",
    });

    rotationRef.current = 180;

    // --------------------------------
    // ENTRANCE ANIMATION
    // --------------------------------

    // gsap.from(items, {
    //   duration: 1.5,
    //   //   y: 200,
    //   opacity: 0,
    //   stagger: 0.1,
    //   ease: "expo.out",
    // });

    // --------------------------------
    // AUTO ROTATION
    // --------------------------------

    const autoRotate = gsap.to(ring, {
      rotationY: "-=360",
      duration: 30,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        rotationRef.current = gsap.getProperty(ring, "rotationY") as number;
      },
    });

    // --------------------------------
    // DRAGGING
    // --------------------------------

    let startX = 0;
    let startRotation = 0;

    const onPointerDown = (event: PointerEvent) => {
      startX = event.clientX;
      startRotation = gsap.getProperty(ring, "rotationY") as number;

      autoRotate.pause();

      ring.style.cursor = "grabbing";
      ring.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!ring.hasPointerCapture(event.pointerId)) return;

      const delta = event.clientX - startX;

      const rotation = startRotation + delta * 0.5;

      gsap.set(ring, {
        rotationY: rotation,
      });

      rotationRef.current = rotation;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!ring.hasPointerCapture(event.pointerId)) return;

      ring.releasePointerCapture(event.pointerId);

      ring.style.cursor = "grab";

      // Continue automatic rotation
      autoRotate.play();
    };

    ring.addEventListener("pointerdown", onPointerDown);
    ring.addEventListener("pointermove", onPointerMove);
    ring.addEventListener("pointerup", onPointerUp);
    ring.addEventListener("pointercancel", onPointerUp);

    // --------------------------------
    // HOVER EFFECT
    // --------------------------------

    const handleMouseEnter = (event: Event) => {
      const current = event.currentTarget;

      gsap.to(items, {
        opacity: (index, target) => (target === current ? 1 : 0.5),
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(items, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    };

    items.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    // --------------------------------
    // CLEANUP
    // --------------------------------

    return () => {
      autoRotate.kill();

      ring.removeEventListener("pointerdown", onPointerDown);
      ring.removeEventListener("pointermove", onPointerMove);
      ring.removeEventListener("pointerup", onPointerUp);
      ring.removeEventListener("pointercancel", onPointerUp);

      items.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter);
        item.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-burgundy">
      <div
        ref={containerRef}
        className="
          absolute
          left-1/2
          top-1/2
          h-[400px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          [perspective:2000px]
          md:h-[500px]
          md:w-[350px]
        "
      >
        <div
          ref={ringRef}
          className="
            relative
            h-full
            w-full
            [transform-style:preserve-3d]
            touch-none
            select-none
          "
        >
          {images.map((src, index) => (
            <div
              key={src}
              className="

                parallax-item
                absolute
                inset-0
                translate-x-1/2
                overflow-hidden
                [transform-style:preserve-3d]
              "
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="350px"
                draggable={false}
                className="pointer-events-none object-cover"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxCarousel;
