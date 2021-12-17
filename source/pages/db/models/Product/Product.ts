export type UnknownItem = {
  type: string;
  status: string;
};

export type Product = UnknownItem & {id: string};

export const canCreateProduct = (product: UnknownItem): boolean => {
  return Boolean(product.type && product.status);
};

export const canUpdateProduct = (product: Product): boolean => {
  return Boolean(
    product.id && product.type && product.status,
  );
};
