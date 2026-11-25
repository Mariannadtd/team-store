import './product-card.css';
import { createButton } from '../UI/button/button.js';
import type { Product } from '../../types/product.js';

export function createProductCard(
  product: Product,
  onAddToCart?: (product: Product) => void,
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'product-card';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = `${product.brand} ${product.model}`;

  imgContainer.append(img);

  const title = document.createElement('h3');
  title.textContent = product.title;

  const description = document.createElement('p');
  description.textContent = product.description;

  const producInfoText = document.createElement('p');
  producInfoText.textContent = 'Info:';
  producInfoText.className = 'infospec-heading';

  const productInfo = document.createElement('ul');

  const brandModel = document.createElement('li');
  brandModel.textContent = `${product.brand} ${product.model}`;

  const price = document.createElement('li');
  price.textContent = `Price: $${product.price.toFixed(2)}`;

  productInfo.append(producInfoText, brandModel, price);

  const producSpecText = document.createElement('p');
  producSpecText.textContent = 'specs:';
  producSpecText.className = 'infospec-heading';

  const productSpecs = document.createElement('ul');

  const simCards = document.createElement('li');
  simCards.textContent = `SIM Cards: ${product.specs.simCards}`;

  const bluetooth = document.createElement('li');
  bluetooth.textContent = `Bluetooth: ${product.specs.bluetooth ? 'Yes' : 'No'}`;

  const camera = document.createElement('li');
  camera.textContent = `Camera: ${product.specs.camera}`;

  productSpecs.append(producSpecText, simCards, bluetooth, camera);

  const productFullSummary = document.createElement('div');
  productFullSummary.className = 'infospec-summary';
  productFullSummary.append(productInfo, productSpecs);

  const addToCartButton = createButton({
    text: 'Add to cart',
    disabled: product.stock === 0,
    className: 'add-to-cart-button',
    onClick: () => onAddToCart?.(product),
  });

  const fullTextContent = document.createElement('div');
  fullTextContent.className = 'full-text';
  fullTextContent.append(title, description, productFullSummary);

  card.append(imgContainer, fullTextContent, addToCartButton);

  return card;
}
