import './styles/variables.css';
import './styles/global.css';
import { renderAboutPage } from './pages/about/about.js';
import { createHeader } from './components/header/header.js';
import { renderProductsPage } from './pages/products/products.js';
import { renderCartPage } from './pages/cart/cart.js';
import { initRouter } from './app/router.js';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Не найден элемент #app');
}

const header = createHeader();
const pageOutlet = document.createElement('main');

app.append(header.element, pageOutlet);

initRouter({
  routes: {
    '/about': renderAboutPage,
    '/products': renderProductsPage,
    '/cart': renderCartPage,
  },
  defaultRoute: '/about',
  outlet: pageOutlet,
  onRouteChange: (route) => {
    header.setActiveRoute(route);
  },
});

// app.innerHTML = `
//   <h1>Team Store</h1>
// `;
// app.append(createHeader());
// app.append(renderAboutPage());
