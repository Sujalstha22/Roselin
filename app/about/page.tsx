import About from "@/components/About/About";
import Footer from "@/components/About/Footer";
import Gallery from "@/components/About/Gallery";
import Hero from "@/components/About/Hero";
import ImageDivider from "@/components/About/Imagedivider";
import ParallaxCarousel from "@/components/About/Parallex";

export default function Home() {
  return (
    <>
      <Hero />
      <ImageDivider />
      <About />
      {/* <ParallaxCarousel /> */}
      <Gallery />
      <Footer />
    </>
  );
}
