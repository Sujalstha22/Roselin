"use client";

import React from "react";
import BlogCards, { BlogCardProps } from "./BlogCards";

const defaultArticles: BlogCardProps[] = [
  {
    id: "1",
    title: "The Daily Moisturizing Ritual Behind Effortlessly Glowing Skin",
    category: "Skin Care",
    date: "22 January 2026",
    image: "/images/about/about-hero.jpeg",
  },
  {
    id: "2",
    title: "A Complete Guide to Gentle Exfoliation for a Radiant Body",
    category: "Body Care",
    date: "18 January 2026",
    image: "/images/home/exp-1.jpg",
  },
  {
    id: "3",
    title: "The 5 Minute Morning Skincare Routine That Actually Works",
    category: "Skin Care",
    date: "12 January 2026",
    image: "/images/about/abt-1.jpg",
  },
  {
    id: "4",
    title: "Why Botanical Toners Are the Missing Step in Your Skincare",
    category: "Ingredients",
    date: "5 January 2026",
    image: "/images/home/exp-3.jpg",
  },
  {
    id: "5",
    title: "The Nighttime Nourishing Ritual Your Skin Has Been Craving",
    category: "Skin Care",
    date: "28 December 2025",
    image: "/images/about/abt-4.jpg",
  },
  {
    id: "6",
    title: "How to Achieve Glass Skin Using Only Natural Ingredients",
    category: "Body Care",
    date: "20 December 2025",
    image: "/images/home/exp-2.jpg",
  },
];

interface BlogDisplayProps {
  articles?: BlogCardProps[];
  title?: string;
  subtitle?: string;
}

export default function BlogDisplay({
  articles = defaultArticles,
  title = "Skincare Chronicles",
  subtitle = "Explore our latest articles on natural beauty rituals, botanical ingredients, and the science of radiant skin.",
}: BlogDisplayProps) {
  return (
    <section className="w-full pt-28 pb-12 sm:pt-32 sm:pb-16 flex flex-col items-center">
      {/* Header / Title */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-12 sm:mb-16">
        <h1 className="font-astoria text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-wide">
          {title}
        </h1>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/70 font-light leading-relaxed tracking-wide max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Grid of Blog Cards */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {articles.map((article) => (
            <BlogCards
              key={article.id}
              id={article.id}
              title={article.title}
              category={article.category}
              date={article.date}
              image={article.image}
              slug={article.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
