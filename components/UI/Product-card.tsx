"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePageTransition } from "@/providers/TransitionProvider";
import { useCart } from "@/providers/CartProvider";
import { slugify, Product as BaseProduct } from "@/lib/products";

export type Product = BaseProduct;

interface ProductCardProps {
    product: Product;
    variant?: "default" | "dark";
    onAddToCart?: (product: Product) => void;
    onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    variant = "dark",
    onAddToCart,
    onViewDetails,
}) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const { navigate } = usePageTransition();
    const { addToCart } = useCart();

    const slug = product.slug || slugify(product.name) || String(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAdded(true);
        addToCart(product, 1);
        if (onAddToCart) onAddToCart(product);
        setTimeout(() => setIsAdded(false), 1400);
    };

    const handleViewDetails = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onViewDetails) {
            onViewDetails(product);
        }
        navigate(`/products/${slug}`);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsWishlisted((prev) => !prev);
    };

    const isDark = variant === "dark";

    return (
        <div
            onClick={handleViewDetails}
            className={`group relative flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer
                bg-burgundy border border-burgundy/15 hover:border-rose-red/40 ` }
        >
            {/* Top Header: Discount Badge and Wishlist Button */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
                {product.discount ? (
                    <span className="pointer-events-auto bg-rose-red text-white text-[10px] font-medium px-2 py-0.5 tracking-wider uppercase rounded-none shadow-xs">
                        {product.discount}
                    </span>
                ) : (
                    <span />
                )}

                {/* Wishlist Heart Icon with Rosy Red fill toggle */}
                <button
                    type="button"
                    onClick={handleToggleWishlist}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    className={`pointer-events-auto p-1.5 transition-all duration-200 cursor-pointer rounded-full bg-ivory/80 backdrop-blur-xs text-burgundy/70 hover:text-rose-red hover:scale-110 active:scale-90 shadow-x`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isWishlisted ? "#c9184a" : "none"}
                        stroke={isWishlisted ? "#c9184a" : "currentColor"}
                        strokeWidth="1.6"
                        className={`w-4 h-4 transition-all duration-200 ${isWishlisted
                            ? "scale-110 drop-shadow-[0_0_8px_rgba(201,24,74,0.8)]"
                            : ""
                            }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </button>
            </div>

            {/* Product Image Area */}
            <div
                className={`relative w-full h-[210px] sm:h-[230px] md:h-[245px] flex items-center justify-center p-6 overflow-hidden bg-burgundy`}
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
            </div>

            {/* Product Details Area */}
            <div
                className={`p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-ivory `}
            >
                <div>
                    {/* Title */}
                    <h3
                        className={`text-base font-normal tracking-wide leading-snug line-clamp-1 text-burgundy font-astoria`}
                    >
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p
                        className={`text-xs leading-relaxed line-clamp-2 mt-1.5 font-light text-burgundy/75
`}
                    >
                        {product.description}
                    </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-1">
                    <span
                        className={`font-medium text-base tracking-tight text-burgundy font-semibold `}
                    >
                        ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                        <span
                            className={`line-through text-xs font-normal text-burgundy/40`}
                        >
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Bottom Action Buttons: [ View Details ] and [ Add to Cart ] */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                    {/* View Details Button */}
                    <button
                        type="button"
                        onClick={handleViewDetails}
                        className={`py-2 px-2 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-center transition-all duration-200 cursor-pointer rounded-none whitespace-nowrap border border-burgundy/25 hover:border-burgundy text-burgundy hover:bg-burgundy/5`}
                    >
                        View Details
                    </button>

                    {/* Add to Cart Button */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                        className={`py-2 px-2 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-center transition-all duration-200 cursor-pointer rounded-none whitespace-nowrap flex items-center justify-center gap-1 ${isAdded
                            ? "bg-rose-red text-white"
                            : isDark
                                ? "bg-[#e8e4dc] hover:bg-rose-red text-black hover:text-white"
                                : "bg-rose-red hover:bg-burgundy text-ivory"
                            }`}
                    >
                        {isAdded ? (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    className="w-3.5 h-3.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>Added</span>
                            </>
                        ) : (
                            <span>Add to Cart</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
