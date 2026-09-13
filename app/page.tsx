import About from "@/components/Home/About";
import Collections from "@/components/Home/Collections";
import ExperienceSection from "@/components/Home/Experiencesection";
import Hero from "@/components/Home/Hero";
import HeroV2 from "@/components/Home/HeroV2";
import SequenceSection from "@/components/Home/SequenceSection";

export default function Home() {
  return (
    <>
      <HeroV2 />
      <About />
      {/* <ExperienceSection /> */}
      <Collections />
      {/* <div className="h-screen relative bg-red-500 z-99"></div> */}
      <SequenceSection />
    </>
  );
}
