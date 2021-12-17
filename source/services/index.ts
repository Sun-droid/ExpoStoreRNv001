import type {StatusService, TypeService, ProductService} from './Product/typings';

export * from './Product/typings';
export * from './Product/mocks';
export * from './Product/api';

export type Services = {
  productService: ProductService;
  typeService: TypeService;
  statusService: StatusService;
};
