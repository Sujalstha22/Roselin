import Hero from "@/components/gallery/Hero";
import PhotoGallery from "@/components/gallery/PhotoGallery";
import Videosection from "@/components/gallery/Videosection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Roselin",
  description: "Explore our curated photo gallery and rituals.",
};

export default function GalleryPage() {
  return (
    <>
      <Hero />
      <PhotoGallery />
      <Videosection />
    </>
  );
}
