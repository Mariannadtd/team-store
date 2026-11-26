import { createButton } from '../../components/UI/button/button.js';
import catalogData from '../../data/products.json';
import { cartStore } from '../../store/cart-store.js';
import type { Product } from '../../types/product.js';
import { createElement } from '../../utils/create-element.js';
import './cart.css';

const catalog: Product[] = catalogData;

export function renderCartPage(): HTMLElement {
  const page = createElement('section', 'cart-page');
  const title = createElement('h1', 'cart-page-title', 'Shopping Cart');
  const content = createElement('div', 'cart-page-content');
  const cartList = createElement('ul', 'cart-list');

  const cartEntries = cartStore.getItems();
  let cartTotal = 0;

  for (const cartEntry of cartEntries) {
    const productDetails = catalog.find((catalogItem) => catalogItem.id === cartEntry.productId);

    if (!productDetails) {
      continue;
    }

    const cartItem = createElement('li', 'cart-item');

    const productImage = createElement('img', 'cart-item-image');
    productImage.src = productDetails.image;
    productImage.alt = productDetails.title;

    const information = createElement('div', 'cart-item-information');
    const productTitle = createElement('h2', 'cart-item-title', productDetails.title);

    const formattedPrice = `$${productDetails.price.toFixed(2)} each`;
    const unitPrice = createElement('p', 'cart-item-unit-price', formattedPrice);

    information.append(productTitle, unitPrice);

    const quantity = createElement('div', 'cart-item-quantity');

    const decreaseButton = createButton({
      text: '−',
      className: 'cart-item-quantity-button',
      disabled: cartEntry.quantity <= 1,
      onClick: () => {
        const wasDecreased = cartStore.decreaseItem(productDetails.id);

        if (wasDecreased) {
          page.replaceWith(renderCartPage());
        }
      },
    });

    decreaseButton.setAttribute('aria-label', `Decrease ${productDetails.title} quantity`);

    const quantityText = String(cartEntry.quantity);
    const quantityValue = createElement('span', 'cart-item-quantity-value', quantityText);

    const increaseButton = createButton({
      text: '+',
      className: 'cart-item-quantity-button',
      disabled: cartEntry.quantity >= productDetails.stock,
      onClick: () => {
        const wasIncreased = cartStore.addItem(productDetails);

        if (wasIncreased) {
          page.replaceWith(renderCartPage());
        }
      },
    });

    increaseButton.setAttribute('aria-label', `Increase ${productDetails.title} quantity`);

    quantity.append(decreaseButton, quantityValue, increaseButton);

    const itemSubtotal = productDetails.price * cartEntry.quantity;

    cartTotal += itemSubtotal;

    const formattedSubtotal = `$${itemSubtotal.toFixed(2)}`;
    const subtotal = createElement('strong', 'cart-item-subtotal', formattedSubtotal);

    const removeButton = createButton({
      text: 'Remove',
      className: 'cart-item-remove',
      onClick: () => {
        const wasRemoved = cartStore.removeItem(productDetails.id);

        if (wasRemoved) {
          page.replaceWith(renderCartPage());
        }
      },
    });

    removeButton.setAttribute('aria-label', `Remove ${productDetails.title} from cart`);

    cartItem.append(productImage, information, quantity, subtotal, removeButton);

    cartList.append(cartItem);
  }

  const formattedTotal = `$${cartTotal.toFixed(2)}`;

  const summary = createElement('aside', 'cart-summary');
  const totalRow = createElement('div', 'cart-summary-total');
  const totalLabel = createElement('span', 'cart-summary-label', 'Total');
  const totalValue = createElement('strong', 'cart-summary-value', formattedTotal);

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
