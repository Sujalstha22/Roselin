import ExperienceSection from "@/components/Home/Experiencesection";
import Hero from "@/components/Home/Hero";
import SequenceSection from "@/components/Home/SequenceSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      {/* <div className="h-screen relative bg-red-500 z-99"></div> */}
      <SequenceSection />
    </>
  );
}
