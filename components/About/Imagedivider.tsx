import Image from "next/image";
import RevealText from "../UI/RevealText";
import TextDivider from "../UI/TextDivider";

const ImageDivider = () => {
  return (
    <>
      <section className="relative h-[60vw] sm:h-[80vh] md:h-[100vh] xl:h-[120vh] w-full overflow-hidden">
        <Image
          src="/images/about/divider-image.jpeg"
          alt="Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 120vw"
        />
        <div className="absolute top-0 left-0 h-[5%] w-full bg-linear-to-b from-burgundy via-burgundy/60 to-transparent" />
        <div className="absolute bottom-0 left-0 h-[10%] w-full bg-linear-to-b from-transparent via-burgundy/60 to-burgundy" />
      </section>

      <TextDivider text="A whisper of color, a touch of confidence.\n Sometimes, that is all you need." />
    </>
  );
};

export default ImageDivider;
