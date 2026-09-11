"use client";

import React from "react";
import RevealText from "@/components/UI/RevealText";

/* ─────────────────────────────────────────────────────────
   Props
   ─────────────────────────────────────────────────────── */
interface TextDividerProps {
    /**
     * The text to display.
     *
     * Use `\n` (literal backslash-n in the string) or a real newline
     * to break the text across multiple lines — RevealText handles both.
     *
     * Example:
     *   text="Beauty Never Fades,\nIt Simply Waits To Be Revealed"
     */
    text: string;

    /**
     * Tailwind classes forwarded to the RevealText <span>.
     * Defaults to `font-astoria text-ivory`.
     */
    textClassName?: string;

    /**
     * Font-size class for the <h2>.
     * Defaults to `text-2xl sm:text-3xl md:text-4xl xl:text-[2.2vw]`.
     */
    sizeClassName?: string;

    /**
     * Height of the divider section.
     * Defaults to `h-[18vh] sm:h-[22vh] md:h-[25vh]`.
     */
    heightClassName?: string;

    /**
     * Background class.
     * Defaults to `bg-burgundy`.
     */
    bgClassName?: string;
}

/* ─────────────────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────────────── */
const TextDivider: React.FC<TextDividerProps> = ({
    text,
    textClassName = "font-astoria text-ivory",
    sizeClassName = "text-[2.2vh] sm:text-[1.5vh] md:text-4xl xl:text-[2.2vw]",
    heightClassName = "h-[18vh] sm:h-[22vh] md:h-[25vh]",
    bgClassName = "bg-burgundy",
}) => {
    return (
        <section
            className={`
                flex w-full items-center justify-center
                ${heightClassName}
                ${bgClassName}
                px-6 sm:px-10 md:px-16
            `}
        >
            <h2
                className={`
                    text-center leading-snug tracking-tight
                    ${sizeClassName}
                `}
            >
                <RevealText text={text} className={textClassName} />
            </h2>
        </section>
    );
};

export default TextDivider;
