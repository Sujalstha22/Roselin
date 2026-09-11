import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import LocalFont from "next/font/local";

import "./globals.css";
import LenisProvider from "../providers/LenisProvider";
import AudioProvider from "../providers/AudioProvider";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/UI/Pagetransition";
import { TransitionProvider } from "@/providers/TransitionProvider";
import { CartProvider } from "@/providers/CartProvider";
import CartDrawer from "@/components/UI/CartDrawer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const astoria = LocalFont({
  src: [
    {
      path: "../public/fonts/Astoria-Classic-light.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-astoria",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roselin",
  description: "Ecommerce site for Premium Lipsticks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${astoria.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-poppins antialiased">
        <LenisProvider>
          <AudioProvider>
            <TransitionProvider>
              <CartProvider>
                <Navbar />
                <PageTransition>{children}</PageTransition>
                <Footer />
                <CartDrawer />
              </CartProvider>
            </TransitionProvider>
          </AudioProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
