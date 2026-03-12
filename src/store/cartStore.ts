import { create } from 'zustand';
import { CartItemType, Product } from '../models/types';

interface CartStore {
  items: CartItemType[];
  addToCart: (product: Product) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeItem: (id: number) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((it) => it.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((it) =>
            it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  increaseQty: (id) =>
    set((state) => ({
      items: state.items.map((it) =>
        it.product.id === id ? { ...it, quantity: it.quantity + 1 } : it
      ),
    })),

  decreaseQty: (id) =>
    set((state) => {
      const item = state.items.find((it) => it.product.id === id);
      if (!item) return state;
      if (item.quantity <= 1) {
        return { items: state.items.filter((it) => it.product.id !== id) };
      }
      return {
        items: state.items.map((it) =>
          it.product.id === id ? { ...it, quantity: it.quantity - 1 } : it
        ),
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((it) => it.product.id !== id),
    })),

  getTotal: () => {
    return get().items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((sum, it) => sum + it.quantity, 0);
  },
}));