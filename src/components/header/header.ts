import './header.css';
import cartImgUrl from '../../assets/logos/cart-logo.png';

export interface HeaderComponent {
  element: HTMLElement;
  setActiveRoute: (route: string) => void;
}

export function createLogo(): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = '#/about';
  link.className = 'logo';
  link.dataset.route = '/about';

  const logoTitle = document.createElement('span');
  logoTitle.className = 'logo-title';
  logoTitle.textContent = 'VINTAGE';

  const logoSubtitle = document.createElement('span');
  logoSubtitle.className = 'logo-subtitle';
  logoSubtitle.textContent = 'Mobile Phones';

  link.append(logoTitle, logoSubtitle);
  return link;
}

export function createNavigation(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'navigation';

  const aboutLink = document.createElement('a');
  aboutLink.href = '#/about';
  aboutLink.className = 'nav-link';
  aboutLink.dataset.route = '/about';
  aboutLink.textContent = 'About us';

  const productsLink = document.createElement('a');
  productsLink.href = '#/products';
  productsLink.className = 'nav-link';
  productsLink.dataset.route = '/products';
  productsLink.textContent = 'Products';

  nav.append(aboutLink, productsLink);
  return nav;
}
export function createCartLink(): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = '#/cart';
  link.className = 'cart';
  link.dataset.route = '/cart';

  const img = document.createElement('img');
  img.src = cartImgUrl;
  img.alt = 'Cart logo';
  img.className = 'cart-icon';

  link.append(img);
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
