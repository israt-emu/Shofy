import {Model, Types} from "mongoose";
import {IUser} from "../user/user.interface";
import {IProduct} from "../product/product.interface";
export type CartProduct = {
  productId: Types.ObjectId | IProduct;
  price: number;
  quantity: number;
  name: string;
};
export type ICart = {
  products: CartProduct[];
  user: Types.ObjectId | IUser;
};

export type CartModel = Model<ICart, Record<string, unknown>>;
