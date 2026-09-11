"use client";

import React from "react";
import Image from "next/image";

interface ReviewItem {
  id: string;
  text: string;
  avatar: string;
}

const PERSONA_IMAGE = "/images/gallery/hero.png";

const ROW_1: ReviewItem[] = [
  {
    id: "r1-1",
    text: "Obsidian Renewal Essence is worth every single penny. It leaves a subtle, glass-skin glow that lasts all day...",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r1-2",
    text: "Such an exceptional, high-quality formula! Roselin is now an essential part of my morning ritual.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r1-3",
    text: "The Foundation sits so weightlessly on the skin. It feels like silk and looks completely natural under any light.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r1-4",
    text: "A breathtaking sensory experience. From the sleek architectural packaging to the transformative finish.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r1-5",
    text: "My complexion looks radiant and deeply nourished. Truly unparalleled craftsmanship.",
    avatar: PERSONA_IMAGE,
  },
];

const ROW_2: ReviewItem[] = [
  {
    id: "r2-1",
    text: "My skin barrier felt restored overnight after using the renewal cream. I can't imagine my nightly routine without it.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r2-2",
    text: "The finish on the Radiance Foundation is unmatched. Full coverage without feeling heavy or cakey at all.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r2-3",
    text: "It is very pleasant to use the means of your brand. The aesthetic, texture, and subtle fragrance are pure luxury.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r2-4",
    text: "Velvety smooth, absorbs immediately, and leaves an ethereal sheen that endures throughout the day.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r2-5",
    text: "Transformed my sensitive skin completely within a single week. Pure elegance in a bottle.",
    avatar: PERSONA_IMAGE,
  },
];

const ROW_3: ReviewItem[] = [
  {
    id: "r3-1",
    text: "Hasn't looked this clear and luminous in years. Worth every single drop!",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r3-2",
    text: "The texture of the essence is unlike anything else on the market. It melts in instantly with zero stickiness.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r3-3",
    text: "Obsessed with the packaging and even more in love with the formula. 10/10 recommendation!",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r3-4",
    text: "My skin feels like pure silk throughout the entire day. Elegant, modern, and truly sublime.",
    avatar: PERSONA_IMAGE,
  },
  {
    id: "r3-5",
    text: "The subtle calming botanicals and hydrating power make this my absolute favorite beauty ritual.",
    avatar: PERSONA_IMAGE,
  },
];

const ReviewCard: React.FC<{ review: ReviewItem }> = ({ review }) => {
  return (
    <div className="flex items-center gap-4 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#390d1c]/90 border border-white/20 hover:border-white/40 hover:bg-[#431022] transition-all duration-300 shadow-xl shrink-0 group cursor-default">
      {/* Avatar */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-white/25 bg-[#2d0a16] shadow-inner">
        <Image
          src={review.avatar}
          alt="Customer persona"
          fill
          sizes="48px"
          className="object-cover object-center filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Review text */}
      <p className="text-white text-xs sm:text-[13px] md:text-sm font-light leading-snug tracking-wide max-w-[260px] sm:max-w-[340px] md:max-w-[390px] whitespace-normal">
        {review.text}
      </p>
    </div>
  );
};

const ReviewMarqueeRow: React.FC<{
  reviews: ReviewItem[];
  direction?: "left" | "right";
  speedSeconds?: number;
}> = ({ reviews, direction = "left", speedSeconds = 35 }) => {
  const duplicated = [...reviews, ...reviews, ...reviews];

  const animationName =
    direction === "left" ? "marquee-scroll-left" : "marquee-scroll-right";

  return (
    <div className="relative w-full overflow-hidden py-1 group/row">
      <div
        className="flex gap-4 sm:gap-6 w-max will-change-transform group-hover/row:[animation-play-state:paused]"
        style={{
          animation: `${animationName} ${speedSeconds}s linear infinite`,
        }}
      >
        {duplicated.map((item, idx) => (
          <ReviewCard key={`${item.id}-${idx}`} review={item} />
        ))}
      </div>
    </div>
  );
};

const Review: React.FC = () => {
  return (
    <section className="relative w-full bg-burgundy text-white py-20 sm:py-28 md:py-36 overflow-hidden select-none">
      {/* Embedded Keyframes for marquee */}
      <style jsx>{`
        @keyframes marquee-scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        @keyframes marquee-scroll-right {
          0% {
            transform: translateX(-33.333333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>

      {/* Header */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mb-12 sm:mb-16 md:mb-20">
        <h2 className="font-astoria text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight">
          Loved by Thousands
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/80 font-light max-w-xl mx-auto leading-relaxed">
          Real experiences and quiet moments of beauty shared by those who have
          made Roselin part of their daily ritual.
        </p>
      </div>

      {/* Reviews Marquee System */}
      <div className="relative w-full flex flex-col gap-4 sm:gap-6">
        {/* Left & Right Edge Vignette Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-56 z-20 bg-linear-to-r from-burgundy via-burgundy/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-56 z-20 bg-linear-to-l from-burgundy via-burgundy/80 to-transparent" />

        {/* Row 1: Left */}
        <ReviewMarqueeRow reviews={ROW_1} direction="left" speedSeconds={42} />

        {/* Row 2: Right */}
        <ReviewMarqueeRow reviews={ROW_2} direction="right" speedSeconds={48} />

        {/* Row 3: Left */}
        <ReviewMarqueeRow reviews={ROW_3} direction="left" speedSeconds={45} />
      </div>
    </section>
  );
};

export default Review;
