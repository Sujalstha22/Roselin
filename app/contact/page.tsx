import { Metadata } from "next";
import ContactHero from "@/components/Contact/Hero";
import DetailsDivider from "@/components/Contact/DetailsDivider";
import Contactform from "@/components/Contact/Contactform";

export const metadata: Metadata = {
  title: "Contact Us | Roselin",
  description:
    "Get in touch with Roselin skincare specialists for customized guidance and assistance.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-burgundy text-ivory selection:bg-rose-mist selection:text-black">
      {/* Hero Section */}
      <ContactHero />

      {/* 3 Box Details Section */}
      <DetailsDivider />

      {/* Form and Social Links */}
      <Contactform />
    </main>
  );
}
