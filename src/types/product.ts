export interface ProductSpecs {
  simCards: number;
  bluetooth: boolean;
  a2dp: boolean;
  camera: string;
  memoryCard: string;
  formFactor: string;
}

export interface Product {
  id: number;
  title: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  specs: ProductSpecs;
}
