"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sparkle from "@/components/UI/Sparkle";

const Footer = () => {
  const pathname = usePathname();

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Exclusive", href: "/exclusive" },
    { label: "Gallery", href: "/gallery" },
    { label: "Review", href: "/review" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  if (pathname === "/exclusive") {
    return null;
  }

  return (
    <footer className="relative w-full border-t border-ivory/20 bg-burgundy px-6 pt-10 pb-8 text-ivory overflow-hidden">
      <div className="flex w-full flex-col gap-8">
        {/* ================= MAIN FOOTER ================= */}
        <div className="grid w-full grid-cols-2 items-center gap-8 xl:grid-cols-12">
          {/* EXPLORE */}
          <div className="order-1 flex flex-col items-start gap-4 text-left xl:col-span-3">
            <h3 className="mb-1 text-base font-semibold tracking-wider text-ivory xl:text-[1vw]">
              Explore
            </h3>
            <ul className="grid w-full grid-cols-2 justify-items-start gap-x-8 gap-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-sm font-medium text-ivory/70 transition-colors duration-300 hover:text-ivory hover:underline xl:text-[0.9vw]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BRAND */}
          <div className="order-3 col-span-2 flex select-none items-center justify-center overflow-hidden py-4 text-center xl:order-2 xl:col-span-6 xl:py-0">
            <h2 className="block font-astoria text-[20vw] uppercase leading-none tracking-tighter text-ivory/20 md:text-[16vw] xl:text-[10vw]">
              Roselin
            </h2>
          </div>

          {/* CONTACT INFO */}
          <div className="order-2 flex flex-col items-end gap-4 text-right xl:order-3 xl:col-span-3">
            <h3 className="mb-1 text-base font-semibold tracking-wider text-ivory xl:text-[1vw]">
              Contact Info
            </h3>
            <ul className="flex w-full flex-col items-end gap-3 text-right">
              <li>
                <a
                  href="tel:+18005864621"
                  className="block text-sm font-medium text-ivory/70 transition-colors duration-300 hover:text-ivory hover:underline xl:text-[0.9vw]"
                >
                  +1 (800) 586-4621
                </a>
              </li>
              <li>
                <span className="block whitespace-pre-line text-sm font-medium leading-relaxed text-ivory/70 xl:text-[0.9vw]">
                  740 5th Ave, New York, USA
                </span>
              </li>
              <li>
                <a
                  href="mailto:contact@lumina.com"
                  className="block text-sm font-medium text-ivory/70 transition-colors duration-300 hover:text-ivory hover:underline xl:text-[0.9vw]"
                >
                  contact@lumina.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-ivory/20 pt-6 md:flex-row">
          {/* Copyright */}
          <span className="select-none text-center text-xs font-medium tracking-wide text-ivory/80 sm:text-left xl:text-[0.9vw]">
            Copyright © 2026 Lumina. All Rights Reserved.
          </span>

          {/* Developer */}
          <div className="flex flex-col items-center gap-2 text-ivory/80 md:flex-row">
            <p className="text-xs xl:text-[0.9vw]">Designed &amp; Developed by</p>
            <a
              href="https://www.webxnepal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex flex-col items-center"
            >
              <div className="relative w-[12vw] md:w-[6vw] xl:w-[3.5vw]">
                <Image
                  src="/images/webx-white-logo.png"
                  alt="WebX Logo"
                  width={200}
                  height={100}
                  className="h-auto w-full md:mb-1"
                />

                {/* Sparkle effect below WebX Nepal logo */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-8 w-28 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full bg-linear-to-r from-transparent via-ivory/70 to-transparent" />
                  <Sparkle count={35} minSize={1} maxSize={2.5} color="#fff9f5" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
