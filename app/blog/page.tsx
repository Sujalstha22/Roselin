import { Metadata } from "next";
import BlogDisplay from "@/components/Blog/BlogDisplay";
import HoverChange from "@/components/Blog/HoverChange";

export const metadata: Metadata = {
  title: "Blog | Skincare Chronicles | Roselin",
  description:
    "Explore our latest articles on natural beauty rituals, botanical ingredients, and the science of radiant skin.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-burgundy text-white selection:bg-rose-mist selection:text-black">
      {/* Blog Hero & Cards Grid */}
      <BlogDisplay />

      {/* Difference / Before & After Interactive Section */}
      <HoverChange />
    </main>
  );
}
