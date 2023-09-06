//type defining for product
export type IProduct = {
  _id: string;
  name: string;
  status: string;
  price: number;
  sku: string;
  size: number;
  subCategory: string;
  color: string;
  category: string;
  description: string;
  image: string;
  rating: number[];
  weight: string;
  dimension: string;
  version: string[];
  quantity: number;
  addedBy: string;
};
export type IProductProps = {
  product: IProduct;
};
export interface IProductsProps {
  data: IProduct[];
}
export type ICartProduct = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};
export type ICartProductProps = {
  product: ICartProduct;
};
