import './styles/variables.css';
import './styles/global.css';
import { renderAboutPage } from './pages/about/about.js';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Не найден элемент #app');
}

app.innerHTML = `
  <h1>Team Store</h1>
`;

app.append(renderAboutPage());
