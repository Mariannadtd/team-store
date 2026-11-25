import './button.css';
import { createElement } from '../../../utils/create-element.js';

export interface ButtonOptions {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function createButton(options: ButtonOptions): HTMLButtonElement {
  const button = createElement('button', 'button', options.text);

  button.type = 'button';
  button.disabled = options.disabled ?? false;
  if (options.className) {
    button.classList.add(options.className);
  }
  if (options.onClick) {
    button.addEventListener('click', options.onClick);
  }
  return button;
}
