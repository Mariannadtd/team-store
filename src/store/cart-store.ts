import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

const items: CartItem[] = [];

export const cartStore = {
  getItems(): CartItem[] {
    return items.map((item) => ({ ...item }));
  },

  addItem(product: Product): boolean {
    const existingItem = items.find((item) => item.productId === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return false;
      }
      existingItem.quantity += 1;
      return true;
    }
    if (product.stock <= 0) {
      return false;
    }

    items.push({
      productId: product.id,
      quantity: 1,
    });

    return true;
  },
};
