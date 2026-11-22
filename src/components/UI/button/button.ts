import './button.css';

export interface ButtonOptions {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function createButton(options: ButtonOptions): HTMLButtonElement {
  const button = document.createElement('button');

  button.type = 'button';
  button.className = 'button';
  button.textContent = options.text;
  button.disabled = options.disabled ?? false;
  if (options.className) {
    button.classList.add(options.className);
  }
  if (options.onClick) {
    button.addEventListener('click', options.onClick);
  }
  return button;
}
