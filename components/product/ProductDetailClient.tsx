"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/UI/Product-card";
import { Product } from "@/lib/products";
import { usePageTransition } from "@/providers/TransitionProvider";
import { useCart } from "@/providers/CartProvider";

interface ProductDetailClientProps {
    product: Product;
    similarProducts: Product[];
}

const DEFAULT_SHADES = [
    { name: "Vanilla Glaze", color: "transparent", border: true },
    { name: "Lilac Haze", color: "#d8b4e2" },
    { name: "Crème Ivory", color: "#fbf7ee" },
    { name: "Mint Dew", color: "#bbf7d0" },
    { name: "Petal Pink", color: "#fca5a5" },
    { name: "Rosy Red", color: "#c9184a" },
];

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
    product,
    similarProducts,
}) => {
    const { navigate } = usePageTransition();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const shades = product.shadeColors
        ? product.shadeColors.map((c, i) => ({
            name: `Shade ${i + 1}`,
            color: c,
            border: c === "transparent",
        }))
        : DEFAULT_SHADES;

    const handleAddToCart = () => {
        setIsAdded(true);
        const selectedColor = shades[selectedShadeIndex]?.color;
        addToCart(product, quantity, selectedColor);
        setTimeout(() => setIsAdded(false), 1600);
    };

    const handleDecrement = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    return (
        <section className="relative w-full min-h-screen bg-ivory text-burgundy pt-24 sm:pt-28 pb-20 sm:pb-28 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 select-none overflow-hidden">
            {/* Rosy red / burgundy subtle ambient lighting in background */}
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-rose-red/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-rose-red/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1500px] mx-auto relative z-10">
                {/* ================= BACK BUTTON ================= */}
                <div className="mb-8 sm:mb-10">
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-burgundy/70 hover:text-burgundy transition-colors duration-200 cursor-pointer group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.8"
                            stroke="currentColor"
                            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        <span className="tracking-wide">Back</span>
                    </button>
                </div>

                {/* ================= MAIN PRODUCT HERO SECTION ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center mb-20 sm:mb-28">
                    {/* Left: Product Image Box with dots (bg-burgundy) */}
                    <div className="lg:col-span-6 w-full">
                        <div className="relative aspect-square sm:aspect-[4/3.6] lg:aspect-square w-full bg-burgundy border border-burgundy/15 flex flex-col justify-between p-6 sm:p-8 shadow-lg group overflow-hidden">
                            {/* Top row: empty left, Wishlist on right */}
                            <div className="w-full flex justify-end z-20">
                                <button
                                    type="button"
                                    onClick={() => setIsWishlisted((prev) => !prev)}
                                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                    className="p-2 rounded-full bg-ivory/80 backdrop-blur-xs text-burgundy/70 hover:text-rose-red hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={isWishlisted ? "#c9184a" : "none"}
                                        stroke={isWishlisted ? "#c9184a" : "currentColor"}
                                        strokeWidth="1.5"
                                        className={`w-5 h-5 transition-all duration-200 ${isWishlisted
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

                            {/* Center Product Image */}
                            <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[400px] flex items-center justify-center my-auto">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Bottom Dots Row */}
                            <div className="w-full flex items-center justify-center gap-3 pt-4 z-20">
                                {shades.map((shade, index) => {
                                    const isSelected = selectedShadeIndex === index;
                                    return (
                                        <button
                                            key={shade.name}
                                            type="button"
                                            onClick={() => setSelectedShadeIndex(index)}
                                            title={shade.name}
                                            aria-label={shade.name}
                                            className={`size-3 sm:size-3.5 rounded-full transition-all duration-200 cursor-pointer relative ${shade.border
                                                ? "border border-ivory/80 bg-transparent"
                                                : ""
                                                } ${isSelected
                                                    ? "ring-2 ring-rose-red ring-offset-2 ring-offset-burgundy scale-125"
                                                    : "hover:scale-115 opacity-85 hover:opacity-100"
                                                }`}
                                            style={{
                                                backgroundColor:
                                                    shade.color !== "transparent"
                                                        ? shade.color
                                                        : undefined,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Information (all text in burgundy) */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        {/* Category Badge */}
                        <div className="mb-4">
                            <span className="inline-block border border-burgundy/30 px-3 py-1 text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-burgundy">
                                {product.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-astoria text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-normal tracking-wide text-burgundy uppercase leading-tight mb-5">
                            {product.name}
                        </h1>

                        {/* Description */}
                        <p className="text-sm sm:text-base font-light text-burgundy/80 leading-relaxed max-w-xl mb-6">
                            {product.description}
                        </p>

                        {/* Reviews & Star Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-[#f59e0b] text-sm tracking-widest">
                                {"★".repeat(Math.floor(product.rating || 5))}
                                {product.rating && product.rating % 1 !== 0 ? "★" : ""}
                            </div>
                            <span className="text-xs sm:text-sm text-burgundy/70 font-light">
                                {product.reviewsCount || 32} reviews
                            </span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-3 mb-8">
                            <span className="text-2xl sm:text-3xl font-semibold text-burgundy tracking-tight">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-base text-burgundy/40 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Quantity Selector & ADD TO CART Action Row */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 max-w-md">
                            {/* Quantity box [- 1 +] */}
                            <div className="flex items-center border border-burgundy/25 bg-transparent h-12">
                                <button
                                    type="button"
                                    onClick={handleDecrement}
                                    aria-label="Decrease quantity"
                                    className="px-3.5 h-full hover:bg-burgundy/10 text-burgundy/75 hover:text-burgundy transition-colors cursor-pointer text-base"
                                >
                                    −
                                </button>
                                <span className="px-4 h-full flex items-center justify-center text-sm font-medium text-burgundy min-w-[36px]">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleIncrement}
                                    aria-label="Increase quantity"
                                    className="px-3.5 h-full hover:bg-burgundy/10 text-burgundy/75 hover:text-burgundy transition-colors cursor-pointer text-base"
                                >
                                    +
                                </button>
                            </div>

                            {/* ADD TO CART Button */}
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className={`flex-1 min-w-[180px] h-12 text-xs font-semibold uppercase tracking-[0.2em] px-8 transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2 ${isAdded
                                    ? "bg-rose-red text-ivory"
                                    : "bg-burgundy hover:bg-rose-red text-ivory"
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
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>
                                        <span>Added to Bag</span>
                                    </>
                                ) : (
                                    <span>Add to Cart</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= SIMILAR PRODUCTS SECTION ================= */}
                <div className="pt-8 sm:pt-12 border-t border-burgundy/15">
                    <h2 className="font-astoria text-2xl sm:text-3xl md:text-4xl text-burgundy font-normal tracking-wide mb-8 sm:mb-10">
                        Similar Products
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                        {similarProducts.map((simProduct) => (
                            <ProductCard
                                key={simProduct.id}
                                product={simProduct}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailClient;
