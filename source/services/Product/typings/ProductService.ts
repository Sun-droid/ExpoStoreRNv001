import type {Product, UnknownItem} from '../../../models';

export type ProductService = {
  list: () => Promise<Product[]>;
  get: (id: Product['id']) => Promise<Product>;
  create: (product: UnknownItem) => Promise<Product>;
  update: (product: Product) => Promise<Product>;
  delete: (id: Product['id']) => Promise<void>;
};
