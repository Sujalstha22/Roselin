"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/providers/CartProvider";
import TransitionLink from "@/components/UI/TransitionLink";

export const CartDrawer: React.FC = () => {
    const {
        items,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        lastAddedItem,
        showNotification,
        closeNotification,
    } = useCart();

    return (
        <>
            {/* ================= TOAST NOTIFICATION (ROSY RED FINISH) ================= */}
            <div
                className={`fixed bottom-6 right-6 z-[300] transition-all duration-300 transform ${showNotification
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-10 opacity-0 pointer-events-none scale-95"
                    }`}
            >
                {lastAddedItem && (
                    <div className="bg-[#141214] border border-rose-red/60 text-ivory px-4 py-3 shadow-[0_10px_30px_rgba(201,24,74,0.3)] flex items-center gap-3.5 max-w-sm rounded-none backdrop-blur-md">
                        <div className="relative w-11 h-11 bg-black/40 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                            <Image
                                src={lastAddedItem.product.image}
                                alt={lastAddedItem.product.name}
                                fill
                                sizes="44px"
                                className="object-contain p-1"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-rose-red font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-red animate-pulse" />
                                Added to bag
                            </div>
                            <p className="text-xs font-medium text-white truncate">
                                {lastAddedItem.product.name}
                            </p>
                            <p className="text-[11px] text-white/60">
                                Qty: {lastAddedItem.quantity} · ${lastAddedItem.product.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <button
                                type="button"
                                onClick={() => {
                                    closeNotification();
                                    setIsCartOpen(true);
                                }}
                                className="text-[10px] uppercase tracking-wider text-rose-red hover:text-white underline cursor-pointer"
                            >
                                View
                            </button>
                            <button
                                type="button"
                                onClick={closeNotification}
                                className="text-white/40 hover:text-white text-xs self-end cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ================= BACKDROP ================= */}
            <div
                onClick={() => setIsCartOpen(false)}
                className={`fixed inset-0 z-[250] bg-black/75 backdrop-blur-xs transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* ================= SLIDE-OVER DRAWER ================= */}
            <aside
                aria-label="Shopping Bag"
                className={`fixed top-0 right-0 bottom-0 z-[260] w-full sm:w-[420px] bg-[#0d0c0e] text-white border-l border-white/10 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-red" />
                        <h2 className="font-astoria text-lg tracking-[0.15em] uppercase text-white">
                            Shopping Bag
                        </h2>
                        <span className="text-xs text-white/50 font-light">
                            ({totalItems} {totalItems === 1 ? "item" : "items"})
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Close bag"
                        className="p-1.5 text-white/60 hover:text-rose-red transition-colors cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/5 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-16 text-white/50">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="currentColor"
                                className="w-12 h-12 mb-3 text-white/20"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                            </svg>
                            <p className="font-light text-sm mb-1 text-white/80">Your bag is empty</p>
                            <p className="text-xs text-white/40 mb-6">Discover our rituals and enrich your collection.</p>
                            <button
                                type="button"
                                onClick={() => setIsCartOpen(false)}
                                className="px-6 py-2 border border-rose-red/60 text-rose-red hover:bg-rose-red hover:text-white text-xs uppercase tracking-widest transition-all cursor-pointer"
                            >
                                Continue Browsing
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.product.id}-${item.selectedColor || "default"}`} className="pt-4 flex gap-4">
                                <div className="relative w-18 h-20 bg-black/60 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        sizes="80px"
                                        className="object-contain p-2"
                                    />
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-xs sm:text-sm font-light text-white truncate">
                                                {item.product.name}
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.product.id)}
                                                aria-label="Remove item"
                                                className="text-white/40 hover:text-rose-red transition-colors text-xs cursor-pointer p-0.5"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {item.selectedColor && (
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full border border-white/20"
                                                    style={{ backgroundColor: item.selectedColor }}
                                                />
                                                <span className="text-[10px] text-white/50 uppercase tracking-wider">
                                                    Shade Selected
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                                        <div className="flex items-center border border-white/20 text-xs">
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="px-2 py-0.5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                                            >
                                                −
                                            </button>
                                            <span className="px-2 py-0.5 text-xs text-white min-w-[20px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="px-2 py-0.5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <span className="text-xs sm:text-sm font-medium text-rose-red">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="p-5 border-t border-white/10 bg-black/60 space-y-3">
                        <div className="flex items-center justify-between text-xs text-white/70">
                            <span>Subtotal</span>
                            <span className="text-base font-semibold text-white">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-[11px] text-white/40">
                            Taxes and shipping calculated at checkout.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                alert("Checkout feature coming soon. Thank you for choosing Roselin!");
                            }}
                            className="w-full py-3 bg-rose-red hover:bg-[#a0133a] text-white font-medium text-xs tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(201,24,74,0.4)]"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;
