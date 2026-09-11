import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { ALL_PRODUCTS, getProductBySlug, getSimilarProducts, slugify } from "@/lib/products";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const paramsList: { slug: string }[] = [];
    ALL_PRODUCTS.forEach((product) => {
        paramsList.push({ slug: String(product.id) });
        if (product.slug) {
            paramsList.push({ slug: product.slug });
        }
        paramsList.push({ slug: slugify(product.name) });
    });
    // Also include literal "slug" to support direct /products/slug navigation
    paramsList.push({ slug: "slug" });
    return paramsList;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found | Roselin",
            description: "The requested luxury product could not be found.",
        };
    }

    return {
        title: `${product.name} | Roselin Luxury Beauty`,
        description: product.description,
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const similarProducts = getSimilarProducts(product, 4);

    return (
        <ProductDetailClient
            product={product}
            similarProducts={similarProducts}
        />
    );
}
