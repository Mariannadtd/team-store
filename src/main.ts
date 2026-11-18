import './styles/variables.css';
import './styles/global.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Не найден элемент #app');
}

app.innerHTML = `
  <h1>Team Store</h1>
`;
