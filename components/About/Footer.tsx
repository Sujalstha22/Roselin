import Image from "next/image";
import RevealText from "../UI/RevealText";

const Footer = () => {
  return (
    <>
      <section className="relative h-[120vh] w-full overflow-hidden">
        <Image
          src="/images/about/footer-image.jpeg"
          alt="Hero"
          fill
          priority
          className="object-cover"
          sizes="120vw"
        />
        <div className="absolute top-0 left-0 h-[5%] w-full bg-linear-to-b from-burgundy via-burgundy/60 to-transparent" />

        <h2 className="absolute bottom-10 text-center justify-center text-4xl px-30 leading-tight">
          <RevealText
            text="For mornings that begin quietly And Evenings that deserve to be remembered."
            className="font-astoria text-ivory"
          />
        </h2>
      </section>
    </>
  );
};

export default Footer;
