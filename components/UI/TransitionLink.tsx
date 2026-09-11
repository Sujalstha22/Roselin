"use client";

import React from "react";
import { usePageTransition } from "@/providers/TransitionProvider";

interface TransitionLinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    href: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * Drop-in replacement for Next.js <Link> that plays the page transition
 * cover animation BEFORE navigating, so the overlay always appears first.
 */
const TransitionLink: React.FC<TransitionLinkProps> = ({
    href,
    children,
    className,
    onClick,
    ...rest
}) => {
    const { navigate } = usePageTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Let modifier clicks (Ctrl/Cmd/middle-click) pass through normally
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

        e.preventDefault();
        onClick?.(e);
        navigate(href);
    };

    return (
        <a href={href} className={className} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
};

export default TransitionLink;
