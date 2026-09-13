import About from "@/components/About/About";
import AboutV2 from "@/components/About/AboutV2";
import Footer from "@/components/About/Footer";
import Gallery from "@/components/About/Gallery";
import AboutHeroV2 from "@/components/About/HeroV2";
import ImageDivider from "@/components/About/Imagedivider";
import ParallaxCarousel from "@/components/About/Parallex";

export default function Home() {
  return (
    <>
      <AboutHeroV2 />
      <AboutV2 />
      <ImageDivider />
      <About />
      {/* <ParallaxCarousel /> */}
      <Gallery />
      <Footer />
    </>
  );
}
