import { createElement } from '../../utils/create-element.js';
import { createButton } from '../../components/UI/button/button.js';
import './cart.css';

export function renderCartPage(): HTMLElement {
  const page = createElement('section', 'cart-page');
  const title = createElement('h1', 'cart-page-title', 'Shopping Cart');
  const content = createElement('div', 'cart-page-content');
  const cartList = createElement('ul', 'cart-list');
  const cartItem = createElement('li', 'cart-item');
  const productImage = createElement('img', 'cart-item-image');
  productImage.src = '/assets/products/nokia-c3-00.jpg';
  productImage.alt = 'Nokia C3-00';
  cartItem.append(productImage);
  cartList.append(cartItem);

  const information = createElement('div', 'cart-item-information');
  const productTitle = createElement('h2', 'cart-item-title', 'Nokia C3-00');
  const unitPrice = createElement('p', 'cart-item-unit-price', '$49.99 each');
  information.append(productTitle, unitPrice);

  const quantity = createElement('div', 'cart-item-quantity');

  const decreaseButton = createElement('button', 'cart-item-quantity-button', '−');
  decreaseButton.type = 'button';
  decreaseButton.setAttribute('aria-label', 'Decrease quantity');
  const quantityValue = createElement('span', 'cart-item-quantity-value', '2');
  const increaseButton = createElement('button', 'cart-item-quantity-button', '+');
  increaseButton.type = 'button';
  increaseButton.setAttribute('aria-label', 'Increase quantity');
  quantity.append(decreaseButton, quantityValue, increaseButton);

  const subtotal = createElement('strong', 'cart-item-subtotal', '$99.98');
  const removeButton = createElement('button', 'cart-item-remove', '×');
  removeButton.type = 'button';
  removeButton.setAttribute('aria-label', 'Remove item');

  cartItem.append(productImage, information, quantity, subtotal, removeButton);
  cartList.append(cartItem);

  const summary = createElement('aside', 'cart-summary');
  const totalRow = createElement('div', 'cart-summary-total');
  const totalLabel = createElement('span', 'cart-summary-label', 'Total');
  const totalValue = createElement('strong', 'cart-summary-value', '$99.98');
  totalRow.append(totalLabel, totalValue);

  const checkoutButton = createButton({
    text: 'Checkout',
    className: 'cart-summary-button',
  });
  summary.append(totalRow, checkoutButton);
  content.append(cartList, summary);
  page.append(title, content);

  return page;
}
