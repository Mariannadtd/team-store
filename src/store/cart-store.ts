import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';
type CartListener = () => void;

const items: CartItem[] = [];
const listeners = new Set<CartListener>();

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

export const cartStore = {
  getItems(): CartItem[] {
    return items.map((item) => ({ ...item }));
  },

  getTotalQuantity(): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  hasItem(productId: number): boolean {
    return items.some((item) => item.productId === productId);
  },

  subscribe(listener: CartListener): void {
    listeners.add(listener);
  },

  addItem(product: Product): boolean {
    const existingItem = items.find((item) => item.productId === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return false;
      }
      existingItem.quantity += 1;
      notifyListeners();
      return true;
    }
    if (product.stock <= 0) {
      return false;
    }

    items.push({
      productId: product.id,
      quantity: 1,
    });

    notifyListeners();

    return true;
  },
  decreaseItem(productId: number): boolean {
    const existingItem = items.find((item) => item.productId === productId);
    if (!existingItem || existingItem.quantity <= 1) {
      return false;
    }
    existingItem.quantity -= 1;
    notifyListeners();
    return true;
  },

  removeItem(productId: number): boolean {
    const itemIndex = items.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      return false;
    }

    items.splice(itemIndex, 1);
    notifyListeners();
    return true;
  },
};
