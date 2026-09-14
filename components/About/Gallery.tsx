import ThreeDImageRing from "../UI/3d-image-ring";

const galleryItems = [
  {
    image: "/images/about/abt-1.jpg",
    category: "EDITORIAL",
    title: "The First Light",
  },
  {
    image: "/images/about/abt-2.jpg",
    category: "NATURE STUDY",
    title: "Bloom Beyond",
  },
  {
    image: "/images/about/abt-3.jpg",
    category: "CAMPAIGN",
    title: "Midnight Elegance",
  },
  {
    image: "/images/about/abt-4.jpg",
    category: "EDITORIAL",
    title: "Silent Grace",
  },
  {
    image: "/images/about/abt-6.jpg",
    category: "PORTRAIT",
    title: "Eternal Radiance",
  },
  {
    image: "/images/about/abt-5.jpg",
    category: "COUTURE",
    title: "Shadows of Dawn",
  },
];

export default function Gallery() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <h1 className="text-center text-7xl text-burgundy"> The Roselin Confidence</h1>
      <ThreeDImageRing images={galleryItems} draggable autoRotate />
    </section>
  );
}
