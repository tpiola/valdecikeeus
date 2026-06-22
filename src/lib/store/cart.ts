import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

export interface CartItem {
  product: Product;
  size: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (product: Product, size: number) => void;
  removeItem: (slug: string, size: number) => void;
  updateQuantity: (slug: string, size: number, quantity: number) => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (product, size) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.slug === product.slug && i.size === size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { product, size, quantity: 1 }],
            isOpen: true,
          };
        }),
      removeItem: (slug, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.slug === slug && i.size === size)
          ),
        })),
      updateQuantity: (slug, size, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.slug === slug && i.size === size
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),
      total: () =>
        get().items.reduce(
          (acc, i) => acc + i.product.price * i.quantity,
          0
        ),
      count: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    { name: "keeus-cart" }
  )
);
