import './product-filters.css';
import type { Product } from '../../types/product.js';
import type { ProductFilters, StockStatus } from '../../types/filters.js';
import { createElement } from '../../utils/create-element.js';

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    if (filters.stock === 'in-stock' && product.stock < 1) {
      return false;
    }

    if (filters.stock === 'out-of-stock' && product.stock > 0) {
      return false;
    }

    if (filters.bluetooth && !product.specs.bluetooth) {
      return false;
    }

    if (filters.a2dp && !product.specs.a2dp) {
      return false;
    }

    if (filters.memoryCard !== 'all' && product.specs.memoryCard !== filters.memoryCard) {
      return false;
    }

    return true;
  });
}

function createSelect(
  labelText: string,
  options: { value: string; label: string }[],
  onChange: (value: string) => void,
): HTMLElement {
  const wrapper = createElement('label', 'filter-group', `${labelText}: `);

  const select = createElement('select');
  options.forEach(({ value, label }) => {
    const option = createElement('option', '', label);
    option.value = value;
    select.append(option);
  });

  select.addEventListener('change', () => onChange(select.value));
  wrapper.append(select);
  return wrapper;
}

function createCheckbox(labelText: string, onChange: (checked: boolean) => void): HTMLElement {
  const label = createElement('label', 'filter-checkbox');

  const checkbox = createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => onChange(checkbox.checked));

  label.append(checkbox, ` ${labelText}`);
  return label;
}

export function createProductFilters(
  products: Product[],
  onFilterChange: (filters: ProductFilters) => void,
): HTMLElement {
  const filterBar = createElement('aside', 'filter-bar');

  const currentFilters: ProductFilters = {
    category: 'all',
    stock: 'all',
    bluetooth: false,
    a2dp: false,
    memoryCard: 'all',
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    ...[...new Set(products.map((p) => p.category))].map((c) => ({
      value: c,
      label: c,
    })),
  ];

  const memoryCards = [
    { value: 'all', label: 'All Memory Cards' },
    ...[...new Set(products.map((p) => p.specs.memoryCard))].map((m) => ({
      value: m,
      label: m,
    })),
  ];

  const stockOptions: { value: StockStatus; label: string }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
  ];

  const categorySelect = createSelect('Category', categories, (val) => {
    currentFilters.category = val;
    onFilterChange(currentFilters);
  });

  const stockSelect = createSelect('Availability', stockOptions, (val) => {
    currentFilters.stock = val as StockStatus;
    onFilterChange(currentFilters);
  });

  const memoryCardSelect = createSelect('Memory Card', memoryCards, (val) => {
    currentFilters.memoryCard = val;
    onFilterChange(currentFilters);
  });

  const bluetoothCheckbox = createCheckbox('Bluetooth', (checked) => {
    currentFilters.bluetooth = checked;
    onFilterChange(currentFilters);
  });

  filterBar.append(categorySelect, stockSelect, memoryCardSelect, bluetoothCheckbox);

  return filterBar;
}
