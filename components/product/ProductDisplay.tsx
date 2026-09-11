"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "@/components/UI/Product-card";
import { ALL_PRODUCTS, Product } from "@/lib/products";

type CategoryFilter = "Skin Care" | "Makeup" | "Nail Care";
type PromotionFilter = "New Arrivals" | "Best Sellers" | "On Sale";
type SortOption =
    | "default"
    | "price-low-high"
    | "price-high-low"
    | "name-a-z"
    | "name-z-a"
    | "best-sellers";

const CATEGORIES: CategoryFilter[] = ["Skin Care", "Makeup", "Nail Care"];
const PROMOTIONS: PromotionFilter[] = ["New Arrivals", "Best Sellers", "On Sale"];

const ProductDisplay: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<CategoryFilter[]>([]);
    const [selectedPromotions, setSelectedPromotions] = useState<PromotionFilter[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>("default");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Toggle category checkbox
    const handleCategoryToggle = (cat: CategoryFilter) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
        );
    };

    // Toggle promotion checkbox
    const handlePromotionToggle = (promo: PromotionFilter) => {
        setSelectedPromotions((prev) =>
            prev.includes(promo) ? prev.filter((item) => item !== promo) : [...prev, promo]
        );
    };

    // Clear all filters
    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedPromotions([]);
        setSortBy("default");
    };

    // Filtered and Sorted products
    const filteredProducts = useMemo(() => {
        let result = [...ALL_PRODUCTS];

        // Filter by categories if any selected
        if (selectedCategories.length > 0) {
            result = result.filter((p) => selectedCategories.includes(p.category));
        }

        // Filter by promotions if any selected
        if (selectedPromotions.length > 0) {
            result = result.filter((p) =>
                selectedPromotions.some((promo) => p.promotions.includes(promo))
            );
        }

        // Apply sorting
        switch (sortBy) {
            case "price-low-high":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high-low":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name-a-z":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-z-a":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "best-sellers":
                result.sort((a, b) => {
                    const aIsBest = a.promotions.includes("Best Sellers") ? 1 : 0;
                    const bIsBest = b.promotions.includes("Best Sellers") ? 1 : 0;
                    return bIsBest - aIsBest;
                });
                break;
            case "default":
            default:
                result.sort((a, b) => a.id - b.id);
                break;
        }

        return result;
    }, [selectedCategories, selectedPromotions, sortBy]);

    const hasActiveFilters =
        selectedCategories.length > 0 || selectedPromotions.length > 0 || sortBy !== "default";

    return (
        <section className="relative w-full min-h-screen bg-ivory text-burgundy px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-12 md:py-16 select-none">
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* ================= MOBILE FILTER TOGGLE ================= */}
                <div className="lg:hidden flex items-center justify-between pb-4 border-b border-burgundy/15">
                    <button
                        type="button"
                        onClick={() => setMobileFilterOpen((prev) => !prev)}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 border border-burgundy/25 hover:border-burgundy text-burgundy transition-colors cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                            />
                        </svg>
                        <span>Filter Options</span>
                        {(selectedCategories.length > 0 || selectedPromotions.length > 0) && (
                            <span className="w-2 h-2 rounded-full bg-rose-red" />
                        )}
                    </button>

                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="text-xs text-rose-red hover:text-burgundy underline cursor-pointer"
                        >
                            Reset All
                        </button>
                    )}
                </div>

                {/* ================= LEFT SIDEBAR (FILTER OPTIONS) ================= */}
                <aside
                    className={`w-full lg:w-64 xl:w-72 shrink-0 pr-0 lg:pr-8 lg:border-r lg:border-burgundy/15 transition-all duration-300 ${mobileFilterOpen ? "block" : "hidden lg:block"
                        }`}
                >
                    {/* Main Filter Heading */}
                    <div className="pb-4 mb-6 border-b border-burgundy/15">
                        <h2 className="font-astoria text-base md:text-lg font-normal tracking-[0.2em] uppercase text-burgundy">
                            Filter Options
                        </h2>
                    </div>

                    {/* Group: BY CATEGORIES */}
                    <div className="mb-8">
                        <h3 className="flex items-center text-xs tracking-[0.2em] uppercase font-medium text-burgundy/90 mb-4">
                            <span className="text-rose-red mr-2 font-semibold">|</span>
                            By Categories
                        </h3>

                        <div className="flex flex-col gap-3 pl-1">
                            {CATEGORIES.map((category) => {
                                const isChecked = selectedCategories.includes(category);
                                return (
                                    <label
                                        key={category}
                                        className="flex items-center gap-3 cursor-pointer group select-none"
                                        onClick={() => handleCategoryToggle(category)}
                                    >
                                        {/* Custom Rosy Red Checkbox */}
                                        <span
                                            className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-all duration-200 ${isChecked
                                                ? "bg-rose-red border-rose-red text-ivory shadow-xs"
                                                : "border-burgundy/30 bg-ivory group-hover:border-burgundy"
                                                }`}
                                        >
                                            {isChecked && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-3 h-3"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </span>

                                        {/* Checkbox Label */}
                                        <span
                                            className={`text-xs md:text-sm font-light tracking-wide transition-colors ${isChecked
                                                ? "text-burgundy font-medium"
                                                : "text-burgundy/75 group-hover:text-burgundy"
                                                }`}
                                        >
                                            {category}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Group: BY PROMOTIONS */}
                    <div className="mb-8">
                        <h3 className="flex items-center text-xs tracking-[0.2em] uppercase font-medium text-burgundy/90 mb-4">
                            <span className="text-rose-red mr-2 font-semibold">|</span>
                            By Promotions
                        </h3>

                        <div className="flex flex-col gap-3 pl-1">
                            {PROMOTIONS.map((promo) => {
                                const isChecked = selectedPromotions.includes(promo);
                                return (
                                    <label
                                        key={promo}
                                        className="flex items-center gap-3 cursor-pointer group select-none"
                                        onClick={() => handlePromotionToggle(promo)}
                                    >
                                        {/* Custom Rosy Red Checkbox */}
                                        <span
                                            className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-all duration-200 ${isChecked
                                                ? "bg-rose-red border-rose-red text-ivory shadow-xs"
                                                : "border-burgundy/30 bg-ivory group-hover:border-burgundy"
                                                }`}
                                        >
                                            {isChecked && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-3 h-3"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </span>

                                        {/* Checkbox Label */}
                                        <span
                                            className={`text-xs md:text-sm font-light tracking-wide transition-colors ${isChecked
                                                ? "text-burgundy font-medium"
                                                : "text-burgundy/75 group-hover:text-burgundy"
                                                }`}
                                        >
                                            {promo}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reset Filters Option if any are selected */}
                    {hasActiveFilters && (
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="text-xs text-rose-red hover:text-burgundy tracking-wider underline transition-colors cursor-pointer"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </aside>

                {/* ================= RIGHT MAIN CONTENT AREA ================= */}
                <main className="flex-1 min-w-0">
                    {/* Top Bar: Results Count & Sort Dropdown */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-8 border-b border-burgundy/15">
                        {/* Results Counter */}
                        <p className="text-xs sm:text-sm font-light text-burgundy/80 tracking-wide">
                            Showing 1-{filteredProducts.length} of {ALL_PRODUCTS.length} results
                        </p>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <label
                                htmlFor="sort-by-select"
                                className="text-xs sm:text-sm font-light text-burgundy/90 tracking-wide shrink-0"
                            >
                                Sort by :
                            </label>

                            <div className="relative inline-block">
                                <select
                                    id="sort-by-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="appearance-none bg-ivory border border-burgundy/25 hover:border-burgundy text-burgundy text-xs sm:text-sm py-1.5 pl-3 pr-8 rounded-none cursor-pointer focus:outline-none focus:border-rose-red transition-colors tracking-wide"
                                >
                                    <option value="default" className="bg-ivory text-burgundy">
                                        Default Sorting
                                    </option>
                                    <option value="price-low-high" className="bg-ivory text-burgundy">
                                        Price: Low to High
                                    </option>
                                    <option value="price-high-low" className="bg-ivory text-burgundy">
                                        Price: High to Low
                                    </option>
                                    <option value="name-a-z" className="bg-ivory text-burgundy">
                                        Name: A to Z
                                    </option>
                                    <option value="name-z-a" className="bg-ivory text-burgundy">
                                        Name: Z to A
                                    </option>
                                    <option value="best-sellers" className="bg-ivory text-burgundy">
                                        Best Sellers
                                    </option>
                                </select>

                                {/* Dropdown Chevron */}
                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-burgundy/60">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-3.5 h-3.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ================= PRODUCT GRID ================= */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={(p) => {
                                        console.log("Added product:", p.name);
                                    }}
                                    onViewDetails={(p) => {
                                        console.log("View details for:", p.name);
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        /* No Results Empty State */
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <p className="text-burgundy/70 text-sm mb-4">
                                No products match the selected criteria.
                            </p>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="px-6 py-2.5 border border-burgundy/30 hover:border-rose-red hover:bg-rose-red text-burgundy hover:text-ivory text-xs uppercase tracking-widest transition-colors cursor-pointer"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </section>
    );
};

export default ProductDisplay;
