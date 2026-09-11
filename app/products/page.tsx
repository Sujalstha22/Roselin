import ProductDisplay from "@/components/product/ProductDisplay";
import ProductSequenct from "@/components/product/ProductSequenct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Roselin",
  description: "Explore our collection of luxury skincare, makeup, and nail care rituals.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductSequenct />
      <ProductDisplay />
    </>
  );
}
