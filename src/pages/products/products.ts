import './products.css';
import { createProductCard } from '../../components/product-card/product-card.js';
import ProductsData from '../../data/products.json';
import type { Product } from '../../types/product.js';
import { cartStore } from '../../store/cart-store.js';

function addProductToCart(product: Product): void {
  cartStore.addItem(product);
}

export function renderProductsPage(products: Product[] = ProductsData): HTMLElement {
  const productsGrid = document.createElement('div');
  productsGrid.className = 'grid-container';

  if (products.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'products-not-found';
    emptyMessage.textContent = 'Products not found';
    productsGrid.append(emptyMessage);
    return productsGrid;
  }

  const cards = products.map((product) => createProductCard(product, addProductToCart));
  cards.forEach((card) => productsGrid.append(card));
  return productsGrid;
}
