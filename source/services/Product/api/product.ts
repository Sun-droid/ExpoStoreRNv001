import type {Product, UnknownItem} from '../../../models';
import type {ProductService} from '../typings';
import type {Product as ProductDB} from '../../../storage';
import {database, tables} from '../../../storage';

export const createProductService = (): ProductService => ({
  async list(): Promise<Product[]> {
    const entries = await database.get<ProductDB>(tables.product).query().fetch();
    if (entries.length) {
      return entries.map<Product>((entry) => ({
        id: entry.id,
        type: String(entry.type.id),
        status: String(entry.status.id),
      }));
    }
    return [];
  },
  async get(id: Product['id']): Promise<Product> {
    const entry = await database.get<ProductDB>(tables.product).find(String(id));
    const formattedEntry: Product = {
      id: entry.id,
      type: String(entry.type.id),
      status: String(entry.status.id),
    };
    return formattedEntry;
  },
  async create(product: UnknownItem): Promise<Product> {
    let entry = {} as ProductDB;
    await database.action(async () => {
      entry = await database.get<ProductDB>(tables.product).create((newEntry) => {
        newEntry.type.id = String(product.type);
        newEntry.status.id = String(product.status);
      });
    });
    const formattedEntry: Product = {
      id: entry.id,
      type: String(entry.type.id),
      status: String(entry.status.id),
    };
    return formattedEntry;
  },
  async update(product: Product): Promise<Product> {
    let entry = {} as ProductDB;
    await database.action(async () => {
      entry = await database.get<ProductDB>(tables.product).find(String(product.id));
      await entry.update((updatedEntry) => {
        updatedEntry.type.id = String(product.type);
        updatedEntry.status.id = String(product.status);
      });
    });
    const formattedEntry: Product = {
      id: entry.id,
      type: String(entry.type.id),
      status: String(entry.status.id),
    };
    return formattedEntry;
  },
  async delete(id: Product['id']): Promise<void> {
    await database.action(async () => {
      const entry = await database.get<ProductDB>(tables.product).find(String(id));
      await entry.destroyPermanently();
    });
  },
});
