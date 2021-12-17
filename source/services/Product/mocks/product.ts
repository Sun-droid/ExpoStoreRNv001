import {NetworkSpeed} from '../../../utils';
import type {Product, UnknownItem} from '../../../models';
import type {ProductService} from '../typings';

export const createMockProductService = (): ProductService => {
  let autoIncrement = 3;
  let items: Product[] = [
    {
      id: '1',
      type: '1',
      status: '1',
    },
    {
      id: '2',
      type: '2',
      status: '2',
    },
  ];

  return {
    async get(id: Product['id']): Promise<Product> {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(items.filter((i) => i.id === id)[0]),
          NetworkSpeed.Fast,
        );
      });
    },
    async list(): Promise<Product[]> {
      return new Promise((resolve) => {
        setTimeout(() => resolve(items), NetworkSpeed.Fast);
      });
    },
    async create(product: UnknownItem): Promise<Product> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newProduct: Product = {...product, id: String(autoIncrement)};
          items.push(newProduct);
          autoIncrement++;
          resolve(newProduct);
        }, NetworkSpeed.Fast);
      });
    },
    async update(product: Product): Promise<Product> {
      return new Promise((resolve) => {
        setTimeout(() => {
          items = items.map<Product>((item) => {
            if (item.id === product.id) {
              return product;
            }
            return item;
          });
          resolve(product);
        }, NetworkSpeed.Fast);
      });
    },
    async delete(id: Product['id']): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(() => {
          items = items.filter((item) => item.id !== id);
          resolve();
        }, NetworkSpeed.Fast);
      });
    },
  };
};
