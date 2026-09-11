"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { Product } from "@/lib/products";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor?: string;
}

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    lastAddedItem: CartItem | null;
    showNotification: boolean;
    addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setIsCartOpen: (open: boolean) => void;
    closeNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "roselin_cart_items_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
    const [showNotification, setShowNotification] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch (e) {
            console.error("Failed to load cart from storage", e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save cart to localStorage on changes
    useEffect(() => {
        if (!isLoaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            console.error("Failed to save cart to storage", e);
        }
    }, [items, isLoaded]);

    const addToCart = useCallback(
        (product: Product, quantity = 1, selectedColor?: string) => {
            setItems((prev) => {
                const existingIndex = prev.findIndex(
                    (item) =>
                        item.product.id === product.id &&
                        item.selectedColor === selectedColor
                );

                if (existingIndex > -1) {
                    const updated = [...prev];
                    updated[existingIndex] = {
                        ...updated[existingIndex],
                        quantity: updated[existingIndex].quantity + quantity,
                    };
                    return updated;
                }

                return [...prev, { product, quantity, selectedColor }];
            });

            setLastAddedItem({ product, quantity, selectedColor });
            setShowNotification(true);

            // Auto-hide notification after 3 seconds
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        },
        []
    );

    const removeFromCart = useCallback((productId: number) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const toggleCart = useCallback(() => {
        setIsCartOpen((prev) => !prev);
    }, []);

    const closeNotification = useCallback(() => {
        setShowNotification(false);
    }, []);

    const totalItems = useMemo(
        () => items.reduce((acc, item) => acc + item.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
            ),
        [items]
    );

    return (
        <CartContext.Provider
            value={{
                items,
                totalItems,
                totalPrice,
                isCartOpen,
                lastAddedItem,
                showNotification,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                toggleCart,
                setIsCartOpen,
                closeNotification,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
