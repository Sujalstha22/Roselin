"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useRef,
} from "react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface TransitionContextValue {
    /** Call this instead of router.push / Link href to navigate with the transition */
    navigate: (href: string) => void;
}

/* ─────────────────────────────────────────────
   Context
───────────────────────────────────────────── */
const TransitionContext = createContext<TransitionContextValue | null>(null);

export const usePageTransition = () => {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error("usePageTransition must be used inside TransitionProvider");
    return ctx;
};

/* ─────────────────────────────────────────────
   Provider
───────────────────────────────────────────── */
export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const navigate = useCallback((href: string) => {
        // The PageTransition component listens for this custom event,
        // plays the cover sweep first, then navigates programmatically
        // so the new page only appears after the overlay is fully covering the screen.
        const event = new CustomEvent("page-transition-start", {
            detail: { href },
        });
        window.dispatchEvent(event);
    }, []);

    return (
        <TransitionContext.Provider value={{ navigate }}>
            {children}
        </TransitionContext.Provider>
    );
};
