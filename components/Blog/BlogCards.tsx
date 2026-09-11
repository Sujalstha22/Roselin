"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface BlogCardProps {
  id: string | number;
  title: string;
  category: string;
  date: string;
  image: string;
  slug?: string;
  onClick?: () => void;
}

export default function BlogCards({
  title,
  category,
  date,
  image,
  slug,
  onClick,
}: BlogCardProps) {
  return (
    <article className="group flex flex-col w-full bg-transparent overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-900">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10">
          {/* Category Badge */}
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] sm:text-[11px] font-medium tracking-wider text-white/90 bg-black/70 backdrop-blur-md border border-white/15 rounded-sm uppercase">
            {category}
          </span>

          {/* Date Badge */}
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] sm:text-[11px] font-light tracking-wider text-white/80 bg-black/70 backdrop-blur-md border border-white/15 rounded-sm">
            {date}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-between pt-4 pb-2">
        <h3 className="font-poppins text-sm sm:text-base font-normal text-white/90 leading-snug tracking-wide line-clamp-2 min-h-[2.75rem] group-hover:text-white transition-colors duration-300">
          {title}
        </h3>

        {/* Action Button */}
        <div className="mt-4">
          {slug ? (
            <Link
              href={`/blog/${slug}`}
              className="block w-full py-2.5 text-center text-xs tracking-[0.2em] uppercase font-light text-white/90 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
            >
              Read More
            </Link>
          ) : (
            <button
              type="button"
              onClick={onClick}
              className="cursor-pointer block w-full py-2.5 text-center text-xs tracking-[0.2em] uppercase font-light text-white/90 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
            >
              Read More
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
