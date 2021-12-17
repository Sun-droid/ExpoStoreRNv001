export type UnknownItem = {
  type: string;
  status: string;
};

export type Product = UnknownItem & {id: string};

export const canCreateProductS = (product: UnknownItem): boolean => {
  return Boolean(product.type && product.status);
};

export const canUpdateProductS = (product: ProductS): boolean => {
  return Boolean(
    product.id && product.type && product.status,
  );
};
