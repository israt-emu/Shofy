import {Model, Types} from "mongoose";

import {CartProduct} from "../cart/cart.interface";

export type IOrder = {
  total_amount: number;
  currency: "BDT";
  payment: "pending" | "complete";
  tran_id: string; // use unique tran_id for each api call
  shipping_method: string; //"Courier"
  products: CartProduct[];
  cus_id: Types.ObjectId | string;
  cus_add: string;
  cus_city: string;
  cus_postcode: string;
  cus_country: string;
};
export type OrderModel = Model<IOrder, Record<string, unknown>>;
