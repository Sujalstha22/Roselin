import About from "@/components/About/About";
import AboutV2 from "@/components/About/AboutV2";
import Footer from "@/components/About/Footer";
import Gallery from "@/components/About/Gallery";
import AboutHeroV2 from "@/components/About/HeroV2";
import ImageDivider from "@/components/About/Imagedivider";
import ImageDividerV2 from "@/components/About/ImageDividerV2";
import ParallaxCarousel from "@/components/About/Parallex";
import ExclusiveV2 from "@/components/exclusive/ExclusiveV2";

export default function Home() {
  return (
    <>
      <AboutHeroV2 />
      <AboutV2 />
      {/* <ExclusiveV2 /> */}
      {/* <ImageDivider /> */}
      <Gallery />
      <ImageDividerV2 />
      {/* <About /> */}
      {/* <ParallaxCarousel /> */}
      {/* <Footer /> */}
    </>
  );
}
