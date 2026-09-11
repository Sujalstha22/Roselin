export interface Product {
    id: number;
    slug?: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    category: "Skin Care" | "Makeup" | "Nail Care";
    promotions: ("New Arrivals" | "Best Sellers" | "On Sale")[];
    rating?: number;
    reviewsCount?: number;
    shadeColors?: string[];
}

export function slugify(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export const ALL_PRODUCTS: Product[] = [
    {
        id: 1,
        slug: "Roselin-face-cream",
        name: "Roselin Face Cream",
        description:
            "A premium daily face cream formulated to restore, deeply hydrate, and soothe the skin with active botanicals.",
        price: 240.0,
        originalPrice: 300.0,
        discount: "20% off",
        image: "/images/exclusive/2.png",
        category: "Skin Care",
        promotions: ["On Sale", "Best Sellers"],
        rating: 5,
        reviewsCount: 48,
    },
    {
        id: 2,
        slug: "Roselin-face-wash",
        name: "Roselin Face Wash",
        description:
            "A gentle daily cleanser that purifies your skin, draws out impurities, and balances natural oils effectively.",
        price: 95.0,
        image: "/images/exclusive/4.png",
        category: "Skin Care",
        promotions: ["Best Sellers"],
        rating: 4.8,
        reviewsCount: 29,
    },
    {
        id: 3,
        slug: "Roselin-lip-balm",
        name: "Roselin Lip Balm",
        description:
            "A nourishing lip balm available in five delicious flavors. Infused with natural plant based oils and butter to deeply hydrate, soothe dry lips, and leave a soft hint of color and shine.",
        price: 45.0,
        image: "/images/exclusive/5.png",
        category: "Skin Care",
        promotions: ["New Arrivals"],
        rating: 4.8,
        reviewsCount: 32,
        shadeColors: [
            "transparent", // outline
            "#d8b4e2",     // lavender/purple
            "#fbf7ee",     // vanilla ivory
            "#bbf7d0",     // soft mint
            "#fca5a5",     // blush rose
            "#c9184a",     // rosy red
        ],
    },
    {
        id: 4,
        slug: "Roselin-radiance-serum",
        name: "Roselin Glow Serum",
        description:
            "A lightweight, quick absorbing serum that delivers deep hydration while promoting a luminous, radiant skin finish.",
        price: 195.0,
        originalPrice: 220.0,
        discount: "15% off",
        image: "/images/exclusive/1.png",
        category: "Skin Care",
        promotions: ["On Sale", "New Arrivals"],
        rating: 4.9,
        reviewsCount: 41,
    },
    {
        id: 5,
        slug: "Roselin-foam-cleanser",
        name: "Roselin Foam Cleanser",
        description:
            "A gentle, airy foam cleanser that lifts away dirt, makeup, and impurities without stripping natural moisture.",
        price: 88.0,
        image: "/images/exclusive/4.png",
        category: "Skin Care",
        promotions: ["Best Sellers"],
        rating: 4.7,
        reviewsCount: 24,
    },
    {
        id: 6,
        slug: "Roselin-velvet-lipstick",
        name: "Roselin Velvet Lipstick",
        description:
            "Richly pigmented couture matte lipstick that glides effortlessly with hydration and all-day comfort.",
        price: 55.0,
        image: "/images/exclusive/3.png",
        category: "Makeup",
        promotions: ["Best Sellers"],
        rating: 4.9,
        reviewsCount: 56,
        shadeColors: ["#c9184a", "#800f2f", "#ff4d6d", "#590d22"],
    },
    {
        id: 7,
        slug: "Roselin-nail-lacquer-noir",
        name: "Roselin Nail Lacquer Noir",
        description:
            "High-gloss chip-resistant nail lacquer in timeless midnight black, offering flawless mirror shine.",
        price: 35.0,
        image: "/images/exclusive/6.png",
        category: "Nail Care",
        promotions: ["New Arrivals"],
        rating: 4.6,
        reviewsCount: 18,
    },
    {
        id: 8,
        slug: "Roselin-botanical-mist-toner",
        name: "Roselin Botanical Mist Toner",
        description:
            "Refreshing facial mist crafted from rose extract and floral distillates to revitalize skin anytime.",
        price: 75.0,
        image: "/images/exclusive/4.png",
        category: "Skin Care",
        promotions: ["New Arrivals"],
        rating: 4.5,
        reviewsCount: 19,
    },
    {
        id: 9,
        slug: "Roselin-obsidian-eye-cream",
        name: "Roselin Obsidian Eye Cream",
        description:
            "Intensive peptide eye contour treatment to diminish dark circles, reduce puffiness, and smooth tired eyes.",
        price: 160.0,
        image: "/images/exclusive/5.png",
        category: "Skin Care",
        promotions: ["Best Sellers"],
        rating: 4.8,
        reviewsCount: 35,
    },
    {
        id: 10,
        slug: "Roselin-silk-fluid-foundation",
        name: "Roselin Silk Fluid Foundation",
        description:
            "Featherlight luminous foundation that blends into a second-skin finish with medium buildable coverage.",
        price: 90.0,
        image: "/images/exclusive/6.png",
        category: "Makeup",
        promotions: ["New Arrivals"],
        rating: 4.7,
        reviewsCount: 31,
    },
    {
        id: 11,
        slug: "Roselin-cuticle-care-elixir",
        name: "Roselin Cuticle Care Elixir",
        description:
            "Deeply penetrating conditioning oil with vitamin E and jojoba to strengthen nails and soften cuticles.",
        price: 40.0,
        originalPrice: 50.0,
        discount: "20% off",
        image: "/images/about/divider-image.jpeg",
        category: "Nail Care",
        promotions: ["On Sale"],
        rating: 4.6,
        reviewsCount: 14,
    },
    {
        id: 12,
        slug: "Roselin-restorative-night-oil",
        name: "Roselin Restorative Night Oil",
        description:
            "Overnight renewing blend of botanical squalane and evening primrose to awaken with supple, glowing skin.",
        price: 210.0,
        image: "/images/about/footer-image.jpeg",
        category: "Skin Care",
        promotions: ["Best Sellers"],
        rating: 5.0,
        reviewsCount: 52,
    },
    {
        id: 13,
        slug: "Roselin-tinted-cheek-lip-flush",
        name: "Roselin Tinted Cheek & Lip Flush",
        description:
            "Multipurpose creamy stick balm delivering a dewy wash of healthy color for effortless everyday elegance.",
        price: 50.0,
        image: "/images/home/exp-1.jpg",
        category: "Makeup",
        promotions: ["New Arrivals"],
        rating: 4.7,
        reviewsCount: 27,
    },
    {
        id: 14,
        slug: "Roselin-gel-top-coat",
        name: "Roselin Gel Top Coat",
        description:
            "Ultra-cushioned gel-effect top coat that seals manicure with crystalline shine and extended wear.",
        price: 30.0,
        image: "/images/home/exp-2.jpg",
        category: "Nail Care",
        promotions: ["Best Sellers"],
        rating: 4.8,
        reviewsCount: 22,
    },
    {
        id: 15,
        slug: "Roselin-gentle-face-polish",
        name: "Roselin Gentle Face Polish",
        description:
            "Micro-exfoliating enzyme polish that gently lifts dull surface cells without disrupting the moisture barrier.",
        price: 110.0,
        image: "/images/home/exp-3.jpg",
        category: "Skin Care",
        promotions: ["New Arrivals"],
        rating: 4.6,
        reviewsCount: 16,
    },
    {
        id: 16,
        slug: "Roselin-precision-gel-liner",
        name: "Roselin Precision Gel Liner",
        description:
            "Waterproof, smudge-proof matte black gel eyeliner with ultra-rich pigment and smooth glide application.",
        price: 42.0,
        image: "/images/home/exp-4.jpg",
        category: "Makeup",
        promotions: ["Best Sellers"],
        rating: 4.9,
        reviewsCount: 44,
    },
    {
        id: 17,
        slug: "Roselin-rose-damascena-hydrosol",
        name: "Roselin Rose Damascena Hydrosol",
        description:
            "Pure distilled organic rose hydrosol that tones, tightens pores, and restores natural pH balance.",
        price: 65.0,
        originalPrice: 80.0,
        discount: "18% off",
        image: "/images/about/about-1.jpeg",
        category: "Skin Care",
        promotions: ["On Sale"],
        rating: 4.8,
        reviewsCount: 38,
    },
    {
        id: 18,
        slug: "Roselin-radiant-sculpt-bronzer",
        name: "Roselin Radiant Sculpt Bronzer",
        description:
            "Finely milled powder bronzer with subtle warmth and satin finish for naturally sculpted dimensions.",
        price: 70.0,
        image: "/images/about/about-hero.jpeg",
        category: "Makeup",
        promotions: ["Best Sellers"],
        rating: 4.7,
        reviewsCount: 25,
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    if (!slug) return undefined;
    const cleanSlug = slug.toLowerCase().trim();

    // Special case: if slug is literally "slug", return Roselin Lip Balm (id 3) as displayed in the user's mockup!
    if (cleanSlug === "slug" || cleanSlug === "Roselin-lip-balm") {
        return ALL_PRODUCTS.find((p) => p.id === 3) || ALL_PRODUCTS[2];
    }

    // Try finding by id
    const numId = parseInt(cleanSlug, 10);
    if (!isNaN(numId)) {
        const found = ALL_PRODUCTS.find((p) => p.id === numId);
        if (found) return found;
    }

    // Try finding by slug property or slugified name
    return (
        ALL_PRODUCTS.find((p) => p.slug === cleanSlug) ||
        ALL_PRODUCTS.find((p) => slugify(p.name) === cleanSlug)
    );
}

export function getSimilarProducts(currentProduct: Product, limit = 4): Product[] {
    // Return products in the same category or fallback to top products
    const sameCat = ALL_PRODUCTS.filter(
        (p) => p.id !== currentProduct.id && p.category === currentProduct.category
    );
    if (sameCat.length >= limit) return sameCat.slice(0, limit);

    // If not enough in same category, fill from other categories
    const others = ALL_PRODUCTS.filter(
        (p) => p.id !== currentProduct.id && p.category !== currentProduct.category
    );
    return [...sameCat, ...others].slice(0, limit);
}
