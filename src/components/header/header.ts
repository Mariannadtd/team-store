import './header.css';
import { cartStore } from '../../store/cart-store.js';
import cartImgUrl from '../../assets/logos/cart-logo.png';
import { createElement } from '../../utils/create-element.js';

export interface HeaderComponent {
  element: HTMLElement;
  setActiveRoute: (route: string) => void;
}

export function createLogo(): HTMLAnchorElement {
  const link = createElement('a', 'logo');
  link.href = '#/about';
  link.dataset.route = '/about';

  const logoTitle = createElement('span', 'logo-title', 'VINTAGE');
  const logoSubtitle = createElement('span', 'logo-subtitle', 'Mobile Phones');

  link.append(logoTitle, logoSubtitle);
  return link;
}

export function createNavigation(): HTMLElement {
  const nav = createElement('nav', 'navigation');

  const aboutLink = createElement('a', 'nav-link', 'About us');
  aboutLink.href = '#/about';
  aboutLink.dataset.route = '/about';

  const productsLink = createElement('a', 'nav-link', 'Products');
  productsLink.href = '#/products';
  productsLink.dataset.route = '/products';

  nav.append(aboutLink, productsLink);
  return nav;
}
export function createCartLink(): HTMLAnchorElement {
  const link = createElement('a', 'cart');
  link.href = '#/cart';
  link.dataset.route = '/cart';
  const img = createElement('img', 'cart-icon');
  img.src = cartImgUrl;
  img.alt = 'Cart logo';
  const cartCount = createElement('span', 'cart-count');
  const updateCartCount = (): void => {
    const totalQuantity = cartStore.getTotalQuantity();
    cartCount.textContent = String(totalQuantity);
    cartCount.hidden = totalQuantity === 0;
    link.setAttribute(
      'aria-label',
      totalQuantity === 0 ? 'Cart is empty' : `Cart with ${totalQuantity} items`,
    );
  };

  updateCartCount();
  cartStore.subscribe(updateCartCount);
  link.append(img, cartCount);
  return link;
}

export function createHeader(): HeaderComponent {
  const header = document.createElement('header');
  header.append(createLogo(), createNavigation(), createCartLink());
  const allLinks = header.querySelectorAll<HTMLAnchorElement>('a[data-route]');

  const setActiveRoute = (currentRoute: string): void => {
    allLinks.forEach((link) => {
      const isActive = link.dataset.route === currentRoute;
      link.classList.toggle('active', isActive);
    });
  };

  return { element: header, setActiveRoute };
}
