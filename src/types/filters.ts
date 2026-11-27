export interface ProductFilters {
  category: string;
  stock: StockStatus;
  bluetooth: boolean;
  a2dp: boolean;
  memoryCard: string;
}

export type StockStatus = 'all' | 'in-stock' | 'out-of-stock';
