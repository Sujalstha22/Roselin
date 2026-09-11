"use client";

import Image from "next/image";
import TransitionLink from "@/components/UI/TransitionLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/providers/AudioProvider";
import { useCart } from "@/providers/CartProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Exclusive", href: "/exclusive" },
  { label: "Gallery", href: "/gallery" },
  { label: "Review", href: "/review" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);


  // Navbar scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const { isMuted, toggleAudio } = useAudio();
  const { totalItems, toggleCart } = useCart();

  /* =========================================================
     NAVBAR SCROLL BEHAVIOR
     ========================================================= */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      /*
       * TOP OF PAGE
       * Navbar is visible and transparent
       */
      if (currentScrollY <= 10) {
        setIsScrolled(false);
        setShowNavbar(true);

        lastScrollY = currentScrollY;
        return;
      }

      /*
       * We are no longer at the top.
       * Navbar gets burgundy background.
       */
      setIsScrolled(true);

      /*
       * SCROLLING DOWN
       * Hide navbar
       */
      if (currentScrollY > lastScrollY + 3) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY - 3) {
        /*
         * SCROLLING UP
         * Show navbar
         */
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  /* =========================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
     ========================================================= */

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav
        className={`
          fixed
          top-0
          left-0
          z-[210]
          w-full

          px-4
          py-2

          md:px-8
          lg:px-16
          xl:px-24

          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${showNavbar ? "translate-y-0" : "-translate-y-full"}

          ${isScrolled ? "bg-burgundy" : "bg-transparent"}
        `}
      >
        <div className="flex w-full items-center justify-between">
          {/* =================================================
              MOBILE MENU BUTTON
              ================================================= */}

          <div className="order-1 flex flex-1 justify-start xl:hidden">
            <button
              type="button"
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="relative z-50 flex flex-col gap-1.5 p-2"
            >
              {/* Top line */}
              <span
                className={`
                  block
                  h-0.5
                  w-6
                  bg-[#e4e3e2]
                  transition-all
                  duration-300
                  ${menuOpen ? "translate-y-2 rotate-45" : ""}
                `}
              />

              {/* Middle line */}
              <span
                className={`
                  block
                  h-0.5
                  w-6
                  bg-[#e4e3e2]
                  transition-all
                  duration-300
                  ${menuOpen ? "opacity-0" : "opacity-100"}
                `}
              />

              {/* Bottom line */}
              <span
                className={`
                  block
                  h-0.5
                  w-6
                  bg-[#e4e3e2]
                  transition-all
                  duration-300
                  ${menuOpen ? "-translate-y-2 -rotate-45" : ""}
                `}
              />
            </button>
          </div>

          {/* =================================================
              LOGO
              ================================================= */}

          <div
            className="
              order-2
              flex
              flex-1
              justify-center

              pointer-events-auto

              xl:order-1
              xl:flex-initial
              xl:justify-start
            "
          >
            <TransitionLink
              href="/"
              onClick={() => setMenuOpen(false)}
              className="
                relative
                block
                aspect-4/2
                w-[24vw]
                md:w-[10vw]
                xl:w-[6vw]
              "
            >
              {/* <Image
                src="/white-logo.svg"
                alt="Roselin"
                fill
                priority
                className="
                  object-contain
                  object-center
                  xl:object-left
                "
              /> */}
              <span className="sr-only">Roselin</span>
            </TransitionLink>
          </div>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <div
            className="
              order-2
              mx-auto
              hidden

              items-center
              justify-center

              gap-12
              px-4

              font-poppins

              xl:flex
              xl:gap-[3vw]
            "
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="
                    group
                    relative
                    py-1

                    text-[0.9vw]
                    tracking-wider
                    text-[#e4e3e2]

                    transition-colors
                    duration-500
                  "
                >
                  {/* Label */}
                  <span className="relative z-10">{link.label}</span>

                  {/* Active / hover underline */}
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      right-0
                      h-0.5

                      origin-left
                      bg-[#e4e3e2]

                      transition-transform
                      duration-300

                      ${isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />
                </TransitionLink>
              );
            })}
          </div>

          {/* =================================================
              RIGHT ACTIONS
              ================================================= */}

          <div
            className="
              order-3
              flex
              flex-1
              items-center
              justify-end

              gap-4

              md:gap-6

              xl:flex-initial
              xl:gap-[1.5vw]
            "
          >
            {/* =================================================
                CART
                ================================================= */}

            <button
              type="button"
              onClick={toggleCart}
              aria-label={`Shopping Bag with ${totalItems} items`}
              className="
                relative
                flex
                cursor-pointer
                items-center
                justify-center

                text-[#e4e3e2]
                hover:text-rose-red

                transition-colors
                duration-300
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-6 xl:size-[1.5vw]"
              >
                <path d="M0 0h24v24H0z" fill="none" />

                <g fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" d="M8 12V8a4 4 0 1 1 8 0v4" />

                  <path
                    d="
                      M3.694 12.668
                      c.145-1.741.218-2.611.792-3.14
                      S5.934 9 7.681 9h8.639
                      c1.746 0 2.62 0 3.194.528
                      s.647 1.399.792 3.14
                      l.514 6.166
                      c.084 1.013.126 1.52-.17 1.843
                      c-.298.323-.806.323-1.824.323
                      H5.174
                      c-1.017 0-1.526 0-1.823-.323
                      s-.255-.83-.17-1.843z
                    "
                  />
                </g>
              </svg>

              {/* Badge counter matching design in the image */}
              <span className="absolute -top-1.5 -right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-rose-red text-[9px] font-semibold text-white flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            </button>

            {/* =================================================
                AUDIO
                ================================================= */}

            <div className="relative flex items-center justify-center">
              <button
                type="button"
                aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                onClick={toggleAudio}
                className="
      flex
      size-6
      items-center
      justify-center
      cursor-pointer
      text-[#e4e3e2]
      transition-opacity
      duration-300
      hover:opacity-70
      xl:size-[1.5vw]
    "
              >
                {isMuted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-full"
                  >
                    <path
                      d="M11 5L6 9H3v6h3l5 4V5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M17 9L21 15"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M21 9L17 15"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-full"
                  >
                    <path
                      d="M11 5L6 9H3v6h3l5 4V5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M15.5 8.5a5 5 0 0 1 0 7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M18.5 6a8.5 8.5 0 0 1 0 12"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE MENU
          ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[200]

          bg-black

          transition-all
          duration-500

          xl:hidden

          ${menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
          }
        `}
      >
        <div
          className="
            flex
            h-full
            flex-col
            items-center
            justify-center
            gap-6
          "
        >
          {navLinks.map((link, index) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`
                  text-2xl
                  tracking-wide
                  text-[#e4e3e2]

                  transition-all
                  duration-500

                  ${menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <span className={isActive ? "border-b border-[#e4e3e2]" : ""}>
                  {link.label}
                </span>
              </TransitionLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
