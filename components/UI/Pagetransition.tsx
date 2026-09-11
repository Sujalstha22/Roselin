"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Page quotes
───────────────────────────────────────────── */
const PAGE_QUOTES: Record<string, string> = {
    "/": "Beauty Never Fades, It Simply Waits To Be Revealed",
    "/about": "Crafted With Passion, Perfected By Nature",
    "/products": "Every Shade Tells A Story Of Timeless Allure",
    "/exclusive": "Rare Elegance For The Discerning Few",
    "/gallery": "Moments Of Pure Grace Captured In Light",
    "/review": "Real Stories Of Confidence And Radiance",
    "/blog": "Rituals, Secrets and The Modern Art Of Self\u2013Care",
    "/contact": "We Would Love To Hear Your Story",
};

const getQuoteForPath = (pathname: string): string => {
    if (PAGE_QUOTES[pathname]) return PAGE_QUOTES[pathname];
    for (const [key, quote] of Object.entries(PAGE_QUOTES)) {
        if (key !== "/" && pathname.startsWith(key)) return quote;
    }
    return "Luxe Rituals For Pure Confidence";
};

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const COLUMN_COUNT = 18;

interface PageTransitionProps {
    children: React.ReactNode;
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();

    const overlayRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);

    // Track whether we've finished the initial mount uncover
    const didMountUncover = useRef(false);

    const [quote, setQuote] = useState(() => getQuoteForPath(pathname));

    /* ───────────────────────────────────────────
       Helpers — cover & uncover as Promises
    ─────────────────────────────────────────── */
    const cover = (targetPathname: string): Promise<void> =>
        new Promise((resolve) => {
            const overlay = overlayRef.current;
            const quoteEl = quoteRef.current;
            if (!overlay || !quoteEl) { resolve(); return; }

            setQuote(getQuoteForPath(targetPathname));

            const cols = overlay.querySelectorAll<HTMLElement>(".stair-col");

            const tl = gsap.timeline({ onComplete: resolve });

            // Make overlay visible & interactive
            tl.set(overlay, { display: "block", pointerEvents: "all" });

            // Reset columns to invisible (scaleX = 0, origin left)
            tl.set(cols, { scaleX: 0, transformOrigin: "left center" });

            // Sweep columns in from left → right
            tl.to(cols, {
                scaleX: 1.05,
                duration: 0.9,
                ease: "power3.inOut",
                stagger: { amount: 0.12, from: "start" },
            });

            // Fade quote in
            tl.fromTo(
                quoteEl,
                { opacity: 0, y: 14, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out" },
                "-=0.15"
            );
        });

    const uncover = (): Promise<void> =>
        new Promise((resolve) => {
            const overlay = overlayRef.current;
            const quoteEl = quoteRef.current;
            if (!overlay || !quoteEl) { resolve(); return; }

            const cols = overlay.querySelectorAll<HTMLElement>(".stair-col");

            const tl = gsap.timeline({
                onComplete: () => {
                    // Refresh ScrollTriggers after the new page is revealed
                    ScrollTrigger.refresh();
                    resolve();
                },
            });

            // Fade quote out
            tl.to(quoteEl, {
                opacity: 0,
                y: -10,
                scale: 0.98,
                duration: 0.22,
                ease: "power2.in",
                delay: 0.55, // short pause so quote is readable
            });

            // Sweep columns out from left → right
            tl.set(cols, { transformOrigin: "right center" });
            tl.to(cols, {
                scaleX: 0,
                duration: 0.9,
                ease: "power3.inOut",
                stagger: { amount: 0.12, from: "start" },
            });

            // Hide overlay
            tl.set(overlay, { display: "none", pointerEvents: "none" });
        });

    /* ───────────────────────────────────────────
       Listen for navigation intent BEFORE router.push
    ─────────────────────────────────────────── */
    useEffect(() => {
        const handleTransitionStart = async (e: Event) => {
            const { href } = (e as CustomEvent<{ href: string }>).detail;

            // Don't stack animations
            if (isAnimating.current) return;
            isAnimating.current = true;

            // 1. Cover screen first (user sees overlay, not new page)
            await cover(href);

            // 2. Now navigate — new page renders behind the overlay
            router.push(href);
            // Note: uncover is triggered by the pathname change (useEffect below)
        };

        window.addEventListener("page-transition-start", handleTransitionStart);
        return () => window.removeEventListener("page-transition-start", handleTransitionStart);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    /* ───────────────────────────────────────────
       Uncover when pathname actually changes
    ─────────────────────────────────────────── */
    useEffect(() => {
        // Skip very first mount — no overlay to remove
        if (!didMountUncover.current) {
            didMountUncover.current = true;
            return;
        }

        // Update quote for the new page (in case navigated via browser back/fwd)
        setQuote(getQuoteForPath(pathname));

        const run = async () => {
            await uncover();
            isAnimating.current = false;
        };

        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    /* ───────────────────────────────────────────
       Render
    ─────────────────────────────────────────── */
    return (
        <>
            {/* 18-Column burgundy transition overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9999] hidden overflow-hidden pointer-events-none"
            >
                {/* Columns */}
                <div className="flex h-full w-full">
                    {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
                        <div
                            key={i}
                            className="stair-col h-full bg-burgundy"
                            style={{
                                width: `calc(100% / ${COLUMN_COUNT} + 2px)`,
                                marginLeft: i === 0 ? 0 : "-2px",
                                transformOrigin: "left center",
                            }}
                        />
                    ))}
                </div>

                {/* Quote */}
                <div
                    ref={quoteRef}
                    className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 pointer-events-none"
                >
                    <div className="max-w-3xl">
                        <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-ivory/60 font-poppins">
                            Roselin
                        </span>
                        <h2 className="font-astoria text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ivory leading-snug tracking-tight">
                            &lsquo;{quote}&rsquo;
                        </h2>
                    </div>
                </div>
            </div>

            {/* Page content */}
            {children}
        </>
    );
};

export default PageTransition;
