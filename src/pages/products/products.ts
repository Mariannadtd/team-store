import './products.css';
import { createProductCard } from '../../components/product-card/product-card.js';
import {
  createProductFilters,
  filterProducts,
} from '../../components/product-filters/product-filters.js';
import ProductsData from '../../data/products.json';
import type { Product } from '../../types/product.js';
import { cartStore } from '../../store/cart-store.js';
import { createElement } from '../../utils/create-element.js';

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

export function renderShopPage(products: Product[] = ProductsData): HTMLElement {
  const shopContainer = createElement('section', 'shop-page');

  let currentGrid = renderProductsPage(products);

  const filterBar = createProductFilters(products, (activeFilters) => {
    const filtered = filterProducts(products, activeFilters);
    const updatedGrid = renderProductsPage(filtered);

    currentGrid.replaceWith(updatedGrid);
    currentGrid = updatedGrid;
  });

  shopContainer.append(filterBar, currentGrid);
  return shopContainer;
}
